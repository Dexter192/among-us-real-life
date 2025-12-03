import { useEffect, useState } from "react";
import GameConfig from "./GameConfig";
import { useSocketConnection } from "../../hooks/useSocketConnection";

export default function AdminPage() {
  const { socket } = useSocketConnection(true);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    //     const socket = io("http://localhost:4046", {
    //       transports: ["websocket"],
    //       auth: {
    //         role: "ADMIN",
    //         token: "test123",
    //       },
    //     });
    // socket.on("connect", () => {
    //   console.log("CONNECTED:", socket.id);
    // });
    //     socket.on("server_ready", () => {
    //       console.log("Server is ready (yay):", socket.id);
    //     });
    //     // Cleanup: disconnect on unmount
    //     return () => {
    //       socket.disconnect();
    //     };
  }, [socket]); // Empty array: run only once

  if (!isStarted) {
    return <GameConfig setIsStarted />;
  }

  return <h1>Client Running</h1>;
}
