import GameConfig from "./config/GameConfig.jsx";
import GameActions from "./GameActions.jsx";
import TaskTab from "./tasks/TaskTab.jsx";
import SabotageTab from "./sabotages/SabotageTab.jsx";
import PlayerTab from "./players/PlayerTab.jsx";

export default function GameSettings({ gameState }) {
  return (
    <>
      {gameState.imposter_win && <h2>Imposters Win!</h2>}
      {gameState.crewmate_win && <h2>Crewmates Win!</h2>}

      <GameConfig />
      <TaskTab />
      <SabotageTab />
      <PlayerTab />
      <GameActions />
    </>
  );
}
