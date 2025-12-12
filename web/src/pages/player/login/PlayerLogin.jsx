import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSocketConnection } from "../../../hooks/useSocketConnection";

export default function PlayerLogin({ setIsAuthorized }) {
  const [playerName, setPlayerName] = useState("");
  const [playerCode, setPlayerCode] = useState("");
  const [isWaitingForAuth, setIsWaitingForAuth] = useState(false);
  const { socket } = useSocketConnection();

  // Auto-authorize in dev mode
  useEffect(() => {
    if (!socket) return;
    if (import.meta.env.DEV) {
      socket.emit("login", {
        role: "PLAYER",
        name: "DevPlayer",
        password: import.meta.env.VITE_PLAYER_PASSWORD,
        authId: localStorage.getItem("authId"),
      });
    }
  }, [socket, setIsAuthorized]);

  // Listen for login response
  useEffect(() => {
    if (!socket) return;

    socket.emit("is_logged_in", {
      role: "PLAYER",
      authId: localStorage.getItem("authId"),
    });

    socket.on("login_response", (response) => {
      setIsWaitingForAuth(false);
      if (response.success) {
        setIsAuthorized(true);
      } else {
        setPlayerCode("");
      }
    });

    return () => {
      socket.off("login_response");
    };
  }, [socket, setIsAuthorized]);

  const handleLogin = () => {
    if (!playerCode || !socket) return;

    setIsWaitingForAuth(true);
    socket.emit("login", {
      role: "PLAYER",
      password: playerCode,
      name: playerName,
      authId: localStorage.getItem("authId"),
    });
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Among Us - AWO Karlsruhe
            </Typography>
            <TextField
              label="Name"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              disabled={isWaitingForAuth}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              value={playerCode}
              onChange={(e) => setPlayerCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isWaitingForAuth) {
                  handleLogin();
                }
              }}
              disabled={isWaitingForAuth}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={!playerCode || isWaitingForAuth}
            >
              {isWaitingForAuth ? "Authenticating..." : "Enter"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
