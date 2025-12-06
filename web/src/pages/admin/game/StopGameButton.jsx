import { Button } from "@mui/material";
import { useSocketConnection } from "../../../hooks/useSocketConnection";

export default function GamePage({ gameState }) {
  const { socket } = useSocketConnection();

  const stopGame = () => {
    if (socket) {
      socket.emit("stop_game");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        id="stop-game"
        onClick={stopGame}
      >
        Stop Game
      </Button>
    </>
  );
}
