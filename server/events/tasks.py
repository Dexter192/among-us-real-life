import asyncio
import copy
import random
from typing import Any
from server import sio
from config.gamestate import GameState
from events import sabotage

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
        game_state.tasks.data["activeTaskList"] = copy.deepcopy(
            game_state.tasks.data.get(name, {})
        )
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
async def total_tasks_completed(sid: str, delay=0) -> None:
    players = game_state.players.data.get("players", {})
    tasks = [
        player.get("tasks", {})
        for player in players.values()
        if not player.get("game_role", "") == "IMPOSTER"
    ]
    completed_tasks = sum(
        1 for task_list in tasks for task in task_list.values() if task.get("completed")
    )
    if completed_tasks == 0:
        delay = 0

    total_tasks = sum(1 for task_list in tasks for task in task_list.values())

    if completed_tasks == total_tasks and total_tasks > 0:
        game_state.state["started"] = False
        game_state.state["imposter_win"] = False
        game_state.state["crewmate_win"] = True
        await sio.emit("game_state", game_state.state)

    await asyncio.sleep(random.randint(0, delay))
    await sio.emit(
        "total_tasks_completed", {"total": total_tasks, "completed": completed_tasks}
    )


async def sync_player_sids(auth_id: str, sid: str) -> None:
    if auth_id in game_state.players.data["players"]:
        game_state.players.data["players"][auth_id]["sid"] = sid
        game_state.players.save()


@sio.event
async def complete_task(sid: str, data: Any) -> None:
    auth_id = data.get("playerId")
    task_id = data.get("taskId")
    players = game_state.players.data.get("players", {})
    player = players.get(auth_id, {})

    tasks = player.get("tasks", {})
    task = tasks.get(task_id, None)
    if task and not task.get("completed", False):
        await sync_player_sids(auth_id, sid)
        task["pending"] = True
        print(
            f"Player {player['name']} ({sid}) completed task {task['name']} (ID: {task_id})"
        )

        if task_id in game_state.state["pending_tasks"].get(auth_id, {}):
            return
        game_state.state["pending_tasks"].setdefault(auth_id, {})[task_id] = task

        game_state.players.save()
        await sio.emit("pending_tasks", game_state.state["pending_tasks"])
        await sio.emit("player_tasks", tasks, to=sid)


@sio.event
async def process_pending_task(sid: str, data: Any) -> None:
    auth_id = data.get("authId")
    if not auth_id in game_state.players.data.get("admins", []):
        return

    player_id = data.get("playerId")
    task_id = data.get("taskId")
    players = game_state.players.data.get("players", {})
    player = players.get(player_id, {})

    tasks = player.get("tasks", {})
    task = tasks.get(task_id, None)

    if task:
        accept = data.get("accept", False)
        task["completed"] = accept
        task["pending"] = False

        pending_list = game_state.state["pending_tasks"].get(player_id, {})
        if task_id in pending_list:
            pending_list.pop(task_id)

        game_state.players.save()
        player_sid = player.get("sid")
        await sio.emit("player_tasks", tasks, to=player_sid)
        await sio.emit("player_tasks", tasks, to=sid)
        await sio.emit("pending_tasks", game_state.state["pending_tasks"])
        delay = int(game_state.config.data.get("progressUpdateDelay", 0))
        await total_tasks_completed(sid, delay=delay)
        await sabotage.trigger_sabotage_if_needed(player, task)


@sio.event
async def get_pending_tasks(sid: str) -> None:
    await sio.emit("pending_tasks", game_state.state["pending_tasks"])


@sio.event
async def reset_n_tasks(sid: str, data: Any) -> None:
    num_tasks = data.get("numTasks", 0)

    # Sort by players with most completed tasks
    players = sorted(
        game_state.players.data.get("players", {}).items(),
        key=lambda item: sum(
            1 for task in item[1].get("tasks", {}).values() if task.get("completed")
        ),
        reverse=True,
    )
    resetted_count = 0
    for _, player in players:
        tasks = player.get("tasks", {})
        completed_tasks = [
            task_id
            for task_id, task in tasks.items()
            if task.get("completed") and num_tasks > 0
        ]
        if len(completed_tasks) == 0:
            continue
        resetted_count += 1
        if resetted_count > num_tasks:
            break
        task_id = random.choice(completed_tasks)
        tasks[task_id]["completed"] = False

    game_state.players.save()
    await sio.emit("trigger_task_update")
