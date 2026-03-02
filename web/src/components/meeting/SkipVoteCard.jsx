import {
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DoNotDisturbAlt } from "@mui/icons-material";
import { useVoteForPlayer } from "../../hooks/useVoteForPlayer";

const SKIP_VOTE_ID = "__skip__";

export default function SkipVoteCard({ players, isAdmin }) {
  const theme = useTheme();
  const { voteForPlayer } = useVoteForPlayer();
  const skipVotes = Object.entries(players ?? {})
    .filter(([_, player]) => player.votedFor === SKIP_VOTE_ID)
    .map(([playerId, player]) => ({ playerId, name: player.name }));

  return (
    <Button
      onClick={() => voteForPlayer(SKIP_VOTE_ID)}
      sx={{
        display: "block",
        width: "100%",
        padding: 0,
        textAlign: "inherit",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Card
        sx={{
          transition: "all 0.3s ease",
          border: `2px dashed ${theme.palette.warning.main}`,
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "rgba(255, 152, 0, 0.08)",
          },
        }}
      >
        <CardContent>
          <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <DoNotDisturbAlt sx={{ color: theme.palette.warning.main }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Überspringen
              </Typography>
            </Stack>

            <Box sx={{ mt: 1 }}>
              <Stack spacing={1}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: "text.secondary" }}
                >
                  Stimmen: {skipVotes.length}
                </Typography>
                {skipVotes.length > 0 && (
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ flexWrap: "wrap", gap: 0.5 }}
                  >
                    {skipVotes.map((vote) => (
                      <Tooltip
                        key={vote.playerId}
                        title={isAdmin ? vote.name : ""}
                        arrow
                        placement="bottom"
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.warning.main,
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
          </Stack>
        </CardContent>
      </Card>
    </Button>
  );
}
