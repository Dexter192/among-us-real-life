import { useGetPlayerInfo } from "../../../../hooks/useGetPlayerInfo";
import ImposterLose from "./ImposterLose";
import ImposterWin from "./ImposterWin";
import CrewmateLose from "./CrewmateLose";
import CrewmateWin from "./CrewmateWin";
import { useGetPlayers } from "../../../../hooks/useGetPlayers";

export default function GameOver({ gameState }) {
  const { playerInfo } = useGetPlayerInfo();
  const { players } = useGetPlayers();

  if (players === undefined || playerInfo === undefined) {
    return <div>Loading...</div>;
  }

  const imposters = Object.values(players).filter(
    (p) => p.game_role === "IMPOSTER"
  );
  const crewmates = Object.values(players).filter(
    (p) => p.game_role === "CREWMATE"
  );
  const role = playerInfo?.game_role;

  if (gameState.imposter_win) {
    if (role === "IMPOSTER") {
      return <ImposterWin imposters={imposters} />;
    }
    if (role === "CREWMATE") {
      return <CrewmateLose imposters={imposters} />;
    }
  }

  if (gameState.crewmate_win) {
    if (role === "CREWMATE") {
      return <CrewmateWin crewmates={crewmates} />;
    }
    if (role === "IMPOSTER") {
      return <ImposterLose crewmates={crewmates} />;
    }
  }
  return <div>Waiting for a new game to start...</div>;
}
