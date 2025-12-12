import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useGetPlayerTasks(providedAuthId) {
  const { authId: hookAuthId } = useAuthId();
  const { socket } = useSocketConnection();

  const authId = providedAuthId ?? hookAuthId;

  const [tasks, setTasks] = useState(undefined);

  useEffect(() => {
    if (!socket || !authId) return;

    socket.emit("get_tasks", { authId });

    const handlePlayerTasks = (tasks) => {
      console.log("Received tasks:", tasks);
      setTasks(tasks);
    };

    socket.on("player_tasks", handlePlayerTasks);

    socket.on("trigger_task_update", () => {
      socket.emit("get_tasks", { authId });
    });

    return () => {
      socket.off("player_tasks", handlePlayerTasks);
    };
  }, [socket, authId]);

  return { tasks };
}
