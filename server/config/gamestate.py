from .json_store import JsonStore


class GameState:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.config = JsonStore("server/config/config.json")
            cls._instance.tasks = JsonStore("server/config/tasks.json")
            cls._instance.players = JsonStore("server/config/players.json")
            cls._instance.state = {
                "started": False,
                "endOfGameUTC": 0,
                "player_count": 0,
                "imposter_win": False,
                "crewmate_win": False,
                "pending_tasks": {},
            }
            cls._instance.players.reset({"admins": {}, "players": {}})
        return cls._instance

    def __init__(self):
        pass
