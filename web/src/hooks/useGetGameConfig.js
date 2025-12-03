import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";

export function useGetGameConfig() {
  const { socket } = useSocketConnection();

  const [gameConfig, setGameConfig] = useState(undefined);

  useEffect(() => {
    socket.emit("get_game_config");
    socket.emit("message", "Requesting game config");

    socket.on("game_config", (config) => {
      console.log("Received game config:", config);
      setGameConfig(config);
    });
  }, [socket]);

  return { gameConfig };
}
