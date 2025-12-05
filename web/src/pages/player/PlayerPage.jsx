import { useGetGameState } from "../../hooks/useGetGameState";
import { useSocketConnection } from "../../hooks/useSocketConnection";
import LobbyPage from "./lobby/LobbyPage";
import GamePage from "./game/GamePage";
import PlayerLogin from "./login/PlayerLogin";
import EmergencyMeeting from "./game/emergency/EmergencyMeeting";
import { useState } from "react";

export default function PlayerPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  if (!isAuthorized) {
    return <PlayerLogin setIsAuthorized={setIsAuthorized} />;
  }

  return <AuthorizedPlayer />;
}

function AuthorizedPlayer() {
  const { socket } = useSocketConnection(); // Initialize socket connection as a player
  const { gameState } = useGetGameState();

  if (gameState === undefined) {
    return <div>Connecting to server...</div>;
  }

  if (
    !gameState.started &&
    !gameState.imposter_win &&
    !gameState.crewmate_win
  ) {
    return <LobbyPage gameState={gameState} />;
  }

  if (gameState.emergency_meeting) {
    return <EmergencyMeeting gameState={gameState} />;
  }

  return <GamePage gameState={gameState} />;
}
