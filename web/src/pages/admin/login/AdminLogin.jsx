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
import { useAuthId } from "../../../hooks/useAuthId";

export default function AdminLogin({ isAuthorized, setIsAuthorized }) {
  const [adminCode, setAdminCode] = useState("");
  const [isWaitingForAuth, setIsWaitingForAuth] = useState(false);
  const { authId } = useAuthId();
  const { socket } = useSocketConnection();
  const SESSION_GRACE_MS = 900000;

  // Auto-authorize in dev mode
  useEffect(() => {
    if (!socket) return;
    if (import.meta.env.DEV) {
      socket.emit("login", {
        role: "ADMIN",
        password: import.meta.env.VITE_ADMIN_PASSWORD,
        authId: authId,
      });
    }
  }, [socket, authId, setIsAuthorized]);

  // Listen for login response
  useEffect(() => {
    if (!socket) return;

    let disconnectTimer = null;

    const requestReauth = () => {
      socket.emit("is_logged_in", {
        role: "ADMIN",
        authId: authId,
      });
    };

    requestReauth();

    socket.on("login_response", (response) => {
      setIsWaitingForAuth(false);
      if (response.success) {
        if (disconnectTimer) {
          clearTimeout(disconnectTimer);
          disconnectTimer = null;
        }
        setIsAuthorized(true);
      } else {
        setAdminCode("");
        setIsAuthorized(false);
      }
    });

    const onDisconnect = (reason) => {
      console.log("[AdminPage] socket disconnected:", reason);
      if (disconnectTimer) {
        clearTimeout(disconnectTimer);
      }
      disconnectTimer = setTimeout(() => {
        setIsAuthorized(false);
      }, SESSION_GRACE_MS);
    };

    const onConnect = () => {
      if (disconnectTimer) {
        clearTimeout(disconnectTimer);
        disconnectTimer = null;
      }
      requestReauth();
    };

    socket.on("disconnect", onDisconnect);
    socket.on("connect", onConnect);

    return () => {
      socket.off("login_response");
      socket.off("disconnect", onDisconnect);
      socket.off("connect", onConnect);
      if (disconnectTimer) {
        clearTimeout(disconnectTimer);
      }
    };
  }, [socket, authId, setIsAuthorized]);

  const handleLogin = () => {
    if (!adminCode || !socket) return;

    setIsWaitingForAuth(true);
    socket.emit("login", {
      role: "ADMIN",
      password: adminCode,
      authId: authId,
    });
  };

  if (isAuthorized) {
    return null;
  }

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
