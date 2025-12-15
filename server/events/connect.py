from typing import Any, Dict, Optional
from server import sio
from events.playerinfo import get_players

@sio.event
async def connect(sid: str, env: Dict[str, Any], auth: Optional[Any]) -> None:
    await get_players(sid)


@sio.event
async def disconnect(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)