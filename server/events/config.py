from typing import Any
from server import sio
from config.gamestate import GameState

game_state = GameState()


@sio.event
async def message(sid: str, data: Any) -> None:
    print("custom event:" + str(data))


@sio.event
async def get_game_config(sid: str) -> None:
    print("GAME CONFIG REQUESTED BY:", sid)
    await sio.emit("game_config", game_state.config.data, to=sid)
