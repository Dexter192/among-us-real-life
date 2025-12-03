from typing import Any
from server import sio

@sio.event
async def message(sid: str, data: Any) -> None:
    print('custom event:' + str(data))
