import Task from "./Task";
import { useGetPlayerTasks } from "../../../../hooks/useGetPlayerTasks";
import { useGetPlayerInfo } from "../../../../hooks/useGetPlayerInfo";
import { Box, Container, Typography, Stack } from "@mui/material";

export default function TaskTab() {
  const { tasks } = useGetPlayerTasks();
  const { playerInfo } = useGetPlayerInfo();
  const isImposter = playerInfo?.game_role === "IMPOSTER";

  console.log("Sabotage data:", playerInfo?.sabotages);
  console.log("Rendering TaskTab with tasks:", tasks);
  console.log("Player info:", playerInfo);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Deine Aufgaben
        </Typography>
        {tasks === undefined ? (
          <Typography>Lade Aufgaben...</Typography>
        ) : tasks.length === 0 ? (
          <Typography>Keine Aufgaben verfügbar.</Typography>
        ) : (
          <Stack spacing={0}>
            {Object.entries(tasks).map(([id, task]) => (
              <>
                <Task
                  key={id}
                  id={id}
                  sabotages={playerInfo?.sabotages}
                  task={task}
                  isImposter={isImposter}
                />
              </>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
