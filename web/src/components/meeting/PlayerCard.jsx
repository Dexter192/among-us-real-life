import {
  Card,
  CardContent,
  Box,
  Button,
  Typography,
  Stack,
  Chip,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useVoteForPlayer } from "../../hooks/useVoteForPlayer";
import { useChangePlayerVitals } from "../../hooks/useChangePlayerVitals";

export default function PlayerCard({ id, player, isAlive, players, isAdmin }) {
  const theme = useTheme();
  const { changePlayerVitals } = useChangePlayerVitals();
  const { voteForPlayer } = useVoteForPlayer();

  const castVote = () => {
    if (isAdmin) {
      changePlayerVitals(id, !isAlive);
      return;
    }
    if (!isAlive) return;
    voteForPlayer(id);
  };

  let votes = player.votes ?? [];

  if (isAdmin && votes.length > 0) {
    console.log("Updating votes for player:", player.name);
    console.log("Fetched players:", players);
    votes.map((voterId, idx) => {
      if (players && players[voterId]) {
        votes[idx] = players[voterId].name;
      }
    });
  }

  return (
    <Button
      onClick={castVote}
      sx={{
        display: "block",
        width: "100%",
        padding: 0,
        textAlign: "inherit",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent",
        },
        cursor: isAlive || isAdmin ? "pointer" : "not-allowed",
      }}
    >
      <Card
        sx={{
          transition: "all 0.3s ease",
          paddingBottom: isAdmin ? 3 : 0,
          paddingLeft: 1,
          paddingRight: 1,
          border: `2px solid ${
            isAlive ? theme.palette.success.main : theme.palette.error.main
          }`,
          backgroundColor: isAlive
            ? "background.paper"
            : theme.palette.error.lighter ?? "rgba(244, 67, 54, 0.08)",
          "&:hover": isAlive
            ? {
                backgroundColor: `rgba(244, 67, 54, 0.08)`,
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
                    Stimmen: {votes.length}
                  </Typography>
                  {/* Vote Icons */}
                  {votes.length > 0 && (
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ flexWrap: "wrap", gap: 0.5 }}
                    >
                      {votes.map((voter, idx) => (
                        <Tooltip
                          title={isAdmin ? voter : ""}
                          arrow
                          placement="bottom"
                        >
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
                        </Tooltip>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Button>
  );
}
