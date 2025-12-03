import { Button } from "@mui/material";
import { useSocketConnection } from "../../../hooks/useSocketConnection";

export default function StartGameButton() {
  const { socket } = useSocketConnection();

  const startGame = () => {
    socket.emit("start_game");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      id="start-game"
      onClick={() => startGame()}
    >
      Start Game
    </Button>
  );
}
