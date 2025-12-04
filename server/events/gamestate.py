from typing import Any
from server import sio
from config.gamestate import GameState

game_state = GameState()


@sio.event
async def get_game_state(sid: str) -> None:
    print("Game state requested by:", sid)
    await sio.emit("game_state", game_state.state, to=sid)
