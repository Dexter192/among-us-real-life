import uvicorn

from server import app 

from events import connect, config

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4046)
