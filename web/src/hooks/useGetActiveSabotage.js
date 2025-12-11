import { useEffect, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";

export function useGetActiveSabotage(sabotageTriggered) {
  const { socket } = useSocketConnection();

  const [sabotage, setSabotage] = useState(undefined);

  useEffect(() => {
    if (socket === null) return;

    socket.emit("get_active_sabotage");

    const handleActiveSabotage = (sabotageData) => {
      console.log("Received sabotage triggered:", sabotageData);
      setSabotage(sabotageData);
    };

    socket.on("active_sabotage", handleActiveSabotage);

    return () => {
      socket.off("active_sabotage", handleActiveSabotage);
    };
  }, [socket, sabotageTriggered]);

  return { sabotage };
}
