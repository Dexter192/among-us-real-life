import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { useConfirmTask } from "../../../../hooks/useConfirmTask";
import { useRerollTask } from "../../../../hooks/useRerollTask";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CasinoIcon from "@mui/icons-material/Casino";

export default function PlayerTask({ playerId, tasks }) {
  const { completeTask } = useConfirmTask();
  const { rerollTask } = useRerollTask();

  const handleMarkComplete = (taskId) => {
    completeTask(playerId, taskId, true);
  };

  const handleMarkIncomplete = (taskId) => {
    completeTask(playerId, taskId, false);
  };

  const handleReroll = (taskId) => {
    rerollTask(playerId, taskId);
  };

  if (!tasks || Object.keys(tasks).length === 0) {
    return (
      <Typography color="text.secondary" variant="body2">
        No tasks assigned.
      </Typography>
    );
  }

  return (
    <List>
      {Object.entries(tasks).map(([taskId, task]) => (
        <ListItem
          key={taskId}
          divider
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <ListItemText
              primary={task.name}
              secondary={
                <Chip
                  label={
                    task.completed
                      ? "Completed"
                      : task.pending
                        ? "Pending"
                        : "Open"
                  }
                  size="small"
                  sx={{
                    backgroundColor: task.completed
                      ? "#27ae60"
                      : task.pending
                        ? "#f39c12"
                        : "#3498db",
                    color: "white",
                    mt: 1,
                  }}
                />
              }
            />
          </Box>

          <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<CheckIcon />}
              onClick={() => handleMarkComplete(taskId)}
              disabled={task.completed}
              sx={{ flex: 1 }}
            >
              Complete
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<CloseIcon />}
              onClick={() => handleMarkIncomplete(taskId)}
              disabled={!task.completed && !task.pending}
              sx={{ flex: 1 }}
            >
              Incomplete
            </Button>
          </Stack>

          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<CasinoIcon />}
            onClick={() => handleReroll(taskId)}
            fullWidth
          >
            Reroll Task
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
