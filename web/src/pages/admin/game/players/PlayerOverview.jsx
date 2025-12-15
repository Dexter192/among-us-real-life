import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Stack,
} from "@mui/material";

export default function PlayerOverview({ id, player, onSelect, isFiltered }) {
  const isImpostor = player.game_role === "IMPOSTER";
  const roleColor = isFiltered ? "white" : isImpostor ? "#e74c3c" : "#27ae60";

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: `2px solid ${roleColor}`,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 16px rgba(0, 0, 0, 0.15)`,
        },
        opacity: player.isAlive ? 1 : 0.6,
      }}
      onClick={() => onSelect(id)}
    >
      <CardActionArea>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {player.name}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
