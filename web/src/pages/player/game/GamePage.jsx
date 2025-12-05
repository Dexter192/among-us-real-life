import TaskTab from "./tasks/TaskTab";
import GameTimer from "../../../components/Timer";
import GameOver from "./gameOver/GameOver";
import ReportDeadBody from "../components/ReportDeadBody";

export default function GamePage({ gameState }) {
  if (gameState.imposter_win || gameState.crewmate_win) {
    return <GameOver gameState={gameState} />;
  }

  return (
    <>
      <GameTimer endTimeUTC={gameState.endOfGameUTC} />
      <ReportDeadBody />
      <TaskTab />
    </>
  );
}
