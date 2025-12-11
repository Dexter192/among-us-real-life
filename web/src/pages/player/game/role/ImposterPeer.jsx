import { Box, Stack, Typography } from "@mui/material";

export default function ImposterPeer({ imposter }) {
  if (!imposter) return null;

  const statusHint = imposter.isAlive === false ? "(Tod)" : "(Lebendig)";

  let character = `url(/images/characters/char${
    imposter.characterId || 0
  }.png)`;

  if (imposter.isAlive === false) {
    character = `url(/images/characters/ghost.png)`;
  }

  return (
    <Box
      sx={{
        width: "100%",
        p: 1,
        borderRadius: 1,
        bgcolor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {imposter.characterId !== undefined && (
          <Box
            sx={{
              backgroundImage: `${character}`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: 50,
              minHeight: 50,
            }}
          />
        )}

        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {imposter.name} {statusHint}
        </Typography>
      </Stack>
    </Box>
  );
}
