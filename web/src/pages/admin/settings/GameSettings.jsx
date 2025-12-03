import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useAuthId } from "../../../hooks/useAuthId";
import AddTask from "../settings/tasks/AddTasks.jsx";
import TaskList from "../settings/tasks/TaskList.jsx";
import GameConfig from "./config/GameConfig.jsx";
import StartGameButton from "./StartGameButton.jsx";
import { useSocketConnection } from "../../../hooks/useSocketConnection";

export default function GameSettings() {
  const { authId } = useAuthId();

  return (
    <>
      <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
        <Typography variant="overline">Admin ({authId})</Typography>
        <Card sx={{ width: "100%", maxWidth: 420 }}>
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <GameConfig />
              <AddTask />
              <TaskList />
              <StartGameButton />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}
