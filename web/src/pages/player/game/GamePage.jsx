import { Button } from "@mui/material";
import { useEffect } from "react";
import { useSocketConnection } from "../../../hooks/useSocketConnection";

export default function GamePage() {
  const { socket } = useSocketConnection();

  useEffect(() => {
    if (socket == null) return;
    socket.on("placeholder", () => {
      // Placeholder for events like emergency meetings
    });
  }, [socket]);

  return (
    <>
      <h1>Game is running</h1>
    </>
  );
}
