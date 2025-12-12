import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSocketConnection } from "../hooks/useSocketConnection";

export default function ProgressBar() {
  const { socket } = useSocketConnection();
  const theme = useTheme();
  const [prevProgress, setPrevProgress] = useState(0);
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handleTaskCompleted = (data) => {
      setTotalTasksCompleted(data.completed);
      setTotalTasks(data.total);
    };
    socket.emit("total_tasks_completed");
    socket.on("total_tasks_completed", handleTaskCompleted);

    return () => {
      socket.off("total_tasks_completed", handleTaskCompleted);
    };
  }, [socket]);

  const progress =
    totalTasks > 0 ? (totalTasksCompleted / totalTasks) * 100 : 0;

  useEffect(() => {
    if (progress > prevProgress && prevProgress !== 0) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
    }
    setPrevProgress(progress);
  }, [progress]);

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
          {totalTasksCompleted} / {totalTasks}
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
