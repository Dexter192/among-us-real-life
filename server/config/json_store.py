import json
import os


class JsonStore:
    _instances = {}

    def __new__(cls, path):
        if path not in cls._instances:
            instance = super().__new__(cls)
            instance.path = path
            instance.data = {}

            if os.path.exists(instance.path):
                instance.load()
            else:
                instance.save()  # create empty file on first run

            cls._instances[path] = instance
        return cls._instances[path]

    def __init__(self, path):
        # Empty init to prevent re-initialization
        pass

    def reset(self, data={}):
        self.data = data
        self.save()

    def load(self):
        with open(self.path, "r") as f:
            self.data = json.load(f)

    def save(self):
        with open(self.path, "w") as f:
            json.dump(self.data, f, indent=4)

    def __getitem__(self, key):
        return self.data.get(key)

    def __setitem__(self, key, value):
        self.data[key] = value
        self.save()
