import { useGetGameState } from "../../hooks/useGetGameState";
import LobbyPage from "./lobby/LobbyPage";
import GamePage from "./game/GamePage";
import PlayerLogin from "./login/PlayerLogin";
import { useState } from "react";

export default function PlayerPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <>
      <PlayerLogin
        isAuthorized={isAuthorized}
        setIsAuthorized={setIsAuthorized}
      />

      {isAuthorized && <AuthorizedContent />}
    </>
  );
}

function AuthorizedContent() {
  const { gameState } = useGetGameState();

  if (gameState === undefined) {
    return <div>Connecting to server...</div>;
  }

  const inLobby =
    !gameState.started && !gameState.imposter_win && !gameState.crewmate_win;

  return inLobby ? (
    <LobbyPage gameState={gameState} />
  ) : (
    <GamePage gameState={gameState} />
  );
}
