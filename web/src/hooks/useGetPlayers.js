import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useGetPlayers() {
  const { socket } = useSocketConnection();

  const [players, setPlayers] = useState(undefined);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("get_players");

    socket.on("players", (players) => {
      console.log("Received players:", players);
      setPlayers(players);
    });
  }, [socket]);

  const refetchPlayers = () => {
    socket.emit("get_players");
  };

  return { players, refetchPlayers };
}
