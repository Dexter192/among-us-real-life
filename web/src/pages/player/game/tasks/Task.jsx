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
  const [labelText, setLabelText] = useState(
    task.completed ? "Abgeschlossen" : "Offen"
  );

  useEffect(() => {
    if (task.completed && labelText === "Offen") {
      // Fade out
      setShowLabel(false);
      // Wait for fade out, then change text and fade in
      setTimeout(() => {
        setLabelText("Abgeschlossen");
        setShowLabel(true);
      }, 400);
    }
  }, [task.completed, labelText]);

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: task.completed
          ? theme.palette.success.light
          : theme.palette.info.light,
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
              color: task.completed
                ? theme.palette.success.dark
                : theme.palette.info.dark,
              transition: "color 0.8s ease-in-out",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              flexGrow: 1,
              color: task.completed
                ? theme.palette.success.dark
                : theme.palette.info.dark,
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
              backgroundColor: task.completed
                ? theme.palette.success.main
                : theme.palette.info.main,
              color: "white",
              fontWeight: 600,
              transition: "background-color 0.8s ease-in-out",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <LocationOnIcon
            sx={{
              color: task.completed
                ? theme.palette.success.main
                : theme.palette.info.main,
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
