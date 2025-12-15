import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
  Fade,
  IconButton,
  Collapse,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useCompleteTask } from "../../../../hooks/useCompleteTask";
import { useState, useEffect } from "react";

export default function Task({ id, sabotages, task, isImposter = false }) {
  const theme = useTheme();
  const { completeTask } = useCompleteTask();
  const [showLabel, setShowLabel] = useState(true);
  const [labelText, setLabelText] = useState(() => {
    if (task.completed) return "Abgeschlossen";
    if (task.pending) return "Ausstehend";
    else return "Offen";
  });
  const [showSabotageMore, setShowSabotageMore] = useState(false);

  useEffect(() => {
    const oldLabel = labelText;
    const newLabel = task.completed
      ? "Abgeschlossen"
      : task.pending
      ? "Ausstehend"
      : "Offen";

    if (oldLabel !== newLabel) {
      // Fade out
      setShowLabel(false);
      // Wait for fade out, then change text and fade in
      setTimeout(() => {
        setLabelText(newLabel);
        setShowLabel(true);
      }, 400);
    }
  }, [task.completed, task.pending, labelText]);

  const getColor = () => {
    if (task.completed) return "success";
    if (task.pending) return "warning";
    else return "info";
  };

  let sabotageData = null;
  if (isImposter) {
    sabotageData = sabotages ? sabotages[task.linked_sabotage] : null;
  }
  console.log("Sabotage Data:", sabotageData);
  const taskDescription =
    task.description || "Keine Beschreibung für diese Aufgabe vorhanden.";

  const colorPalette = getColor();

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: theme.palette[colorPalette].light,
        boxShadow: 2,
        transition:
          "transform 0.2s, box-shadow 0.2s, background-color 0.8s ease-in-out",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <AssignmentIcon
              sx={{
                color: theme.palette[colorPalette].dark,
                transition: "color 0.8s ease-in-out",
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette[colorPalette].dark,
              transition: "color 0.8s ease-in-out",
              textAlign: "center",
            }}
          >
            {task.name}
          </Typography>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Chip
              label={
                <Fade in={showLabel} timeout={400}>
                  <span>{labelText}</span>
                </Fade>
              }
              size="small"
              sx={{
                backgroundColor: theme.palette[colorPalette].main,
                color: "white",
                fontWeight: 600,
                transition: "background-color 0.8s ease-in-out",
              }}
            />
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ flex: 1 }}
          >
            <LocationOnIcon
              sx={{
                color: theme.palette[colorPalette].main,
                fontSize: 20,
                transition: "color 0.8s ease-in-out",
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              {task.location}
            </Typography>
          </Stack>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color={colorPalette}
              onClick={() => completeTask(id)}
              disabled={task.completed || task.pending}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                px: 3,
                py: 1,
              }}
            >
              {task.completed
                ? "Abgeschlossen"
                : task.pending
                ? "Wartet..."
                : "Abschließen"}
            </Button>
          </Box>
        </Stack>

        {/* Always-expanded details section */}
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" sx={{ mb: 1 }}>
          {taskDescription}
        </Typography>

        {/* Bottom-right small arrow to toggle more sabotage info */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            size="small"
            onClick={() => setShowSabotageMore((prev) => !prev)}
            sx={{
              color: theme.palette[colorPalette].dark,
              backgroundColor: theme.palette[colorPalette].light,
              border: `1px solid ${theme.palette[colorPalette].main}`,
              borderRadius: 2,
              padding: 0.5,
              "&:hover": {
                backgroundColor: theme.palette[colorPalette].main,
                color: theme.palette.common.white,
              },
            }}
          >
            {showSabotageMore ? (
              <ExpandLessIcon fontSize="small" />
            ) : (
              <ExpandMoreIcon fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Collapse in={showSabotageMore} timeout="auto" unmountOnExit>
          <Box
            sx={{
              mt: 1,
              p: 1.5,
              borderRadius: 2,
              border: `2px solid ${theme.palette.divider}`,
              backgroundColor: `rgba(0, 0, 0, 0.2)`,
            }}
          >
            {isImposter && sabotageData?.name && (
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Sabotage: {sabotageData?.name}
              </Typography>
            )}
            <Typography variant="body2" sx={{ mt: 1 }}>
              {isImposter && sabotageData?.effect
                ? sabotageData.effect
                : "Keine weiteren Infos für diese Aufgabe."}
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}
