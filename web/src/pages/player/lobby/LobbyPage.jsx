import { Box, Typography, Container, Divider } from "@mui/material";
import RulesCard from "../components/RulesCard";
import PlayerInfo from "./PlayerInfo";

export default function LobbyPage({ gameState }) {
  return (
    <Box>
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
            <Box
              component="img"
              src="/images/LobbyBanner.jpg"
              alt="Among Us"
              sx={{
                maxWidth: "100%",
                height: "auto",
                maxHeight: "300px",
                mb: 3,
                borderRadius: 2,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
              }}
            />
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
