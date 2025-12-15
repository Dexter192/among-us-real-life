import { useState } from "react";
import GamePage from "./game/GamePage";
import AdminLogin from "./login/AdminLogin";
import GameSettings from "./settings/GameSettings";
import { useGetGameState } from "../../hooks/useGetGameState";

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <>
      <AdminLogin
        isAuthorized={isAuthorized}
        setIsAuthorized={setIsAuthorized}
      />

      {isAuthorized && <AuthorizedAdmin />}
    </>
  );
}

function AuthorizedAdmin() {
  const { gameState } = useGetGameState();

  if (gameState === undefined) {
    return <div>Connecting to server...</div>;
  }

  if (!gameState.started) {
    return <GameSettings gameState={gameState} />;
  }

  return <GamePage gameState={gameState} />;
}
