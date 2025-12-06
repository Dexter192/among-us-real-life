import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useCompleteTask() {
  const { socket } = useSocketConnection();
  const { authId } = useAuthId();

  const completeTask = (taskId) => {
    if (!socket) return;
    socket.emit("complete_task", { taskId, playerId: authId });
  };

  return { completeTask };
}
