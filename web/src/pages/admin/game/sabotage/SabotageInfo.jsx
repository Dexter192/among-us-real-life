import { Card, Box, Typography, Stack, Button, useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDiffuseSabotage } from "../../../../hooks/useDiffuseSabotage";
import { useGetActiveSabotage } from "../../../../hooks/useGetActiveSabotage";
import { useCountdownTimer } from "../../../../hooks/useCountdownTimer";

export default function SabotageInfo({ gameState }) {
  const { sabotage } = useGetActiveSabotage(gameState.sabotage_triggered);
  const diffuseSabotage = useDiffuseSabotage();
  const theme = useTheme();
  const { timeLeft, formatTime } = useCountdownTimer(sabotage?.endTimeUTC);

  if (!gameState.sabotage_triggered || !sabotage) {
    return <div className="sabotage-info">No active sabotage.</div>;
  }

  const handleDiffuse = () => {
    diffuseSabotage.diffuseSabotage(sabotage.id);
  };
  const hasTimer = Boolean(sabotage.endTimeUTC);
  const isLowTime = timeLeft < 60000;
  return (
    <Card
      sx={{
        p: 2,
        backgroundColor: isLowTime
          ? theme.palette.error.light
          : theme.palette.info.light,
      }}
    >
      <Stack spacing={1.5}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Active Sabotage: {sabotage.name}
        </Typography>
        {hasTimer && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AccessTimeIcon
              sx={{
                color: isLowTime
                  ? theme.palette.error.dark
                  : theme.palette.info.dark,
              }}
            />
            <Typography
              variant="h5"
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
        )}
        <Button variant="contained" color="primary" onClick={handleDiffuse}>
          Diffuse Sabotage
        </Button>
      </Stack>
    </Card>
  );
}
