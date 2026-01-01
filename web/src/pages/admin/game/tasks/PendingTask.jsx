import { useConfirmTask } from "../../../../hooks/useConfirmTask";
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function PendingTask({ players, playerId, pendingTasks }) {
  const { completeTask } = useConfirmTask();
  const playerName = players?.[playerId]?.name || playerId;

  if (!pendingTasks || Object.keys(pendingTasks).length === 0) return null;

  return (
    <Card sx={{ mb: 2, bgcolor: "background.paper", borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          {playerName}
        </Typography>
        <Stack spacing={1.5}>
          {Object.entries(pendingTasks).map(([taskId, task]) => (
            <Box
              key={taskId}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                bgcolor: "action.hover",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ flex: 1, mr: 2 }}>
                <Typography variant="body1">{task.name}</Typography>
                {task.solution && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Solution: {task.solution}
                  </Typography>
                )}
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  startIcon={<CheckIcon />}
                  onClick={() => completeTask(playerId, taskId, true)}
                  sx={{ minWidth: 100 }}
                >
                  Approve
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<CloseIcon />}
                  onClick={() => completeTask(playerId, taskId, false)}
                  sx={{ minWidth: 100 }}
                >
                  Reject
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
