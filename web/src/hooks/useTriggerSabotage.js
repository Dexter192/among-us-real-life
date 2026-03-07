import { useSocketConnection } from "./useSocketConnection";

export function useTriggerSabotage() {
  const { socket } = useSocketConnection();

  const triggerSabotage = (sabotageId) => {
    if (socket === null) return;
    socket.emit("trigger_sabotage", sabotageId);
  };

  return { triggerSabotage };
}
