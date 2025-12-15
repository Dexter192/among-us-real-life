from .json_store import JsonStore


class GameState:
    _instance = None
    config: JsonStore | None = None
    tasks: JsonStore | None = None
    sabotages: JsonStore | None = None
    players: JsonStore | None = None
    state: dict | None = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.config = JsonStore("server/data/config.json")
            cls._instance.tasks = JsonStore("server/data/tasks.json")
            cls._instance.sabotages = JsonStore("server/data/sabotages.json")
            cls._instance.players = JsonStore("server/data/players.json")
            cls._instance.state = {
                "started": False,
                "endOfGameUTC": 0,
                "player_count": 0,
                "imposter_win": False,
                "crewmate_win": False,
                "pending_tasks": {},
                "sabotage_triggered": None,
                "sabotageEndUTC": None,
            }
            cls._instance.players.reset({"admins": {}, "players": {}})
        return cls._instance

    def __init__(self):
        pass
