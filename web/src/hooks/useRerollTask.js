import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useRerollTask() {
  const { socket } = useSocketConnection();
  const { authId } = useAuthId();

  const rerollTask = (playerId, taskId) => {
    if (!socket) return;
    socket.emit("reroll_player_task", {
      adminId: authId,
      playerId: playerId,
      taskId: taskId,
    });
  };

  return { rerollTask };
}
