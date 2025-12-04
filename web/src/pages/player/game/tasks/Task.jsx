import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function Task({ task }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: theme.palette.info.light,
        boxShadow: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <AssignmentIcon sx={{ color: theme.palette.info.dark }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              flexGrow: 1,
              color: theme.palette.info.dark,
            }}
          >
            {task.name}
          </Typography>
          <Chip
            label="Offen"
            size="small"
            sx={{
              backgroundColor: theme.palette.info.main,
              color: "white",
              fontWeight: 600,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <LocationOnIcon
            sx={{ color: theme.palette.info.main, fontSize: 20 }}
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
