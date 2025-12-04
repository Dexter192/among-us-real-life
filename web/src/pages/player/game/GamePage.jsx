import TaskTab from "./tasks/TaskTab";
import Timer from "./timer/Timer";
import GameOver from "./gameOver/GameOver";

export default function GamePage({ gameState }) {
  if (gameState.imposter_win || gameState.crewmate_win) {
    return <GameOver gameState={gameState} />;
  }

  return (
    <>
      <Timer />
      <TaskTab />
    </>
  );
}
