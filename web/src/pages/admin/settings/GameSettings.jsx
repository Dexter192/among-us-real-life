import GameConfig from "./config/GameConfig.jsx";
import StartGameButton from "./StartGameButton.jsx";
import TaskTab from "./tasks/TaskTab.jsx";
import PlayerTab from "./players/PlayerTab.jsx";

export default function GameSettings() {
  return (
    <>
      <GameConfig />
      <TaskTab />
      <PlayerTab />
      <StartGameButton />
    </>
  );
}
