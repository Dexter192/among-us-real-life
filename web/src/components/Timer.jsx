import { Box, Typography, Card, useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useCountdownTimer } from "../hooks/useCountdownTimer";

export default function Timer({ endTimeUTC, lowTimeThresholdMinutes = 5 }) {
  const lowTimeThreshold = lowTimeThresholdMinutes * 60000;
  const { timeLeft, formatTime } = useCountdownTimer(endTimeUTC);
  const theme = useTheme();

  const isLowTime = timeLeft < lowTimeThreshold;

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
