import { Box, Typography, Card, Stack, Fade, Zoom } from "@mui/material";
import { Cancel, SentimentVeryDissatisfied } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function CrewmateLose({ imposters }) {
  const theme = useTheme();

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${theme.palette.error.dark} 0%, ${theme.palette.error.light} 100%)`,
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
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <Stack spacing={3} alignItems="center">
              <SentimentVeryDissatisfied
                sx={{
                  fontSize: 120,
                  color: theme.palette.error.main,
                  animation: "shake 0.5s ease-in-out",
                  "@keyframes shake": {
                    "0%, 100%": { transform: "rotate(0deg)" },
                    "25%": { transform: "rotate(-10deg)" },
                    "75%": { transform: "rotate(10deg)" },
                  },
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.error.dark,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                NIEDERLAGE
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Die Imposters haben gewonnen!
              </Typography>

              <Box sx={{ width: "100%", mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.error.dark }}>
                  Die Imposters waren:
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
                          backgroundColor: theme.palette.error.lighter ?? "rgba(244, 67, 54, 0.1)",
                          borderRadius: 2,
                          borderLeft: `4px solid ${theme.palette.error.main}`,
                        }}
                      >
                        <Cancel sx={{ color: theme.palette.error.main }} />
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
