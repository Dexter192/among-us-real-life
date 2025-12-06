import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useGetPlayerTasks(providedAuthId) {
  const { authId: hookAuthId } = useAuthId();
  const { socket } = useSocketConnection();

  const authId = providedAuthId ?? hookAuthId;

  const [tasks, setTasks] = useState(undefined);

  useEffect(() => {
    socket.emit("get_tasks", { authId });

    socket.on("player_tasks", (tasks) => {
      console.log("Received tasks:", tasks);
      setTasks(tasks);
    });
  }, [socket, authId]);

  return { tasks };
}
