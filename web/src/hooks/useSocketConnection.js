import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useAuthId } from "./useAuthId";

let socketInstance = null;
let connectionCount = 0;

function getOrCreateSocket(isAdmin, authId) {
  if (!socketInstance) {
    const role = isAdmin ? "ADMIN" : "PLAYER";
    const socketUrl = import.meta.env.VITE_SOCKET_URL || undefined;
    const socketPath = import.meta.env.VITE_SOCKET_PATH || "/api/socket.io";
    socketInstance = io(socketUrl, {
      path: socketPath,
      transports: ["websocket"],
      auth: {
        role: role,
        authId: authId,
      },
    });

    socketInstance.on("connect", () => {
      console.log("CONNECTED:", socketInstance.id);
    });

    socketInstance.on("server_ready", () => {
      console.log("Server is ready:", socketInstance.id);
    });
  }

  return socketInstance;
}

export function useSocketConnection(isAdmin = false, socketId = undefined) {
  const { authId } = useAuthId();

  const [socket, setSocket] = useState(() => {
    if (authId && socketInstance) {
      return socketInstance;
    }
    return null;
  });

  useEffect(() => {
    if (!authId) return;

    // Get or create the singleton socket
    const socketConn = getOrCreateSocket(isAdmin, authId);
    setSocket(socketConn);
    connectionCount++;

    if (socketId && socketConn) {
      socketConn.emit("update-user-state", socketId);
    }

    return () => {
      connectionCount--;
      if (connectionCount === 0 && socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
      }
    };
  }, [isAdmin, socketId, authId]);

  return { socket };
}
