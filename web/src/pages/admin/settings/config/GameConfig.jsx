import { Typography, TextField, Stack, Card, CardContent } from "@mui/material";
import { useGetGameConfig } from "../../../../hooks/useGetGameConfig";
import { useAuthId } from "../../../../hooks/useAuthId";
import { memo } from "react";

function GameConfig() {
  const { authId } = useAuthId();
  const { gameConfig } = useGetGameConfig();

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
              label="Number of Impostors"
              value={gameConfig.numImpostors}
              onChange={(e) => setNumImpostors(e.target.value)}
              inputMode="numeric"
              fullWidth
            />
            <TextField
              label="Emergency Cooldown (minutes)"
              value={gameConfig.emergencyCooldownMinutes}
              onChange={(e) => setCooldownMinutes(e.target.value)}
              inputMode="decimal"
              fullWidth
            />
            <TextField
              label="Kill Cooldown (seconds)"
              value={gameConfig.killCooldownSeconds}
              onChange={(e) => setKillCooldownSeconds(e.target.value)}
              inputMode="decimal"
              fullWidth
            />
            <TextField
              label="Sabotage Duration (seconds)"
              value={gameConfig.sabotageSeconds}
              onChange={(e) => setSabotageSeconds(e.target.value)}
              inputMode="numeric"
              fullWidth
            />
            <TextField
              label="Sabotage Charges (shared)"
              value={gameConfig.sabotageCharges}
              onChange={(e) => setSabotageCharges(e.target.value)}
              inputMode="numeric"
              fullWidth
            />
            <TextField
              label="Max Players per Task"
              value={gameConfig.maxPlayersPerTask}
              onChange={(e) => setMaxPlayersPerTask(e.target.value)}
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
