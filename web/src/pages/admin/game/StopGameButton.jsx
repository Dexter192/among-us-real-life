import { Card, Stack, Button } from "@mui/material";
import { useSocketConnection } from "../../../hooks/useSocketConnection";

export default function GamePage() {
  const { socket } = useSocketConnection();

  const stopGame = () => {
    if (socket) {
      socket.emit("stop_game");
    }
  };

  const resetGame = () => {
    if (socket) {
      socket.emit("reset_game");
    }
  };

  return (
    <Stack spacing={1} alignItems="center" sx={{ py: 3 }}>
      <Card sx={{ width: "100%", maxWidth: 420, padding: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          id="reset-game"
          onClick={resetGame}
          sx={{ marginRight: 2 }}
        >
          Reset Game
        </Button>

        <Button
          variant="contained"
          color="secondary"
          id="stop-game"
          onClick={() => stopGame()}
          sx={{ marginLeft: 2 }}
        >
          Stop Game
        </Button>
      </Card>
    </Stack>
  );
}
