import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";

export function useGetPendingTasks() {
  const { socket } = useSocketConnection();

  const [pendingTasks, setPendingTasks] = useState(undefined);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("get_pending_tasks");
    socket.on("pending_tasks", (pendingTasks) => {
      setPendingTasks(pendingTasks);
    });
  }, [socket]);

  const refetchPendingTasks = () => {
    socket.emit("get_pending_tasks");
  };

  return { pendingTasks, refetchPendingTasks };
}
