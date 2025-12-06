import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useChangePlayerVitals() {
  const { socket } = useSocketConnection();
  const { authId } = useAuthId();

  const changePlayerVitals = (targetId, isAlive) => {
    if (!socket) return;
    socket.emit("set_player_vitals", {
      killerId: authId,
      targetId,
      isAlive,
    });
  };

  return { changePlayerVitals };
}
