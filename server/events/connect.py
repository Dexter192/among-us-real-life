from typing import Any, Dict, Optional
from server import sio

@sio.event
async def connect(sid: str, env: Dict[str, Any], auth: Optional[Any]) -> None:
    print("CLIENT CONNECT:", sid)
    print("AUTH RECEIVED:", auth)
    await sio.emit("server_ready", {"status": "ok"}, to=sid)


@sio.event
async def disconnect(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)

