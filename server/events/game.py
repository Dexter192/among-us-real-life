from server import sio
from config import GameState
import random
import copy

state = GameState()


def assign_tasks_to_players():
    players = state.players.data.get("players", {})
    tasks = copy.deepcopy(state.tasks.data.get("activeTaskList", {}))
    tasks_per_player = state.config.data.get("tasksPerPlayer")

    for _, player in players.items():
        player_tasks = []
        for _ in range(tasks_per_player):
            task_keys = list(tasks.keys())
            task_id = random.choice(task_keys) if task_keys else None
            if task_id:
                task = tasks.pop(task_id)
                player_tasks.append(task)
        player["tasks"] = player_tasks
    state.players.save()


@sio.event
async def start_game(sid: str) -> None:
    print("Starting game:", sid)
    assign_tasks_to_players()
    state.state["started"] = True
    await sio.emit("game_state", state.state)
    # Assign tasks to players
    # Start the game
    # Start a timer that ends the game after a certain duration


@sio.event
async def stop_game(sid: str) -> None:
    print("Stopping game:", sid)
    state.state["started"] = False
    await sio.emit("game_state", state.state)


@sio.event
async def disconnect(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)
