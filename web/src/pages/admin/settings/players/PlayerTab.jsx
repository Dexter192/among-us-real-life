import { CardContent } from "@mui/material";
import { Stack, Card, Typography } from "@mui/material";
import { useGetPlayers } from "../../../../hooks/useGetPlayers";

export default function PlayerInfo() {
  const { players } = useGetPlayers();

  return (
    <Stack spacing={1} alignItems="center" sx={{ py: 3 }}>
      <Card sx={{ width: "100%", maxWidth: 420, padding: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center">
            Number of Players: {players ? Object.keys(players).length : 0}
          </Typography>
        </CardContent>
        <CardContent>
          {players ? (
            Object.values(players).map((player, index) => (
              <Typography key={player.id} variant="body1">
                {index + 1} - {player.name}
              </Typography>
            ))
          ) : (
            <Typography variant="body1">Waiting for players...</Typography>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
