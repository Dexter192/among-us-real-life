import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";

export function useGetAllTasks() {
  const { socket } = useSocketConnection();

  const [tasks, setTasks] = useState(undefined);

  useEffect(() => {
    socket.emit("get_tasks");
    socket.emit("message", "Requesting tasks");

    socket.on("tasks", (tasks) => {
      console.log("Received tasks:", tasks);
      setTasks(tasks);
    });
  }, [socket]);

  return { tasks };
}
