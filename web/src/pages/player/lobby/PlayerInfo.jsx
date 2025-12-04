import { Box, Typography, Stack } from "@mui/material";
import { useGetPlayerInfo } from "../../../hooks/useGetPlayerInfo";
import { useEffect, useState } from "react";

export default function PlayerInfo({ gameState }) {
  const { playerInfo, refetchPlayerInfo } = useGetPlayerInfo();
  const [playerCount, setPlayerCount] = useState(null);

  useEffect(() => {
    setPlayerCount(gameState.player_count);
  }, [gameState]);

  return (
    <Stack
      direction="row"
      spacing={3}
      justifyContent="center"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        p: 2,
        borderRadius: 2,
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          Dein Name
        </Typography>
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          {playerInfo ? playerInfo.name : "---"}
        </Typography>
      </Box>
      <Box sx={{ borderLeft: "1px solid rgba(255, 255, 255, 0.3)" }} />
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          Spieler in der Lobby
        </Typography>
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          {playerCount ?? 0}
        </Typography>
      </Box>
    </Stack>
  );
}
