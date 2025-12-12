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

export default function AdminLogin({ setIsAuthorized }) {
  const [adminCode, setAdminCode] = useState("");
  const [isWaitingForAuth, setIsWaitingForAuth] = useState(false);
  const { socket } = useSocketConnection();

  // Auto-authorize in dev mode
  useEffect(() => {
    if (!socket) return;
    if (import.meta.env.DEV) {
      socket.emit("login", {
        role: "ADMIN",
        password: import.meta.env.VITE_ADMIN_PASSWORD,
        authId: localStorage.getItem("authId"),
      });
    }
  }, [socket, setIsAuthorized]);

  // Listen for login response
  useEffect(() => {
    if (!socket) return;

    socket.emit("is_logged_in", {
      role: "ADMIN",
      authId: localStorage.getItem("authId"),
    });

    socket.on("login_response", (response) => {
      setIsWaitingForAuth(false);
      if (response.success) {
        setIsAuthorized(true);
      } else {
        alert(`Login failed: ${response.error}`);
        setAdminCode("");
      }
    });

    return () => {
      socket.off("login_response");
    };
  }, [socket, setIsAuthorized]);

  const handleLogin = () => {
    if (!adminCode || !socket) return;

    setIsWaitingForAuth(true);
    socket.emit("login", {
      role: "ADMIN",
      password: adminCode,
      authId: localStorage.getItem("authId"),
    });
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Admin Access
            </Typography>
            <TextField
              label="Admin Password"
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
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
              disabled={!adminCode || isWaitingForAuth}
            >
              {isWaitingForAuth ? "Authenticating..." : "Enter"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
