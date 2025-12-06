from datetime import datetime, timedelta
from server import sio
from config.gamestate import GameState

gamestate = GameState()


async def reset_votes():
    for player in gamestate.players.data["players"].values():
        player["votes"] = []
        player["votedFor"] = None
    gamestate.state["votes"] = {}


@sio.event
async def report_dead_body(sid: str) -> None:
    if (
        datetime.fromisoformat(gamestate.state.get("endOfMeetingCooldownUTC"))
        > datetime.now()
    ):
        print("Meeting cooldown active, cannot report body.")
        return
    print("Dead body reported by:", sid)
    await reset_votes()
    gamestate.state["emergency_meeting"] = True
    gamestate.state["endOfMeetingUTC"] = (
        datetime.now()
        + timedelta(minutes=int(gamestate.config.data.get("meetingTimeMinutes")))
    ).isoformat()
    await sio.emit("game_state", gamestate.state)


@sio.event
async def vote_for_player(sid: str, data: dict) -> None:
    # Meeting time must be > 0
    if datetime.fromisoformat(gamestate.state.get("endOfMeetingUTC")) < datetime.now():
        print("Meeting time has ended, vote not counted.")
        return

    voter_id = data.get("voterId")
    voted_id = data.get("votedId")
    print(f"Player {voter_id} voted for {voted_id}")

    # If voting player is dead, ignore vote
    if not gamestate.players.data["players"][voter_id]["isAlive"]:
        print(f"Player {voter_id} is dead, vote not counted.")
        return

    if not gamestate.players.data["players"][voted_id]["votes"]:
        gamestate.players.data["players"][voted_id]["votes"] = []

    # Remove previous vote if exists
    previous_vote = gamestate.players.data["players"][voter_id]["votedFor"]
    if previous_vote:
        gamestate.players.data["players"][previous_vote]["votes"].remove(voter_id)

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
    gamestate.state["votes"] = {}
    # Tally votes and eliminate player
    await sio.emit("game_state", gamestate.state)
