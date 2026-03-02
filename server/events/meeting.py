from datetime import datetime, timedelta
from server import sio
from config.gamestate import GameState

gamestate = GameState()
SKIP_VOTE_ID = "__skip__"


def get_player_id_from_sid(sid: str):
    for player_id, player_data in gamestate.players.data["players"].items():
        if player_data.get("sid") == sid:
            return player_id
    return None


async def reset_votes():
    for player in gamestate.players.data["players"].values():
        player["votes"] = []
        player["votedFor"] = None
    gamestate.state["votes"] = {}


@sio.event
async def report_dead_body(sid: str) -> None:
    end_cooldown = datetime.fromisoformat(
        gamestate.state.get("endOfMeetingCooldownUTC")
    )
    now_local = datetime.now().astimezone()
    if end_cooldown.tzinfo is None:
        end_cooldown = end_cooldown.replace(tzinfo=now_local.tzinfo)
    if end_cooldown > now_local:
        print("Meeting cooldown active, cannot report body.")
        return
    print("Dead body reported by:", sid)
    caller_id = get_player_id_from_sid(sid)
    await reset_votes()
    gamestate.state["emergency_meeting"] = True
    gamestate.state["emergencyMeetingCallerId"] = caller_id
    gamestate.state["endOfMeetingUTC"] = (
        datetime.now().astimezone()
        + timedelta(minutes=int(gamestate.config.data.get("meetingTimeMinutes")))
    ).isoformat()
    await sio.emit("game_state", gamestate.state)


@sio.event
async def vote_for_player(sid: str, data: dict) -> None:
    # Meeting time must be > 0
    end_meeting = datetime.fromisoformat(gamestate.state.get("endOfMeetingUTC"))
    now_local = datetime.now().astimezone()
    if end_meeting.tzinfo is None:
        end_meeting = end_meeting.replace(tzinfo=now_local.tzinfo)
    if end_meeting < now_local:
        print("Meeting time has ended, vote not counted.")
        return

    voter_id = data.get("voterId")
    voted_id = data.get("votedId")
    print(f"Player {voter_id} voted for {voted_id}")

    # If voting player is dead, ignore vote
    if not gamestate.players.data["players"][voter_id]["isAlive"]:
        print(f"Player {voter_id} is dead, vote not counted.")
        return

    # Remove previous vote if exists
    previous_vote = gamestate.players.data["players"][voter_id]["votedFor"]
    if previous_vote and previous_vote in gamestate.players.data["players"]:
        gamestate.players.data["players"][previous_vote]["votes"].remove(voter_id)

    # Skip vote or unvote
    if voted_id is None or voted_id == SKIP_VOTE_ID:
        if previous_vote == SKIP_VOTE_ID:
            gamestate.players.data["players"][voter_id]["votedFor"] = None
        else:
            gamestate.players.data["players"][voter_id]["votedFor"] = SKIP_VOTE_ID
        gamestate.players.save()
        await sio.emit("players", gamestate.players.data["players"])
        return

    if voted_id not in gamestate.players.data["players"]:
        print(f"Invalid voted player id: {voted_id}")
        return

    if not gamestate.players.data["players"][voted_id]["votes"]:
        gamestate.players.data["players"][voted_id]["votes"] = []

    # If voted for the same player again
    if previous_vote == voted_id:
        gamestate.players.data["players"][voter_id]["votedFor"] = None
        gamestate.players.save()
        await sio.emit("players", gamestate.players.data["players"])
        return

    gamestate.players.data["players"][voter_id]["votedFor"] = voted_id
    gamestate.players.data["players"][voted_id]["votes"].append(voter_id)
    gamestate.players.save()
    await sio.emit("players", gamestate.players.data["players"])


def tally_votes():
    vote_counts = {
        player_id: len(voters) for player_id, voters in gamestate.state["votes"].items()
    }
    if not vote_counts:
        return None

    max_votes = max(vote_counts.values())
    top_candidates = [
        player_id for player_id, count in vote_counts.items() if count == max_votes
    ]

    if len(top_candidates) == 1:
        return top_candidates[0]
    return None  # Tie or no votes


@sio.event
async def end_emergency_meeting(sid: str) -> None:
    print("Ending emergency meeting as requested by:", sid)
    gamestate.state["emergency_meeting"] = False
    gamestate.state["emergencyMeetingCallerId"] = None
    await reset_votes()
    kill_cooldown_seconds = int(gamestate.config.data.get("killCooldownSeconds", 0))
    gamestate.state["endOfKillCooldownUTC"] = (
        datetime.now().astimezone() + timedelta(seconds=kill_cooldown_seconds)
    ).isoformat()
    gamestate.state["endOfMeetingCooldownUTC"] = (
        datetime.now().astimezone()
        + timedelta(minutes=int(gamestate.config.data.get("meetingCooldownMinutes")))
    ).isoformat()
    await sio.emit("game_state", gamestate.state)
