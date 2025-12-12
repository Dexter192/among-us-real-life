from server import sio
from config import GameState
import random
import copy
import asyncio
from datetime import datetime, timedelta

state = GameState()
game_timer_task = None


def reset_player_states():
    players = state.players.data.get("players", {})
    for player in players.values():
        player["isAlive"] = True
        player["game_role"] = None
        player["tasks"] = []
        player["sabotages"] = []
        player["votes"] = 0
        player["votedFor"] = None
        player["characterId"] = random.randint(0, 7)
    state.players.save()


def assign_tasks_to_players():
    players = state.players.data.get("players", {})
    tasks_per_player = int(state.config.data.get("tasksPerPlayer"))
    task_ids = list(state.tasks.data.get("activeTaskList", {}).keys())

    for _, player in players.items():
        tasks = copy.deepcopy(state.tasks.data.get("activeTaskList", {}))
        player_tasks = {}
        assigned_tasks = random.sample(task_ids, min(tasks_per_player, len(task_ids)))
        for task_id in assigned_tasks:
            task = tasks[task_id]
            task["completed"] = False
            task["pending"] = False
            player_tasks[task_id] = task
        # If the player is an imposter, link a sabotage to a task (limited to sabotageCharges). Ensure that all sabotages are unique.
        player["tasks"] = player_tasks
    state.players.save()


def assign_sabotages_to_imposters():
    players = state.players.data.get("players", {})
    sabotage_charges = int(state.config.data.get("sabotageCharges"))
    sabotage_ids = list(state.sabotages.data.get("activeSabotageList", {}))

    imposters = [
        player for player in players.values() if player.get("game_role") == "IMPOSTER"
    ]

    for imposter in imposters:
        sabotages = copy.deepcopy(state.sabotages.data.get("activeSabotageList", {}))
        player_sabotages = {}
        assigned_sabotages = random.sample(
            sabotage_ids, min(sabotage_charges, len(sabotage_ids))
        )

        linked_tasks = random.sample(
            list(imposter["tasks"].keys()),
            min(sabotage_charges, len(imposter["tasks"])),
        )
        for sabotage_id in assigned_sabotages:
            # Link sabotage to a task
            if len(linked_tasks) == 0:
                break
            linked_task_id = linked_tasks.pop()
            imposter["tasks"][linked_task_id]["linked_sabotage"] = sabotage_id

            # Create sabotage entry for imposter
            sabotage = sabotages[sabotage_id]
            sabotage["used"] = False
            player_sabotages[sabotage_id] = sabotage

        imposter["sabotages"] = player_sabotages
    state.players.save()


def assign_roles_to_players():
    players = state.players.data.get("players", {})
    player_ids = list(players.keys())
    num_imposters = int(state.config.data.get("numImpostors"))

    imposters = set(random.sample(player_ids, min(num_imposters, len(player_ids))))
    for pid in player_ids:
        players[pid]["game_role"] = "IMPOSTER" if pid in imposters else "CREWMATE"
    state.players.save()


def initilize_game_state():
    state.state["started"] = True
    state.state["imposter_win"] = False
    state.state["crewmate_win"] = False
    state.state["emergency_meeting"] = False
    state.state["sabotage_triggered"] = None
    state.state["sabotageEndUTC"] = None
    state.state["sabotageActive"] = False
    state.state["sabotages"] = state.sabotages.data.get("activeSabotageList", {})
    state.state["votes"] = {}
    state.state["endOfGameUTC"] = (
        datetime.now()
        + timedelta(minutes=int(state.config.data.get("gameTimeMinutes")))
    ).isoformat()
    state.state["endOfMeetingCooldownUTC"] = (
        datetime.now()
        + timedelta(minutes=int(state.config.data.get("meetingCooldownMinutes")))
    ).isoformat()


async def game_timer():
    global game_timer_task
    try:
        while state.state["started"]:
            end_time = datetime.fromisoformat(state.state["endOfGameUTC"])
            time_remaining = (end_time - datetime.now()).total_seconds()

            if time_remaining <= 0:
                state.state["started"] = False
                state.state["imposter_win"] = True
                state.state["crewmate_win"] = False
                await sio.emit("game_state", state.state)
                break

            await asyncio.sleep(1)
    except Exception as e:
        print(f"Error in game timer: {e}")
    finally:
        game_timer_task = None


@sio.event
async def start_game(sid: str) -> None:
    global game_timer_task
    print("Starting game:", sid)
    reset_player_states()
    assign_tasks_to_players()
    assign_roles_to_players()
    assign_sabotages_to_imposters()
    initilize_game_state()
    await sio.emit("game_state", state.state)

    # Start the game timer to monitor expiration
    if game_timer_task is None:
        game_timer_task = asyncio.create_task(game_timer())


@sio.event
async def stop_game(sid: str) -> None:
    global game_timer_task
    print("Stopping game:", sid)
    state.state["started"] = False
    state.state["sabotage_triggered"] = None
    state.state["sabotageEndUTC"] = None
    if game_timer_task:
        game_timer_task.cancel()
        game_timer_task = None
    await sio.emit("game_state", state.state)


@sio.event
async def reset_game(sid: str) -> None:
    global game_timer_task
    print("Resetting game:", sid)
    state.state = {
        "started": False,
        "imposter_win": False,
        "crewmate_win": False,
        "emergency_meeting": False,
        "votes": {},
        "endOfGameUTC": None,
        "endOfMeetingCooldownUTC": None,
        "pending_tasks": {},
        "sabotage_triggered": None,
        "sabotageEndUTC": None,
    }
    reset_player_states()
    if game_timer_task:
        game_timer_task.cancel()
        game_timer_task = None
    await sio.emit("game_state", state.state)


@sio.event
async def trigger_imposter_win(sid: str) -> None:
    print("Triggering imposter win:", sid)
    state.state["started"] = False
    state.state["imposter_win"] = True
    state.state["crewmate_win"] = False
    await sio.emit("game_state", state.state)


@sio.event
async def trigger_crewmate_win(sid: str) -> None:
    print("Triggering crewmate win:", sid)
    state.state["started"] = False
    state.state["imposter_win"] = False
    state.state["crewmate_win"] = True
    await sio.emit("game_state", state.state)


@sio.event
async def disconnect(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)
