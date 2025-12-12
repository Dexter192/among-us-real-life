from server import sio
from config.gamestate import GameState

gamestate = GameState()


@sio.event
async def get_player_info(sid: str, data: dict) -> None:
    auth_id = data.get("authId")
    print("Player info requested by:", sid, "for authId:", auth_id)
    if auth_id in gamestate.players["players"]:
        await sio.emit("player_info", gamestate.players["players"][auth_id], to=sid)


@sio.event
async def get_players(sid: str) -> None:
    print("Players list requested by:", sid)
    await sio.emit("players", gamestate.players["players"])


@sio.event
async def update_player_name(sid: str, data: dict) -> None:
    auth_id = data.get("authId")
    new_name = data.get("name")
    if auth_id in gamestate.players["players"]:
        gamestate.players["players"][auth_id]["name"] = new_name
        gamestate.players.save()
        await sio.emit("player_info", gamestate.players["players"][auth_id], to=sid)
        await sio.emit("players", gamestate.players["players"])
    else:
        print(f"AuthId: {auth_id} not found in players")


async def clear_player_vote(player_id: str):
    previous_vote = gamestate.players.data["players"][player_id]["votedFor"]
    if previous_vote:
        try:
            gamestate.players.data["players"][previous_vote]["votes"].remove(player_id)
        except ValueError:
            pass
        gamestate.players.data["players"][player_id]["votedFor"] = None

    gamestate.players.save()


@sio.event
async def set_player_vitals(sid: str, data: dict) -> None:
    killer_id = data.get("killerId")
    target_id = data.get("targetId")
    alive = data.get("isAlive")
    if killer_id in gamestate.players.data["admins"]:
        await clear_player_vote(target_id)
        gamestate.players.data["players"][target_id]["isAlive"] = alive
        gamestate.players.save()
        await sio.emit("players", gamestate.players.data["players"])
        await sio.emit("trigger_player_refresh")
    else:
        print(f"AuthId: {target_id} not found in players")
