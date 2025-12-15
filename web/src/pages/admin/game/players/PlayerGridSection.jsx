import { Box, Grid, Typography } from "@mui/material";
import PlayerOverview from "./PlayerOverview";

export default function PlayerGridSection({
  title,
  players,
  roleFilter,
  onSelect,
}) {
  if (!players || players.length === 0) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        {title} ({players.length})
      </Typography>
      <Grid container spacing={2}>
        {players.map(([id, player]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
            <PlayerOverview
              id={id}
              player={player}
              onSelect={onSelect}
              isFiltered={!roleFilter}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
