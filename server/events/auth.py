from typing import Any, Dict
import os
from server import sio
from config.gamestate import GameState
from dotenv import load_dotenv

load_dotenv("server/.env")

game_state = GameState()

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
PLAYER_PASSWORD = os.getenv("PLAYER_PASSWORD")


def validate_role(role: str) -> bool:
    return role in ["ADMIN", "PLAYER"]


def validate_login(role: str, password: str) -> bool:
    if role == "ADMIN":
        return password == ADMIN_PASSWORD
    elif role == "PLAYER":
        return password == PLAYER_PASSWORD
    return False


def reauth(sid: str, role: str, auth_id: str) -> bool:
    player_role = "admins" if role == "ADMIN" else "players"
    if auth_id in game_state.players[player_role].keys():
        print(f"Re-authorizing existing {role}: {auth_id}")
        game_state.players[player_role][auth_id]["sid"] = sid
        game_state.players.save()
        return True
    return False


async def perform_login(sid: str, data: Dict[str, Any]) -> None:
    role = data.get("role")
    auth_id = data.get("authId")
    name = data.get("name")

    player_role = "admins" if role == "ADMIN" else "players"

    # Check if the player already exists and if so, only update the sid
    if auth_id in game_state.players[player_role].keys():
        game_state.players[player_role][auth_id]["sid"] = sid
        game_state.players.save()
        await sio.emit("login_response", {"success": True}, to=sid)
        return

    game_state.players[player_role][auth_id] = {
        "sid": sid,
        "role": role,
        "tasks": [],
        "name": name,
        "isAlive": True,
        "votes": 0,
        "votedFor": None,
    }

    game_state.state["player_count"] = len(game_state.players["players"])
    game_state.players.save()
    await sio.emit("login_response", {"success": True}, to=sid)


@sio.event
async def is_logged_in(sid: str, data: Dict[str, Any]) -> None:
    role = data.get("role")
    auth_id = data.get("authId")

    if reauth(sid, role, auth_id):
        print(f"Re-authorized existing {role}: {auth_id}")
        await sio.emit("login_response", {"success": True}, to=sid)


@sio.event
async def login(sid: str, data: Dict[str, Any]) -> None:
    """Not rebuilding auth here, just validating and storing session."""
    role = data.get("role")
    password = data.get("password")

    if not validate_role(role):
        print(f"Invalid role: {role}")
        return

    if not validate_login(role, password):
        print(f"Login failed")
        await sio.emit("login_response", {"success": False}, to=sid)
        return
    await perform_login(sid, data)


@sio.event
async def logout(sid: str) -> None:
    print("CLIENT DISCONNECT:", sid)
