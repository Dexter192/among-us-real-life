import copy
from typing import Any
from server import sio
from config.gamestate import GameState

game_state = GameState()


@sio.event
async def get_all_tasks(sid: str) -> None:
    print("Requesting tasks:", sid)
    await sio.emit("tasks", game_state.tasks.data, to=sid)


@sio.event
async def delete_task(sid: str, task_id: str) -> None:
    print(f"Delete task requested by: {sid} for task id: {task_id}")
    task_list = game_state.tasks.data.get("activeTaskList", {})
    if str(task_id) in task_list:
        del game_state.tasks.data["activeTaskList"][str(task_id)]
        game_state.tasks.save()
        await sio.emit("tasks", game_state.tasks.data, to=sid)
    else:
        print(f"Task id: {task_id} not found in {list(task_list.keys())}")


@sio.event
async def add_task(sid: str, task_data: Any) -> None:
    print(f"Add task requested by: {sid} with data: {task_data}")
    if task_data.get("name"):
        new_id = (
            max([int(k) for k in game_state.tasks.data["activeTaskList"].keys()] or [0])
            + 1
        )
        game_state.tasks.data["activeTaskList"][str(new_id)] = task_data
        game_state.tasks.save()
        await sio.emit("tasks", game_state.tasks.data, to=sid)
    else:
        print("Task data must include a 'name' field")


@sio.event
async def save_task_preset(sid: str, data: Any) -> None:
    if data.get("taskSetName"):
        name = data["taskSetName"].strip()
        print(f"Save task preset requested by: {sid} with name: {name}")
        game_state.tasks.data[name] = copy.deepcopy(
            game_state.tasks.data["activeTaskList"]
        )
        game_state.tasks.save()
        await sio.emit("tasks", game_state.tasks.data, to=sid)
    else:
        print("Preset data must include a 'taskSetName' field")


@sio.event
async def load_task_preset(sid: str, data: Any) -> None:
    if data.get("taskSetName"):
        name = data["taskSetName"].strip()
        print(f"Load task preset requested by: {sid} with name: {name}")
        game_state.tasks.data["activeTaskList"] = game_state.tasks.data.get(name, {})
        game_state.tasks.save()
        await sio.emit("tasks", game_state.tasks.data, to=sid)
    else:
        print("Preset data must include a 'taskSetName' field")


@sio.event
async def delete_task_preset(sid: str, data: Any) -> None:
    if data.get("taskSetName"):
        name = data["taskSetName"].strip()
        print(f"Delete task preset requested by: {sid} with name: {name}")
        if str(name) in game_state.tasks.data:
            del game_state.tasks.data[str(name)]
            game_state.tasks.save()
            await sio.emit("tasks", game_state.tasks.data, to=sid)
    else:
        print("Preset data must include a 'taskSetName' field")


@sio.event
async def get_tasks(sid: str, data: Any) -> None:
    print(f"Current player tasks data: {game_state.players['players']}")
    auth_id = data.get("authId")
    print("Requesting tasks:", auth_id)
    player_tasks = game_state.players["players"].get(auth_id, {}).get("tasks", [])
    await sio.emit("player_tasks", player_tasks, to=sid)


@sio.event
async def complete_task(sid: str, data: Any) -> None:
    auth_id = data.get("playerId")
    task_id = data.get("taskId")
    players = game_state.players.data.get("players", {})
    player = players.get(auth_id, {})

    tasks = player.get("tasks", {})
    task = tasks.get(task_id, None)
    if task:
        task["completed"] = not task["completed"]
        print(f"Player {player['name']} completed task {task['name']} (ID: {task_id})")

        game_state.players.save()
        await sio.emit("player_tasks", tasks)
        await sio.emit("task_completed")
