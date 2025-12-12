import { Card, Box, Typography, Stack, useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useGetActiveSabotage } from "../../../../hooks/useGetActiveSabotage";
import { useCountdownTimer } from "../../../../hooks/useCountdownTimer";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

export default function SabotageBanner({ gameState }) {
  const { sabotage } = useGetActiveSabotage(gameState.sabotage_triggered);
  const [dismissed, setDismissed] = useState(false);
  const [storedDismissableSabotage, setStoredDismissableSabotage] =
    useState(null);
  const theme = useTheme();

  const sabotageId = sabotage?.sabotage_id ?? sabotage?.id;
  const storedSabotageId =
    storedDismissableSabotage?.sabotage_id ?? storedDismissableSabotage?.id;

  const activeSabotage = storedDismissableSabotage ?? sabotage;
  const activeSabotageId =
    activeSabotage?.sabotage_id ?? activeSabotage?.id ?? "";

  const timerTarget =
    activeSabotage?.sabotageEndUTC ??
    activeSabotage?.endTimeUTC ??
    gameState?.sabotageEndUTC;
  const { timeLeft, formatTime } = useCountdownTimer(timerTarget);

  useEffect(() => {
    if (!sabotage) {
      return;
    }

    const isNewSabotage = storedSabotageId !== sabotageId;
    if (isNewSabotage) {
      setDismissed(false);
    }

    if (sabotage.dismissByPlayer) {
      if (isNewSabotage) {
        setStoredDismissableSabotage(sabotage);
      }
    } else {
      setStoredDismissableSabotage(null);
    }
  }, [sabotage, sabotageId, storedSabotageId]);

  if (!activeSabotage) {
    return null;
  }

  const hasTimer = Boolean(activeSabotage?.sabotageEndUTC);
  const isLowTime = timeLeft < 60000;
  const canDismiss = Boolean(activeSabotage?.dismissByPlayer);

  const handleDismiss = () => {
    setDismissed(true);
  };

  if (dismissed && canDismiss) {
    return null;
  }

  return (
    <Card
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: isLowTime
          ? theme.palette.error.light
          : theme.palette.info.light,
      }}
    >
      <Stack spacing={1}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            Sabotage Active: {activeSabotage?.name}
          </Typography>
          {canDismiss && (
            <IconButton
              aria-label="dismiss sabotage"
              onClick={handleDismiss}
              size="small"
              sx={{ color: theme.palette.error.dark }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {activeSabotageId}
        </Typography>
        {hasTimer && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "flex-start",
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
      </Stack>
    </Card>
  );
}
