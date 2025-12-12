import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";

export function useGetGameState() {
  const { socket } = useSocketConnection();

  const [gameState, setGameState] = useState(undefined);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("get_game_state");
    socket.emit("message", "Requesting game state");

    socket.on("game_state", (state) => {
      setGameState(state);
    });
  }, [socket]);

  const refetchGameState = () => {
    socket.emit("get_game_state");
  };

  return { gameState, refetchGameState };
}
