from typing import Any, Dict, Optional
from server import sio
from config.gamestate import GameState

game_state = GameState()


@sio.event
async def connect(sid: str, env: Dict[str, Any], auth: Optional[Any]) -> None:
    print("CLIENT CONNECT:", sid)
    print("AUTH RECEIVED:", auth)
    if auth["role"] == "ADMIN":
        game_state.players["admins"][auth["authId"]] = {"role": "ADMIN"}
    if auth["role"] == "PLAYER":
        game_state.players["players"][auth["authId"]] = {
            "sid": sid,
            "role": "PLAYER",
            "tasks": [],
        }
        # TODO: if game is already running and player is a new player, let them wait for a new game to start
    game_state.players.save()


@sio.event
async def disconnect(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)
