from typing import Any
from server import sio
from config.gamestate import GameState

game_state = GameState()


@sio.event
async def get_game_config(sid: str) -> None:
    print("Game config requested by:", sid)
    await sio.emit("game_config", game_state.config.data)


@sio.event
async def update_game_config(sid: str, new_config: dict) -> None:
    print("Update game config:", sid)
    game_state.config.data.update(new_config)
    game_state.config.save()
    await sio.emit("game_config", game_state.config.data)
