import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
  Fade,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useCompleteTask } from "../../../../hooks/useCompleteTask";
import { useState, useEffect } from "react";

export default function Task({ id, task }) {
  const theme = useTheme();
  const { completeTask } = useCompleteTask();
  const [showLabel, setShowLabel] = useState(true);
  const [labelText, setLabelText] = useState(() => {
    if (task.completed) return "Abgeschlossen";
    if (task.pending) return "Ausstehend";
    else return "Offen";
  });

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
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
      onClick={() => completeTask(id)}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <AssignmentIcon
            sx={{
              color: theme.palette[colorPalette].dark,
              transition: "color 0.8s ease-in-out",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              flexGrow: 1,
              color: theme.palette[colorPalette].dark,
              transition: "color 0.8s ease-in-out",
            }}
          >
            {task.name}
          </Typography>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
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
        </Box>
      </CardContent>
    </Card>
  );
}
