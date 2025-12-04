from server import sio
from config.gamestate import GameState

gamestate = GameState()


@sio.event
async def get_player_info(sid: str, data: dict) -> None:
    auth_id = data.get("authId")
    print("Player info requested by:", sid, "for authId:", auth_id)
    await sio.emit("player_info", gamestate.players["players"][auth_id], to=sid)
