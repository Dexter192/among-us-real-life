from server import sio
from config import GameState

state = GameState()


@sio.event
async def start_game(sid: str) -> None:
    print("Starting game:", sid)
    await sio.emit("start_game", {"status": "ok"})
    # Assign tasks to players
    # Start the game
    # await sio.emit("server_ready", {"status": "ok"}, to=sid)


@sio.event
async def stop_game(sid: str) -> None:
    print("Stopping game:", sid)
    await sio.emit("stop_game", {"status": "ok"})


@sio.event
async def disconnect(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)
