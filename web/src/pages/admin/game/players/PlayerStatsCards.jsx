import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";

export default function PlayerStatsCards({ stats, roleFilter, onChangeRole }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Game Statistics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Card
            sx={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: roleFilter === null ? "2px solid white" : "none",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 2,
                border: "2px solid white",
              },
            }}
            onClick={() => onChangeRole(null)}
          >
            <CardActionArea>
              <CardContent>
                <Stack spacing={1} sx={{ textAlign: "center" }}>
                  <PersonIcon
                    sx={{
                      fontSize: 32,
                      color: theme.palette.primary.main,
                      mx: "auto",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Total Players
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    {stats.total}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: roleFilter === "CREWMATE" ? "2px solid white" : "none",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 2,
                border: "2px solid white",
              },
            }}
            onClick={() =>
              onChangeRole(roleFilter === "CREWMATE" ? null : "CREWMATE")
            }
          >
            <CardActionArea>
              <CardContent>
                <Stack spacing={1} sx={{ textAlign: "center" }}>
                  <PersonIcon
                    sx={{ fontSize: 32, color: "#27ae60", mx: "auto" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Crewmates
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#27ae60" }}
                  >
                    {stats.crewmates}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: roleFilter === "IMPOSTER" ? "2px solid white" : "none",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 2,
                border: "2px solid white",
              },
            }}
            onClick={() =>
              onChangeRole(roleFilter === "IMPOSTER" ? null : "IMPOSTER")
            }
          >
            <CardActionArea>
              <CardContent>
                <Stack spacing={1} sx={{ textAlign: "center" }}>
                  <SecurityIcon
                    sx={{ fontSize: 32, color: "#e74c3c", mx: "auto" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Impostors
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#e74c3c" }}
                  >
                    {stats.impostors}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
