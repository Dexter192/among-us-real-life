import TaskTab from "./tasks/TaskTab";
import GameTimer from "../../../components/Timer";
import GameOver from "./gameOver/GameOver";
import ReportDeadBody from "../components/ReportDeadBody";
import EmergencyMeeting from "../../../components/meeting/EmergencyMeeting";
import ProgressBar from "../../../components/ProgressBar";
import RoleView from "./role/RoleView";
import { Divider, Stack, Typography } from "@mui/material";
import { useGetPlayerInfo } from "../../../hooks/useGetPlayerInfo";
import SabotageBanner from "./sabotage/SabotageBanner";

export default function GamePage({ gameState }) {
  const { playerInfo } = useGetPlayerInfo();

  if (gameState.imposter_win || gameState.crewmate_win) {
    return <GameOver gameState={gameState} />;
  }

  if (gameState.emergency_meeting) {
    return <EmergencyMeeting gameState={gameState} />;
  }

  console.log("Gamestate in GamePage:", gameState);
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {playerInfo?.name}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <GameTimer endTimeUTC={gameState.endOfGameUTC} />
      <Divider sx={{ my: 2 }} />
      <ProgressBar />
      <Divider sx={{ my: 2 }} />
      <SabotageBanner gameState={gameState} />
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <ReportDeadBody gameState={gameState} />
        <RoleView />
      </Stack>
      <TaskTab />
    </>
  );
}
