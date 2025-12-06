import { Button, Box, Typography } from "@mui/material";
import { useReportDeadBody } from "../../../hooks/useReportDeadBody";
import { useEffect, useState } from "react";

export default function ReportDeadBody({ gameState }) {
  const { reportDeadBody } = useReportDeadBody();
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    if (!gameState || gameState.endOfMeetingCooldownUTC === 0) {
      setCooldownTime(0);
      return;
    }

    const cooldownSeconds = Math.max(
      0,
      Math.floor(
        (new Date(gameState.endOfMeetingCooldownUTC) - new Date()) / 1000
      )
    );
    setCooldownTime(cooldownSeconds);

    const interval = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState?.endOfMeetingCooldownUTC]);

  const formatCooldown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isDisabled = cooldownTime > 0;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Button
        sx={{
          backgroundImage: "url(/images/report.png)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          p: 10,
          position: "relative",
        }}
        disabled={isDisabled}
        onClick={reportDeadBody}
      />
      {isDisabled && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(2px)",
            pointerEvents: "none",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "2rem",
              color: "white",
              fontFamily: "monospace",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            {formatCooldown(cooldownTime)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
