import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useConfirmTask() {
  const { socket } = useSocketConnection();
  const { authId } = useAuthId();

  const completeTask = (playerId, taskId, accept) => {
    if (!socket) return;
    socket.emit("process_pending_task", {
      taskId: taskId,
      authId: authId,
      playerId: playerId,
      accept: accept,
    });
  };

  return { completeTask };
}
