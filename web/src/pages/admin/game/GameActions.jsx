import { Card, Stack, Button, TextField } from "@mui/material";
import { useSocketConnection } from "../../../hooks/useSocketConnection";
import { useState } from "react";

export default function GameActions() {
  const { socket } = useSocketConnection();
  const [numTasksReset, setNumTasksReset] = useState(0);

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
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <TextField
            label="Number of Tasks to Reset"
            type="number"
            value={numTasksReset}
            onChange={(e) => setNumTasksReset(parseInt(e.target.value, 0))}
            sx={{ width: "60%", height: 56 }}
          />
          <Button
            variant="contained"
            color="warning"
            id="reset-tasks"
            onClick={() =>
              socket.emit("reset_n_tasks", { numTasks: numTasksReset })
            }
            sx={{ width: "40%", height: 56 }}
          >
            Reset Tasks
          </Button>
        </Stack>
      </Card>

      <Card sx={{ width: "100%", maxWidth: 420, padding: 2 }}>
        <Button
          variant="contained"
          color="success"
          id="reset-game"
          onClick={() => socket.emit("trigger_crewmate_win")}
          sx={{ marginRight: 2 }}
        >
          Crewmate Win
        </Button>

        <Button
          variant="contained"
          color="primary"
          id="stop-game"
          onClick={() => socket.emit("trigger_imposter_win")}
          sx={{ marginLeft: 2 }}
        >
          Imposter Win
        </Button>
      </Card>

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
          onClick={() => stopGame}
          sx={{ marginLeft: 2 }}
        >
          Stop Game
        </Button>
      </Card>
    </Stack>
  );
}
