import { useGetGameState } from "../../../../hooks/useGetGameState";
import { useState, useEffect } from "react";
import { Box, Typography, Card, useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Timer() {
  const { gameState } = useGetGameState();
  const [timeLeft, setTimeLeft] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const updateTimer = () => {
      if (!gameState || !gameState.endOfGameUTC) {
        setTimeLeft(0);
        return;
      }

      const endTime = new Date(gameState.endOfGameUTC).getTime();
      const now = Date.now();
      const remaining = Math.max(0, endTime - now + 1000);
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const isLowTime = timeLeft < 300000; // Less than 5 minutes

  return (
    <Card
      sx={{
        backgroundColor: isLowTime
          ? theme.palette.error.light
          : theme.palette.info.light,
        boxShadow: 2,
        p: 2,
        mb: 2,
        transition: "background-color 0.3s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          justifyContent: "center",
        }}
      >
        <AccessTimeIcon
          sx={{
            color: isLowTime
              ? theme.palette.error.dark
              : theme.palette.info.dark,
            fontSize: 32,
          }}
        />
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: isLowTime
                ? theme.palette.error.dark
                : theme.palette.info.dark,
              display: "block",
              fontWeight: 600,
            }}
          >
            Verbleibende Zeit
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: isLowTime
                ? theme.palette.error.dark
                : theme.palette.info.dark,
              fontFamily: "monospace",
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
