from typing import Any, Dict, Optional
from server import sio
from events.playerinfo import get_players


@sio.event
async def connect(sid: str, env: Dict[str, Any], auth: Optional[Any]) -> None:
    print(f"{auth.get('role')} CONNECT: {sid}")
    await get_players(sid)


@sio.event
async def disconnect(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)
