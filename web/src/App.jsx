import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Player from "./pages/Player.jsx";
import Admin from "./pages/Admin.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [gameActive, setGameActive] = useState(false);
  const socketRef = useRef(null);

  // useEffect(() => {
  //   if (!isAdmin) return;
  //   // const socket = io({ auth: { role: 'ADMIN' } });
  //   const socket = io('http://localhost:4046', {
  //       transports: ["websocket"], // force WS
  //       auth: {
  //       role: "ADMIN",
  //       token: "test123",
  //     }
  //   });
  //   socketRef.current = socket;
  //   socket.on("connect", () => {
  //     console.log("CONNECTED:", socket.id);
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.error("CONNECT ERROR:", err);
  //   });

  //   socket.on("server_ready", (data) => {
  //     console.log("SERVER READY:", data);
  //   });

  //   socket.on('game-started', () => setGameActive(true));
  //   socket.on('game-ended', () => setGameActive(false));
  //   socket.on('state', (s) => setGameActive(!!s?.isGameActive));

  //   return () => socket.disconnect();
  // }, [isAdmin]);

  function endGame() {
    socketRef.current?.emit("end-game");
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">{isAdmin ? "Admin" : "Player"}</Typography>
        {isAdmin && gameActive ? (
          <Button color="inherit" onClick={endGame}>
            End Game
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Box
        sx={{
          py: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Routes>
            <Route path="/" element={<AdminPage />} />
            {/* <Route path="/" element={<Player />} /> */}
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;
