import { useState, useEffect } from "react";
import { Box, Typography, Stack, Container, Divider } from "@mui/material";
import RulesCard from "../components/RulesCard";
import PlayerInfo from "./PlayerInfo";

export default function LobbyPage({ gameState }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url(/images/LobbyBanner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2, py: 4 }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
              color: "white",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 1,
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
                letterSpacing: 2,
              }}
            >
              AMONG US
            </Typography>
            <Divider sx={{ mb: 4 }} />

            {/* Player Info */}
            <PlayerInfo gameState={gameState} />

            <Typography
              variant="body1"
              sx={{
                mt: 2,
                color: "rgba(255, 255, 255, 0.9)",
                fontStyle: "italic",
              }}
            >
              Warten auf Spielstart...
            </Typography>
          </Box>

          {/* Rules Section */}
          <Box>
            <RulesCard />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
