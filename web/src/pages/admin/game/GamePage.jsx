import StopGameButton from "./StopGameButton";
import EmergencyMeeting from "../../../components/meeting/EmergencyMeeting";
import ProgressBar from "../../../components/ProgressBar";
import GameTimer from "../../../components/Timer";
import PlayerTab from "./players/PlayerTab";
import PendingTaskList from "./tasks/PendingTaskList";

export default function GamePage({ gameState }) {
  return (
    <>
      <h1>Admin Page</h1>
      <GameTimer endTimeUTC={gameState.endOfGameUTC} />

      {gameState.emergency_meeting && (
        <EmergencyMeeting gameState={gameState} isAdmin={true} />
      )}
      <ProgressBar />
      <PendingTaskList />
      <PlayerTab gameState={gameState} />
      <StopGameButton />
    </>
  );
}
