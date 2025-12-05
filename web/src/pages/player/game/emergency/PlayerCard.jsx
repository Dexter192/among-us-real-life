import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Chip,
  useTheme,
} from "@mui/material";
import { useVoteForPlayer } from "../../../../hooks/useVoteForPlayer";
import { Person } from "@mui/icons-material";

export default function PlayerCard({ id, player, isAlive }) {
  const { voteForPlayer } = useVoteForPlayer();
  const theme = useTheme();

  const castVote = () => {
    if (!isAlive) return;
    voteForPlayer(id);
  };

  const votes = player.votes ?? 0;
  const voteArray = Array(votes).fill(0);

  return (
    <Card
      onClick={castVote}
      sx={{
        cursor: isAlive ? "pointer" : "not-allowed",
        transition: "all 0.3s ease",
        border: `2px solid ${
          isAlive ? theme.palette.success.main : theme.palette.error.main
        }`,
        backgroundColor: isAlive
          ? "background.paper"
          : theme.palette.error.lighter ?? "rgba(244, 67, 54, 0.08)",
        "&:hover": isAlive
          ? {
              transform: "translateY(-4px)",
              boxShadow: 4,
              backgroundColor: theme.palette.action.hover,
            }
          : {},
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          {/* Player Name and Status */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ flex: 1 }}
            >
              <Person
                sx={{
                  color: isAlive
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                {player.name}
              </Typography>
            </Stack>
            <Chip
              label={isAlive ? "Am Leben" : "Tot"}
              color={isAlive ? "success" : "error"}
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Stack>

          {/* Vote Count Display */}
          {isAlive && (
            <Box sx={{ mt: 1 }}>
              <Stack spacing={1}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: "text.secondary" }}
                >
                  Stimmen: {votes}
                </Typography>
                {/* Vote Icons */}
                {votes > 0 && (
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ flexWrap: "wrap", gap: 0.5 }}
                  >
                    {voteArray.map((_, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "bold",
                          boxShadow: 2,
                        }}
                      >
                        ✓
                      </Box>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
