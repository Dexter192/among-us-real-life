import { useSocketConnection } from "./useSocketConnection";

export function useEndMeeting() {
  const { socket } = useSocketConnection();

  const endMeeting = () => {
    if (socket === null) return;
    socket.emit("end_emergency_meeting");
  };

  return { endMeeting };
}
