from server import sio
from config import GameState

state = GameState()


@sio.event
async def start_game(sid: str) -> None:
    print("Starting game:", sid)
    state.state["started"] = True
    await sio.emit("game_state", state.state)
    # Assign tasks to players
    # Start the game
    # await sio.emit("server_ready", {"status": "ok"}, to=sid)
    # Start a timer that ends the game after a certain duration


@sio.event
async def stop_game(sid: str) -> None:
    print("Stopping game:", sid)
    state.state["started"] = False
    await sio.emit("game_state", state.state)


@sio.event
async def disconnect(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)
