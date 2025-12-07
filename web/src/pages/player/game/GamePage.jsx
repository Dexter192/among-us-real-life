import TaskTab from "./tasks/TaskTab";
import GameTimer from "../../../components/Timer";
import GameOver from "./gameOver/GameOver";
import ReportDeadBody from "../components/ReportDeadBody";
import EmergencyMeeting from "../../../components/meeting/EmergencyMeeting";
import ProgressBar from "../../../components/ProgressBar";
import RoleView from "./role/RoleView";
import { Divider, Stack } from "@mui/material";

export default function GamePage({ gameState }) {
  if (gameState.imposter_win || gameState.crewmate_win) {
    return <GameOver gameState={gameState} />;
  }

  if (gameState.emergency_meeting) {
    return <EmergencyMeeting gameState={gameState} />;
  }

  return (
    <>
      <GameTimer endTimeUTC={gameState.endOfGameUTC} />
      <Divider sx={{ my: 2 }} />
      <ProgressBar />
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <ReportDeadBody gameState={gameState} />
        <RoleView />
      </Stack>
      <TaskTab />
    </>
  );
}
