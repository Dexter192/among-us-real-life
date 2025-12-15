import { Box, Button, Chip, Stack, Typography } from "@mui/material";

import { useKickPlayer } from "../../../../hooks/useKickPlayer";

export default function PlayerDetails({
  player,
  playerId,
  tasks,
  handleClosePlayerDialog,
  onToggleAlive,
  renderTasks,
}) {
  const { kickPlayer } = useKickPlayer();

  if (!playerId || !player) return null;

  const isImpostor = player.game_role === "IMPOSTER";
  const isAlive = player.isAlive !== false;

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {/* Role Chip */}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Role
        </Typography>
        <Chip
          label={isImpostor ? "Impostor" : "Crewmate"}
          sx={{
            backgroundColor: isImpostor ? "#e74c3c" : "#27ae60",
            color: "white",
            fontWeight: 600,
            fontSize: "1rem",
            height: "auto",
            padding: "8px 12px",
          }}
        />
      </Box>

      {/* Status Chip */}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Status
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Chip
            label={isAlive ? "Alive" : "Dead"}
            variant={isAlive ? "filled" : "outlined"}
            sx={{
              backgroundColor: isAlive ? "#27ae60" : "transparent",
              color: isAlive ? "white" : "#e74c3c",
              borderColor: isAlive ? "transparent" : "#e74c3c",
              fontWeight: 600,
              fontSize: "1rem",
              height: "auto",
              padding: "8px 12px",
            }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={onToggleAlive}
            sx={{
              borderColor: isAlive ? "#e74c3c" : "#27ae60",
              color: isAlive ? "#e74c3c" : "#27ae60",
              "&:hover": {
                borderColor: isAlive ? "#c0392b" : "#229954",
                backgroundColor: isAlive
                  ? "rgba(231, 76, 60, 0.04)"
                  : "rgba(39, 174, 96, 0.04)",
              },
            }}
          >
            {isAlive ? "Mark as Dead" : "Mark as Alive"}
          </Button>
        </Stack>
      </Box>

      {/* Tasks */}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Tasks
        </Typography>
        {renderTasks ? renderTasks({ playerId, tasks }) : null}
      </Box>

      <Button
        onClick={() => {
          kickPlayer(playerId);
          handleClosePlayerDialog();
        }}
      >
        Kick Player
      </Button>
    </Stack>
  );
}
