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
              onChange={(e) =>
                updateConfig({ ...gameConfig, gameTimeMinutes: e.target.value })
              }
              inputMode="numeric"
              fullWidth
            />
            <TextField
              label="Number of Impostors"
              value={gameConfig.numImpostors}
              onChange={(e) =>
                updateConfig({ ...gameConfig, numImpostors: e.target.value })
              }
              inputMode="numeric"
              fullWidth
            />
            <TextField
              label="Emergency Cooldown (minutes)"
              value={gameConfig.emergencyCooldownMinutes}
              onChange={(e) =>
                updateConfig({
                  ...gameConfig,
                  emergencyCooldownMinutes: e.target.value,
                })
              }
              inputMode="decimal"
              fullWidth
            />
            <TextField
              label="Kill Cooldown (seconds)"
              value={gameConfig.killCooldownSeconds}
              onChange={(e) =>
                updateConfig({
                  ...gameConfig,
                  killCooldownSeconds: e.target.value,
                })
              }
              inputMode="decimal"
              fullWidth
            />
            <TextField
              label="Sabotage Duration (seconds)"
              value={gameConfig.sabotageSeconds}
              onChange={(e) =>
                updateConfig({ ...gameConfig, sabotageSeconds: e.target.value })
              }
              inputMode="numeric"
              fullWidth
            />
            <TextField
              label="Sabotage Charges (shared)"
              value={gameConfig.sabotageCharges}
              onChange={(e) =>
                updateConfig({ ...gameConfig, sabotageCharges: e.target.value })
              }
              inputMode="numeric"
              fullWidth
            />
            <TextField
              label="Max Players per Task"
              value={gameConfig.maxPlayersPerTask}
              onChange={(e) =>
                updateConfig({
                  ...gameConfig,
                  maxPlayersPerTask: e.target.value,
                })
              }
              inputMode="numeric"
              fullWidth
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default memo(GameConfig);
