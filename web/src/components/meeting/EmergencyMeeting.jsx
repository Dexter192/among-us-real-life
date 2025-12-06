import { useGetPlayers } from "../../hooks/useGetPlayers";
import PlayerCard from "./PlayerCard";
import MeetingTimer from "../Timer";
import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import { Gavel } from "@mui/icons-material";
import { useGetPlayerInfo } from "../../hooks/useGetPlayerInfo";

export default function EmergencyMeeting({ gameState, isAdmin = false }) {
  const { players } = useGetPlayers();
  const theme = useTheme();
  const { playerInfo } = useGetPlayerInfo();

  if (players === undefined) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>Lade Spieler...</Typography>
      </Box>
    );
  }

  const alive = Object.fromEntries(
    Object.entries(players).filter(([_, p]) => p.isAlive)
  );
  const dead = Object.fromEntries(
    Object.entries(players).filter(([_, p]) => !p.isAlive)
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ mb: 2 }}
          >
            <Gavel sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              Notfall-Treffen
            </Typography>
          </Stack>
          {!playerInfo?.isAlive && (
            <Typography variant="body1" color="text.secondary">
              Du bist tot und kannst nicht abstimmen.
            </Typography>
          )}
          {playerInfo?.isAlive && (
            <Typography variant="body1" color="text.secondary">
              Besprecht euch und versucht, einen Imposter aus dem Spiel zu
              werfen!
            </Typography>
          )}
        </Box>

        {/* Timer */}
        <Box sx={{ mb: 3 }}>
          <MeetingTimer
            endTimeUTC={gameState.endOfMeetingUTC}
            lowTimeThreshold={60000}
          />
        </Box>

        {/* Alive Players */}
        {Object.keys(alive).length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.success.main,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Lebende Spieler ({Object.keys(alive).length})
            </Typography>
            <Stack spacing={2}>
              {Object.entries(alive).map(([id, player]) => (
                <PlayerCard
                  key={id}
                  id={id}
                  player={player}
                  isAlive={true}
                  players={players}
                  isAdmin={isAdmin}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Divider */}
        {Object.keys(alive).length > 0 && Object.keys(dead).length > 0 && (
          <Divider sx={{ my: 3 }} />
        )}

        {/* Dead Players */}
        {Object.keys(dead).length > 0 && (
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.error.main,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Tote Spieler ({Object.keys(dead).length})
            </Typography>
            <Stack spacing={2}>
              {Object.entries(dead).map(([id, player]) => (
                <PlayerCard
                  key={id}
                  id={id}
                  player={player}
                  isAlive={false}
                  isAdmin={isAdmin}
                />
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
