import { Button } from "@mui/material";
import { useSocketConnection } from "../../../hooks/useSocketConnection";
import { Stack, Card } from "@mui/material";

export default function StartGameButton() {
  const { socket } = useSocketConnection();

  const startGame = () => {
    socket.emit("start_game");
  };

  return (
    <Stack spacing={1} alignItems="center" sx={{ py: 3 }}>
      <Card sx={{ width: "100%", maxWidth: 420, padding: 2 }}>
        <Button
          variant="contained"
          color="primary"
          id="start-game"
          onClick={() => startGame()}
        >
          Start Game
        </Button>
      </Card>
    </Stack>
  );
}
