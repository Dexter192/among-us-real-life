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
        player["votes"] = 0
        player["votedFor"] = None
    state.players.save()


def assign_tasks_to_players():
    players = state.players.data.get("players", {})
    tasks_per_player = int(state.config.data.get("tasksPerPlayer"))

    for _, player in players.items():
        tasks = copy.deepcopy(state.tasks.data.get("activeTaskList", {}))
        player_tasks = {}
        for _ in range(tasks_per_player):
            task_keys = list(tasks.keys())
            task_id = random.choice(task_keys) if task_keys else None
            if task_id:
                task = tasks.pop(task_id)
                task["completed"] = False
                player_tasks[task_id] = task
        player["tasks"] = player_tasks
    state.players.save()


def assign_roles_to_players():
    players = state.players.data.get("players", {})
    player_ids = list(players.keys())
    num_imposters = int(state.config.data.get("numImpostors"))

    imposters = set(random.sample(player_ids, num_imposters))
    for pid in player_ids:
        players[pid]["game_role"] = "IMPOSTER" if pid in imposters else "CREWMATE"
    state.players.save()


def initilize_game_state():
    state.state["started"] = True
    state.state["imposter_win"] = False
    state.state["crewmate_win"] = False
    state.state["emergency_meeting"] = False
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
    }
    reset_player_states()
    if game_timer_task:
        game_timer_task.cancel()
        game_timer_task = None
    await sio.emit("game_state", state.state)


@sio.event
async def disconnect(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)
