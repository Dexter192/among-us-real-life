import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export function useSocketConnection(isAdmin = false, socketId = undefined) {
  let socket = null;

  useEffect(() => {
    const role = isAdmin ? "ADMIN" : "PLAYER";
    socket = io("http://localhost:4046", {
      transports: ["websocket"],
      auth: {
        role: role,
        token: "test123",
      },
    });

    socket.on("connect", () => {
      console.log("CONNECTED:", socket.id);
    });

    socket.on("server_ready", () => {
      console.log("Server is ready (yay):", socket.id);
    });

    if (socketId) {
      socket.emit("update-user-state", socketId);
      // sync frontend state with backend state --> Might work to emit a new socket message from the backend to update the respective areas rather than having one global state
    }

    // Cleanup: disconnect on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket, isAdmin, socketId]);

  // holds an instance of the socket connection.
  // Checks the cookie for an existing session id
  // If so, load data for the given session id
  return { socket };
}
