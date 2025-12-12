import { useSocketConnection } from "./useSocketConnection";

export function useDiffuseSabotage() {
  const { socket } = useSocketConnection();

  const diffuseSabotage = (sabotageId) => {
    if (socket === null) return;
    socket.emit("diffuse_sabotage", sabotageId);
  };

  return { diffuseSabotage };
}
