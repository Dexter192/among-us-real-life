import { Box, Typography, Card, Stack, Fade, Zoom } from "@mui/material";
import { Dangerous, EmojiEvents } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function ImposterWin({ imposters }) {
  const theme = useTheme();

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8B0000 0%, #DC143C 100%)",
          p: 3,
        }}
      >
        <Zoom in timeout={1000} style={{ transitionDelay: "300ms" }}>
          <Card
            sx={{
              maxWidth: 600,
              width: "100%",
              p: 4,
              textAlign: "center",
              backgroundColor: "rgba(20, 20, 20, 0.95)",
              color: "white",
              boxShadow: "0 20px 60px rgba(255,0,0,0.5)",
            }}
          >
            <Stack spacing={3} alignItems="center">
              <EmojiEvents
                sx={{
                  fontSize: 120,
                  color: "#DC143C",
                  animation: "pulse 1s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.1)" },
                  },
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#DC143C",
                  textShadow: "0 0 20px rgba(220, 20, 60, 0.5)",
                }}
              >
                SIEG!
              </Typography>
              <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.9)" }}>
                Die Imposters haben gewonnen!
              </Typography>

              <Box sx={{ width: "100%", mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, color: "#DC143C" }}>
                  Siegreiche Imposters:
                </Typography>
                <Stack spacing={1}>
                  {imposters?.map((player, idx) => (
                    <Fade
                      in
                      timeout={500}
                      style={{ transitionDelay: `${400 + idx * 100}ms` }}
                      key={player.id}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          p: 2,
                          backgroundColor: "rgba(220, 20, 60, 0.2)",
                          borderRadius: 2,
                          borderLeft: "4px solid #DC143C",
                        }}
                      >
                        <Dangerous sx={{ color: "#DC143C" }} />
                        <Typography variant="body1" fontWeight="medium">
                          {player.name}
                        </Typography>
                      </Box>
                    </Fade>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Zoom>
      </Box>
    </Fade>
  );
}
