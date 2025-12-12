import { Box, Typography, Card, Stack, Fade, Zoom } from "@mui/material";
import { CheckCircle, EmojiEvents } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function CrewmateWin({ crewmates }) {
  const theme = useTheme();

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${theme.palette.success.dark} 0%, ${theme.palette.success.light} 100%)`,
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
              <EmojiEvents
                sx={{
                  fontSize: 120,
                  color: theme.palette.success.main,
                  animation: "bounce 1s ease-in-out",
                  "@keyframes bounce": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                  },
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.success.dark,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                SIEG!
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Die Crewmates haben gewonnen!
              </Typography>

              <Box sx={{ width: "100%", mt: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: theme.palette.success.dark }}
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
                          backgroundColor:
                            theme.palette.success.lighter ??
                            "rgba(76, 175, 80, 0.1)",
                          borderRadius: 2,
                          borderLeft: `4px solid ${theme.palette.success.main}`,
                        }}
                      >
                        <CheckCircle
                          sx={{ color: theme.palette.success.main }}
                        />
                        <Typography
                          variant="body1"
                          fontWeight="medium"
                          sx={{ color: theme.palette.success.dark }}
                        >
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
