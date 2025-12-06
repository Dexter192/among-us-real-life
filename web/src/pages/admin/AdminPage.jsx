import { useState, useEffect } from "react";
import GamePage from "./game/GamePage";
import AdminLogin from "./login/AdminLogin";
import GameSettings from "./settings/GameSettings";
import { useGetGameState } from "../../hooks/useGetGameState";
import { useSocketConnection } from "../../hooks/useSocketConnection";

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  if (!isAuthorized) {
    return <AdminLogin setIsAuthorized={setIsAuthorized} />;
  }

  return <AuthorizedAdmin />;
}

function AuthorizedAdmin() {
  const { socket } = useSocketConnection(true); // Initialize socket connection as an admin
  const { gameState } = useGetGameState();

  if (gameState === undefined) {
    return <div>Connecting to server...</div>;
  }

  if (!gameState.started) {
    return <GameSettings />;
  }

  return <GamePage gameState={gameState} />;
}
