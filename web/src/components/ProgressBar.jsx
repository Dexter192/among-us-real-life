import { useGetPlayers } from "../hooks/useGetPlayers";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSocketConnection } from "../hooks/useSocketConnection";

export default function ProgressBar() {
  const { players, refetchPlayers } = useGetPlayers();
  const { socket } = useSocketConnection();
  const theme = useTheme();
  const [showAnimation, setShowAnimation] = useState(false);
  const [prevProgress, setPrevProgress] = useState(0);

  useEffect(() => {
    if (!socket) return;

    const handleTaskCompleted = () => {
      refetchPlayers();
    };

    socket.on("task_completed", handleTaskCompleted);

    return () => {
      socket.off("task_completed", handleTaskCompleted);
    };
  }, [socket, refetchPlayers]);

  // Calculate tasks and progress
  const tasks =
    players && Object.keys(players).length > 0
      ? Object.values(players).flatMap(
          (player) => Object.values(player.tasks) || []
        )
      : [];
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  console.log("Progress bar debug:", {
    playersCount: players ? Object.keys(players).length : 0,
    totalTasks: tasks.length,
    completedTasks,
    progress,
  });

  useEffect(() => {
    if (progress > prevProgress && prevProgress !== 0) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
    }
    setPrevProgress(progress);
  }, [progress]);

  // Early return AFTER all hooks
  if (!players || Object.keys(players).length === 0 || tasks.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.secondary,
          }}
        >
          Aufgaben-Fortschritt
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.secondary,
          }}
        >
          {completedTasks} / {tasks.length}
        </Typography>
      </Box>

      <Box sx={{ position: "relative" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 12,
            borderRadius: 2,
            backgroundColor: theme.palette.grey[200],
            overflow: "hidden",
            "& .MuiLinearProgress-bar": {
              borderRadius: 2,
              background: `repeating-linear-gradient(
                45deg,
                ${theme.palette.info.main},
                ${theme.palette.info.main} 10px,
                ${theme.palette.info.light} 10px,
                ${theme.palette.info.light} 20px
              )`,
              backgroundSize: "28px 28px",
              animation: "stripes 1s linear infinite",
              transition: "transform 0.5s ease-in-out",
            },
            "@keyframes stripes": {
              "0%": {
                backgroundPosition: "0 0",
              },
              "100%": {
                backgroundPosition: "28px 0",
              },
            },
          }}
        />
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 0.5,
          color: theme.palette.text.secondary,
          textAlign: "center",
        }}
      >
        {Math.round(progress)}% abgeschlossen
      </Typography>
    </Box>
  );
}
