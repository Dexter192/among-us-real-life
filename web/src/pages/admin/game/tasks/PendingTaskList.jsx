import { useGetAllTasks } from "../../../../hooks/useGetAllTasks";
import { useGetPendingTasks } from "../../../../hooks/useGetPendingTasks";
import { useGetPlayers } from "../../../../hooks/useGetPlayers";
import PendingTask from "./PendingTask";
import { Box, Typography, Stack } from "@mui/material";

export default function PendingTaskList() {
  const { pendingTasks, refetchPendingTasks } = useGetPendingTasks();
  const { players } = useGetPlayers();

  const hasPendingTasks = pendingTasks && Object.keys(pendingTasks).length > 0;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Pending Task Confirmations
      </Typography>
      {hasPendingTasks ? (
        <Stack spacing={2}>
          {Object.entries(pendingTasks || {}).map(([authId, tasks]) => (
            <PendingTask
              key={authId}
              playerId={authId}
              pendingTasks={tasks}
              players={players}
            />
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">
          No pending tasks to confirm.
        </Typography>
      )}
    </Box>
  );
}
