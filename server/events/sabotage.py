import copy
from typing import Any

from server import sio
from config.gamestate import GameState

game_state = GameState()


@sio.event
async def get_all_sabotages(sid: str) -> None:
    await sio.emit("sabotages", game_state.sabotages.data, to=sid)


@sio.event
async def get_active_sabotage(sid: str) -> None:

    if not game_state.state.get("sabotage_triggered"):
        return

    id = game_state.state["sabotage_triggered"]
    sabotage = (
        game_state.state["sabotages"][id]
        if id in game_state.state["sabotages"]
        else None
    )

    if not sabotage:
        return

    await sio.emit("active_sabotage", {"id": id, **sabotage}, to=sid)


@sio.event
async def add_sabotage(sid: str, sabotage_data: Any) -> None:
    if sabotage_data.get("name"):
        sabotage_list = game_state.sabotages.data.setdefault("activeSabotageList", {})
        new_id = max([int(k) for k in sabotage_list.keys()] or [0]) + 1
        sabotage_list[str(new_id)] = sabotage_data
        game_state.sabotages.save()
        await sio.emit("sabotages", game_state.sabotages.data)
    else:
        print("Sabotage data must include a 'name' field")


@sio.event
async def delete_sabotage(sid: str, sabotage_id: str) -> None:
    sabotage_list = game_state.sabotages.data.get("activeSabotageList", {})
    if str(sabotage_id) in sabotage_list:
        del sabotage_list[str(sabotage_id)]
        game_state.sabotages.save()
        await sio.emit("sabotages", game_state.sabotages.data)
    else:
        print(f"Sabotage id: {sabotage_id} not found in {list(sabotage_list.keys())}")


@sio.event
async def save_sabotage_preset(sid: str, data: Any) -> None:
    if data.get("sabotageSetName"):
        name = data["sabotageSetName"].strip()
        print(f"Save sabotage preset requested by: {sid} with name: {name}")
        game_state.sabotages.data[name] = copy.deepcopy(
            game_state.sabotages.data.get("activeSabotageList", {})
        )
        game_state.sabotages.save()
        await sio.emit("sabotages", game_state.sabotages.data)
    else:
        print("Preset data must include a 'sabotageSetName' field")


@sio.event
async def load_sabotage_preset(sid: str, data: Any) -> None:
    if data.get("sabotageSetName"):
        name = data["sabotageSetName"].strip()
        print(f"Load sabotage preset requested by: {sid} with name: {name}")
        game_state.sabotages.data["activeSabotageList"] = game_state.sabotages.data.get(
            name, {}
        )
        game_state.sabotages.save()
        await sio.emit("sabotages", game_state.sabotages.data)
    else:
        print("Preset data must include a 'sabotageSetName' field")


@sio.event
async def delete_sabotage_preset(sid: str, data: Any) -> None:
    if data.get("sabotageSetName"):
        name = data["sabotageSetName"].strip()
        print(f"Delete sabotage preset requested by: {sid} with name: {name}")
        if str(name) in game_state.sabotages.data:
            del game_state.sabotages.data[str(name)]
            game_state.sabotages.save()
            await sio.emit("sabotages", game_state.sabotages.data)
    else:
        print("Preset data must include a 'sabotageSetName' field")


async def trigger_sabotage_if_needed(player: dict, task: dict) -> None:
    if game_state.state.get("sabotage_triggered", False):
        print("Sabotage already triggered, not triggering another.")
        return

    sabotage_id = task.get("linked_sabotage")
    if not sabotage_id:
        print("No sabotage linked to this task.")
        return

    sabotage = player["sabotages"].get(sabotage_id, None)

    if not task["linked_sabotage"]:
        print(f"Could not find linked sabotage for task {task}")
        return

    sabotage_id = task["linked_sabotage"]
    if player["sabotages"].get(sabotage_id, {}).get("used", False):
        print(f"Sabotage {sabotage_id} already used")
        return

    print(
        f"Triggering sabotage {sabotage['name']} by player {player['name']} after completing task {task['name']}"
    )
    player["sabotages"][sabotage_id]["used"] = True
    game_state.state["sabotage_triggered"] = sabotage_id
    game_state.players.save()
    await sio.emit("game_state", game_state.state)


@sio.event
async def diffuse_sabotage(sid: str, sabotage_id: str) -> None:
    print(f"Diffuse sabotage requested by: {sid} for sabotage id: {sabotage_id}")
    if game_state.state.get("sabotage_triggered") == sabotage_id:
        game_state.state["sabotage_triggered"] = None
        game_state.sabotages.save()
        await sio.emit("game_state", game_state.state)
    else:
        print(f"Sabotage id: {sabotage_id} is not currently active.")
