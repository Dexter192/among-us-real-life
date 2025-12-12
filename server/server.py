from socketio import AsyncServer, ASGIApp

sio: AsyncServer = AsyncServer(cors_allowed_origins="*", async_mode="asgi")
app: ASGIApp = ASGIApp(sio)
