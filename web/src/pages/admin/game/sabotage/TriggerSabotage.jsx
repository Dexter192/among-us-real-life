import {
  Box,
  Button,
  Card,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import TimerIcon from "@mui/icons-material/Timer";
import { useSabotageConfig } from "../../../../hooks/useSabotageConfig";
import { useTriggerSabotage } from "../../../../hooks/useTriggerSabotage";

/**
 * Lets an admin manually trigger any configured sabotage during a game.
 * Disabled while another sabotage is already active.
 */
export default function TriggerSabotage({ gameState }) {
  const { data, activeKey } = useSabotageConfig();
  const { triggerSabotage } = useTriggerSabotage();

  const sabotageActive = Boolean(gameState.sabotage_triggered);

  const sabotageList = Object.entries(data?.[activeKey] ?? {}).map(
    ([id, s]) => ({ id, ...s })
  );

  if (sabotageList.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No sabotages configured.
      </Typography>
    );
  }

  return (
    <Stack spacing={1}>
      {sabotageActive && (
        <Typography variant="caption" color="warning.main">
          A sabotage is already active — diffuse it before triggering another.
        </Typography>
      )}
      {sabotageList.map((sabotage) => (
        <Card
          key={sabotage.id}
          variant="outlined"
          sx={{
            p: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            opacity: sabotageActive ? 0.6 : 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" fontWeight={600}>
              {sabotage.name}
            </Typography>
            {sabotage.timerSeconds && (
              <Tooltip title={`Auto-diffuses after ${sabotage.timerSeconds}s`}>
                <Chip
                  icon={<TimerIcon fontSize="small" />}
                  label={`${sabotage.timerSeconds}s`}
                  size="small"
                  color="info"
                  variant="outlined"
                />
              </Tooltip>
            )}
            {sabotage.dismissByPlayer && (
              <Chip
                label="Player dismissible"
                size="small"
                color="default"
                variant="outlined"
              />
            )}
          </Box>

          <Button
            variant="contained"
            color="warning"
            size="small"
            disabled={sabotageActive}
            startIcon={<FlashOnIcon />}
            onClick={() => triggerSabotage(sabotage.id)}
          >
            Trigger
          </Button>
        </Card>
      ))}
    </Stack>
  );
}
