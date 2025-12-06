import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";

export function useGetPlayers() {
  const { socket } = useSocketConnection();

  const [players, setPlayers] = useState(undefined);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("get_players");

    socket.on("players", (players) => {
      setPlayers(players);
    });
  }, [socket]);

  const refetchPlayers = () => {
    socket.emit("get_players");
  };

  return { players, refetchPlayers };
}
