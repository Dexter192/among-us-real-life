import { Typography, TextField, Stack, Card, CardContent } from "@mui/material";
import { useGetGameConfig } from "../../../../hooks/useGetGameConfig";
import { useAuthId } from "../../../../hooks/useAuthId";
import { memo } from "react";

function GameConfig() {
  const { authId } = useAuthId();
  const { gameConfig, updateConfig } = useGetGameConfig();

  if (!gameConfig) {
    return <Typography>Loading game configuration...</Typography>;
  }

  return (
    <Stack spacing={1} alignItems="center" sx={{ py: 3 }}>
      <Typography variant="overline">
        Einstellungen - (Player ID: {authId})
      </Typography>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <TextField
              label="Gametime (minutes)"
              value={gameConfig.gameTimeMinutes}
              type="number"
              onChange={(e) =>
                updateConfig({ ...gameConfig, gameTimeMinutes: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Number of Impostors"
              value={gameConfig.numImpostors}
              type="number"
              onChange={(e) =>
                updateConfig({ ...gameConfig, numImpostors: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Meeting time (minutes)"
              value={gameConfig.meetingTimeMinutes}
              type="number"
              onChange={(e) =>
                updateConfig({
                  ...gameConfig,
                  meetingTimeMinutes: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              label="Kill Cooldown (seconds)"
              value={gameConfig.killCooldownSeconds}
              type="number"
              onChange={(e) =>
                updateConfig({
                  ...gameConfig,
                  killCooldownSeconds: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              label="Sabotage Duration (seconds)"
              value={gameConfig.sabotageSeconds}
              type="number"
              onChange={(e) =>
                updateConfig({ ...gameConfig, sabotageSeconds: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Sabotage Charges (shared)"
              value={gameConfig.sabotageCharges}
              type="number"
              onChange={(e) =>
                updateConfig({ ...gameConfig, sabotageCharges: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Tasks per player"
              value={gameConfig.tasksPerPlayer}
              type="number"
              onChange={(e) =>
                updateConfig({
                  ...gameConfig,
                  tasksPerPlayer: e.target.value,
                })
              }
              fullWidth
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default memo(GameConfig);
