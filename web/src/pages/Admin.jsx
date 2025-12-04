import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [authId] = useState(() => {
    // simple per-tab admin id
    let a = sessionStorage.getItem("authId");
    if (!a) {
      a = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("authId", a);
    }
    return a;
  });
  const socketRef = useRef(null);
  const [meeting, setMeeting] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [numImpostors, setNumImpostors] = useState("1");
  const [tasks, setTasks] = useState([]);
  const [cooldownMinutes, setCooldownMinutes] = useState("0");
  const [killCooldownSeconds, setKillCooldownSeconds] = useState("0");
  const [maxPlayersPerTask, setMaxPlayersPerTask] = useState("2");
  const [sabotageSeconds, setSabotageSeconds] = useState("20");
  const [sabotageCharges, setSabotageCharges] = useState("2");
  const [cooldownRemainingMs, setCooldownRemainingMs] = useState(0);

  useEffect(() => {
    if (!authorized) return;

    const socket = io("http://localhost:4046", {
      transports: ["websocket"], // force WS
      auth: {
        role: "ADMIN",
        token: "test123",
      },
    });

    socketRef.current = socket;

    socket.on("play-meeting", async () => {
      await waitMs(2000);
    });

    socket.on("meeting-started", () => setMeeting(true));
    socket.on("meeting-ended", () => setMeeting(false));
    socket.on("game-started", () => setGameActive(true));
    socket.on("game-ended", () => {
      setGameActive(false);
      setMeeting(false);
      setCooldownRemainingMs(0);
    });
    socket.on("state", (s) => {
      setMeeting(!!s?.isMeeting);
      setGameActive(!!s?.isGameActive);
      if (typeof s?.emergencyCooldownEndMs === "number") {
        const remaining = s.emergencyCooldownEndMs - Date.now();
        setCooldownRemainingMs(Math.max(0, remaining));
      }
      if (s?.config) {
        if (typeof s.config.numImpostors === "number")
          setNumImpostors(String(s.config.numImpostors));
        if (Array.isArray(s.config.tasks)) setTasks(s.config.tasks);
        if (typeof s.config.emergencyCooldownMinutes === "number")
          setCooldownMinutes(String(s.config.emergencyCooldownMinutes));
        if (typeof s.config.killCooldownSeconds === "number")
          setKillCooldownSeconds(String(s.config.killCooldownSeconds));
        if (typeof s.config.maxPlayersPerTask === "number")
          setMaxPlayersPerTask(String(s.config.maxPlayersPerTask));
        if (typeof s.config.sabotageDurationSeconds === "number")
          setSabotageSeconds(String(s.config.sabotageDurationSeconds));
        if (typeof s.config.sabotageCharges === "number")
          setSabotageCharges(String(s.config.sabotageCharges));
      }
    });

    socket.on("cooldown-updated", ({ emergencyCooldownEndMs }) => {
      if (typeof emergencyCooldownEndMs === "number") {
        const remaining = emergencyCooldownEndMs - Date.now();
        setCooldownRemainingMs(Math.max(0, remaining));
      }
    });

    return () => socket.disconnect();
  }, [authorized]);

  useEffect(() => {
    if (!authorized) return;
    function onKeyDown(e) {
      const target = e.target;
      const tag = target && target.tagName;
      const isEditable =
        target &&
        (target.isContentEditable || tag === "INPUT" || tag === "TEXTAREA");
      if (isEditable) return;
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        emergencyMeeting();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [authorized]);

  function startGameWithConfig() {
    const payload = {
      numImpostors: Number.isFinite(parseInt(numImpostors, 10))
        ? parseInt(numImpostors, 10)
        : 0,
      tasks: tasks.length ? tasks : undefined,
      emergencyCooldownMinutes: Number.isFinite(parseFloat(cooldownMinutes))
        ? parseFloat(cooldownMinutes)
        : 0,
      killCooldownSeconds: Number.isFinite(parseFloat(killCooldownSeconds))
        ? parseFloat(killCooldownSeconds)
        : 0,
      maxPlayersPerTask: Number.isFinite(parseInt(maxPlayersPerTask, 10))
        ? parseInt(maxPlayersPerTask, 10)
        : undefined,
      sabotageDurationSeconds: Number.isFinite(parseInt(sabotageSeconds, 10))
        ? parseInt(sabotageSeconds, 10)
        : undefined,
      sabotageCharges: Number.isFinite(parseInt(sabotageCharges, 10))
        ? parseInt(sabotageCharges, 10)
        : undefined,
    };
    socketRef.current?.emit("start-game", payload);
    socketRef.current?.emit("message", payload);
  }

  function emergencyMeeting() {
    socketRef.current?.emit("emergency-meeting");
  }

  function continueGame() {
    socketRef.current?.emit("continue-game");
  }

  function endGame() {
    socketRef.current?.emit("end-game");
  }

  // Cooldown countdown tick
  useEffect(() => {
    const i = setInterval(() => {
      setCooldownRemainingMs((prev) => {
        const next = prev - 1000;
        return next > 0 ? next : 0;
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (!meeting && gameActive) {
      // When meeting ends, ask the server for a fresh snapshot (to get cooldown end)
      socketRef.current?.emit("get-state");
    }
  }, [meeting, gameActive]);

  async function waitMs(ms) {
    await new Promise((r) => setTimeout(r, ms));
  }

  const showStart = !gameActive;
  const showEmergency = gameActive && !meeting;
  const showContinue = meeting;

  return (
    <>
      <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
        <Typography variant="overline">Admin ({authId})</Typography>
        <Card sx={{ width: "100%", maxWidth: 420 }}>
          <CardContent>
            <Stack spacing={2} alignItems="center">
              {showEmergency && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={emergencyMeeting}
                  disabled={cooldownRemainingMs > 0}
                >
                  {cooldownRemainingMs > 0
                    ? `Emergency Cooldown (${Math.ceil(
                        cooldownRemainingMs / 1000
                      )}s)`
                    : "Emergency Meeting (Space)"}
                </Button>
              )}
              {showContinue && (
                <>
                  <Typography variant="h5" color="error">
                    MEETING TIME
                  </Typography>
                  <Button variant="contained" onClick={continueGame}>
                    Continue
                  </Button>
                </>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}
