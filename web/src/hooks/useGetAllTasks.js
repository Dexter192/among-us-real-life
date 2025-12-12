import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";

export function useGetAllTasks() {
  const { socket } = useSocketConnection();

  const [tasks, setTasks] = useState(undefined);

  useEffect(() => {
    socket.emit("get_all_tasks");

    socket.on("tasks", (tasks) => {
      setTasks(tasks);
    });
  }, [socket]);

  return { tasks };
}
