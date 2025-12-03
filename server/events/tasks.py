from typing import Any
from server import sio
from config.gamestate import GameState

game_state = GameState()


@sio.event
async def get_tasks(sid: str) -> None:
    print("TASKS CONFIG REQUESTED BY:", sid)
    await sio.emit("tasks", game_state.tasks.data, to=sid)


@sio.event
async def delete_task(sid: str, task_id: str) -> None:
    print(f"Delete task requested by: {sid} for task id: {task_id}")
    task_list = game_state.tasks.data.get("taskList", {})
    if str(task_id) in task_list:
        del game_state.tasks.data["taskList"][str(task_id)]
        game_state.tasks.save()
        await sio.emit("tasks", game_state.tasks.data, to=sid)
    else:
        print(f"Task id: {task_id} not found in {list(task_list.keys())}")


@sio.event
async def add_task(sid: str, task_data: Any) -> None:
    print(f"Add task requested by: {sid} with data: {task_data}")
    if task_data.get("name"):
        new_id = (
            max([int(k) for k in game_state.tasks.data["taskList"].keys()] or [0]) + 1
        )
        game_state.tasks.data["taskList"][str(new_id)] = task_data
        game_state.tasks.save()
        await sio.emit("tasks", game_state.tasks.data, to=sid)
    else:
        print("Task data must include a 'name' field")
