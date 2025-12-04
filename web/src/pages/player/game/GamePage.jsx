import { useGetPlayerTasks } from "../../../hooks/useGetPlayerTasks";
import Task from "./tasks/Task";
import { Box, Container, Typography, Stack } from "@mui/material";

export default function GamePage() {
  const { tasks } = useGetPlayerTasks();

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
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
