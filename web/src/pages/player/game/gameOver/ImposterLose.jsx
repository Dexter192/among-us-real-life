import { Box, Typography, Card, Stack, Fade, Zoom } from "@mui/material";
import { CheckCircle, SentimentVeryDissatisfied } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function ImposterLose({ crewmates }) {
  const theme = useTheme();

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)",
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
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <Stack spacing={3} alignItems="center">
              <SentimentVeryDissatisfied
                sx={{
                  fontSize: 120,
                  color: "#888",
                  animation: "fadeInOut 2s ease-in-out infinite",
                  "@keyframes fadeInOut": {
                    "0%, 100%": { opacity: 0.5 },
                    "50%": { opacity: 1 },
                  },
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#888",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                NIEDERLAGE
              </Typography>
              <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Die Crewmates haben gewonnen!
              </Typography>

              <Box sx={{ width: "100%", mt: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: theme.palette.success.light }}
                >
                  Siegreiche Crewmates:
                </Typography>
                <Stack spacing={1}>
                  {crewmates?.map((player, idx) => (
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
                          backgroundColor: "rgba(76, 175, 80, 0.2)",
                          borderRadius: 2,
                          borderLeft: `4px solid ${theme.palette.success.main}`,
                        }}
                      >
                        <CheckCircle
                          sx={{ color: theme.palette.success.main }}
                        />
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
