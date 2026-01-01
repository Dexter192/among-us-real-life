import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useGetPlayerInfo() {
  const { socket } = useSocketConnection();
  const { authId } = useAuthId();

  const [playerInfo, setPlayerInfo] = useState(undefined);

  useEffect(() => {
    if (socket === null || !authId) return;
    socket.emit("get_player_info", { authId });

    socket.on("player_info", (info) => {
      setPlayerInfo(info);
    });
  }, [socket, authId]);

  const refetchPlayerInfo = () => {
    if (socket && authId) {
      socket.emit("get_player_info", { authId });
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("trigger_player_refresh", () => {
      refetchPlayerInfo();
    });
  }, [socket, authId]);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setPlayerInfo({ ...playerInfo, name: newName });
    socket.emit("update_player_name", { authId, name: newName });
  };

  return { playerInfo, refetchPlayerInfo, handleNameChange };
}
