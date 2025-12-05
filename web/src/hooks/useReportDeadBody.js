import { useSocketConnection } from "./useSocketConnection";

export function useReportDeadBody() {
  const { socket } = useSocketConnection();

  const reportDeadBody = () => {
    if (socket === null) return;
    socket.emit("report_dead_body");
  };

  return { reportDeadBody };
}
