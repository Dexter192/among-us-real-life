import TaskTab from "./tasks/TaskTab";
import GameTimer from "../../../components/Timer";
import GameOver from "./gameOver/GameOver";
import ReportDeadBody from "../components/ReportDeadBody";
import EmergencyMeeting from "../../../components/meeting/EmergencyMeeting";

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
      <ReportDeadBody gameState={gameState} />
      <TaskTab />
    </>
  );
}
