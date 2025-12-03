import { useState, useEffect } from "react";
import GamePage from "./game/GamePage";
import AdminLogin from "./login/AdminLogin";
import { useSocketConnection } from "../../hooks/useSocketConnection";
import GameSettings from "./settings/GameSettings";

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  if (!isAuthorized) {
    return <AdminLogin setIsAuthorized={setIsAuthorized} />;
  }

  return <AuthorizedAdmin />;
}

function AuthorizedAdmin() {
  const [isStarted, setIsStarted] = useState(false);
  const [emergencyMeeting, setEmergencyMeeting] = useState(false);
  const { socket } = useSocketConnection(true);

  useEffect(() => {
    if (socket === null) return;
    socket.on("start_game", () => {
      setIsStarted(true);
    });
    socket.on("stop_game", () => {
      setIsStarted(false);
    });
  }, [socket]);

  if (socket === null) {
    return <div>Connecting to server...</div>;
  }

  if (!isStarted) {
    return <GameSettings setIsStarted={setIsStarted} />;
  }

  return <GamePage />;
}
