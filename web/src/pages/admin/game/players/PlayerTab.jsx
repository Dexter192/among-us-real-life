import { useGetPlayers } from "../../../../hooks/useGetPlayers";
import { useGetPlayerTasks } from "../../../../hooks/useGetPlayerTasks";
import Player from "./Player";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  useTheme,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useState, useMemo } from "react";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";

export default function PlayerTab() {
  const { players } = useGetPlayers();
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null); // "IMPOSTER", "CREWMATE", or null
  const { tasks } = useGetPlayerTasks(selectedPlayerId);
  const theme = useTheme();

  const stats = useMemo(() => {
    if (!players) return { crewmates: 0, impostors: 0, total: 0 };

    let crewmates = 0;
    let impostors = 0;

    Object.values(players).forEach((player) => {
      if (player.game_role === "IMPOSTER") {
        impostors++;
      } else if (player.game_role === "CREWMATE") {
        crewmates++;
      }
    });

    return {
      crewmates,
      impostors,
      total: crewmates + impostors,
    };
  }, [players]);

  const filteredPlayers = useMemo(() => {
    if (!players) return [];
    if (!roleFilter) return Object.entries(players);
    return Object.entries(players).filter(
      ([_, player]) => player.game_role === roleFilter
    );
  }, [players, roleFilter]);

  const livingPlayers = useMemo(
    () => filteredPlayers.filter(([, player]) => player.isAlive !== false),
    [filteredPlayers]
  );
  const deadPlayers = useMemo(
    () => filteredPlayers.filter(([, player]) => player.isAlive === false),
    [filteredPlayers]
  );
  const livingCount = livingPlayers.length;
  const deadCount = deadPlayers.length;

  const selectedPlayer = selectedPlayerId && players?.[selectedPlayerId];

  const handleSelectPlayer = (id) => {
    setSelectedPlayerId(id);
  };

  const handleClosePlayerDialog = () => {
    setSelectedPlayerId(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Stats Section */}
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
              onClick={() => setRoleFilter(null)}
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
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
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
                setRoleFilter(roleFilter === "CREWMATE" ? null : "CREWMATE")
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
                setRoleFilter(roleFilter === "IMPOSTER" ? null : "IMPOSTER")
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

      {/* Filter Info */}
      {roleFilter && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Filtering by:{" "}
            <strong>
              {roleFilter === "IMPOSTER" ? "Impostors" : "Crewmates"}
            </strong>
          </Typography>
        </Box>
      )}

      {/* Players Grid */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        {roleFilter
          ? `${roleFilter === "IMPOSTER" ? "Impostors" : "Crewmates"} (${
              filteredPlayers.length
            })`
          : `Players (${Object.keys(players || {}).length})`}
      </Typography>
      {livingPlayers.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Living ({livingCount})
          </Typography>
          <Grid container spacing={2}>
            {livingPlayers.map(([id, player]) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <Player
                  id={id}
                  player={player}
                  onSelect={handleSelectPlayer}
                  isFiltered={!roleFilter}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {deadPlayers.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Dead ({deadCount})
          </Typography>
          <Grid container spacing={2}>
            {deadPlayers.map(([id, player]) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <Player
                  id={id}
                  player={player}
                  onSelect={handleSelectPlayer}
                  isFiltered={!roleFilter}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {livingPlayers.length === 0 && deadPlayers.length === 0 && (
        <Typography color="text.secondary">
          {roleFilter ? "No players with this role." : "No players available."}
        </Typography>
      )}

      {/* Player Details Dialog */}
      <Dialog
        open={!!selectedPlayerId}
        onClose={handleClosePlayerDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {selectedPlayer?.name}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {/* Role Chip */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Role
              </Typography>
              <Chip
                label={
                  selectedPlayer?.game_role === "IMPOSTER"
                    ? "Impostor"
                    : "Crewmate"
                }
                sx={{
                  backgroundColor:
                    selectedPlayer?.game_role === "IMPOSTER"
                      ? "#e74c3c"
                      : "#27ae60",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  height: "auto",
                  padding: "8px 12px",
                }}
              />
            </Box>

            {/* Status Chip */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Status
              </Typography>
              <Chip
                label={selectedPlayer?.isAlive ? "Alive" : "Dead"}
                variant={selectedPlayer?.isAlive ? "filled" : "outlined"}
                sx={{
                  backgroundColor: selectedPlayer?.isAlive
                    ? "#27ae60"
                    : "transparent",
                  color: selectedPlayer?.isAlive ? "white" : "#e74c3c",
                  borderColor: selectedPlayer?.isAlive
                    ? "transparent"
                    : "#e74c3c",
                  fontWeight: 600,
                  fontSize: "1rem",
                  height: "auto",
                  padding: "8px 12px",
                }}
              />
            </Box>

            {/* Tasks */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Tasks
              </Typography>
              {tasks && Object.keys(tasks).length > 0 ? (
                <List>
                  {Object.entries(tasks).map(([taskId, task]) => (
                    <ListItem
                      key={taskId}
                      divider
                      sx={{ flexDirection: "column", alignItems: "flex-start" }}
                    >
                      <ListItemText
                        primary={task.name}
                        secondary={
                          <Chip
                            label={task.completed ? "Completed" : "Pending"}
                            size="small"
                            sx={{
                              backgroundColor: task.completed
                                ? "#27ae60"
                                : "#f39c12",
                              color: "white",
                              mt: 1,
                            }}
                          />
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary" variant="body2">
                  No tasks assigned.
                </Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
