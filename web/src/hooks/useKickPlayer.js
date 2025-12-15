import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useKickPlayer() {
  const { socket } = useSocketConnection();
  const { authId } = useAuthId();

  const kickPlayer = (kickedPlayerId) => {
    if (!socket) return;
    socket.emit("kick_player", { kickedId: kickedPlayerId, authId: authId });
  };

  const kickAll = () => {
    if (!socket) return;
    socket.emit("kick_all", { authId: authId });
  };

  return { kickPlayer, kickAll };
}
