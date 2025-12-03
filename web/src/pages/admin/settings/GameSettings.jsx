import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useAuthId } from "../../../hooks/useAuthId";
import GameConfig from "./config/GameConfig.jsx";
import StartGameButton from "./StartGameButton.jsx";
import TaskTab from "./tasks/TaskTab.jsx";

export default function GameSettings() {
  return (
    <>
      <GameConfig />
      <TaskTab />

      <Stack spacing={1} alignItems="center" sx={{ py: 3 }}>
        <Card sx={{ width: "100%", maxWidth: 420, padding: 2 }}>
          <StartGameButton />
        </Card>
      </Stack>
    </>
  );
}
