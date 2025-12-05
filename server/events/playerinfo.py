from server import sio
from config.gamestate import GameState

gamestate = GameState()


@sio.event
async def get_player_info(sid: str, data: dict) -> None:
    auth_id = data.get("authId")
    print("Player info requested by:", sid, "for authId:", auth_id)
    await sio.emit("player_info", gamestate.players["players"][auth_id], to=sid)


@sio.event
async def get_players(sid: str) -> None:
    print("Players list requested by:", sid)
    await sio.emit("players", gamestate.players["players"])


@sio.event
async def update_player_name(sid: str, data: dict) -> None:
    auth_id = data.get("authId")
    new_name = data.get("name")
    if auth_id in gamestate.players["players"]:
        gamestate.players["players"][auth_id]["name"] = new_name
        gamestate.players.save()
        await sio.emit("player_info", gamestate.players["players"][auth_id], to=sid)
        await sio.emit("players", gamestate.players["players"])
    else:
        print(f"AuthId: {auth_id} not found in players")


@sio.event
async def kill_player(sid: str, data: dict) -> None:
    auth_id = data.get("authId")
    if auth_id in gamestate.players["players"]:
        gamestate.players["players"][auth_id]["isAlive"] = False
        gamestate.players.save()
        await sio.emit("player_info", gamestate.players["players"][auth_id], to=sid)
        await sio.emit("players", gamestate.players["players"])
    else:
        print(f"AuthId: {auth_id} not found in players")
