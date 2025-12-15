import { useGetPlayers } from "../../../../hooks/useGetPlayers";
import { useGetPlayerTasks } from "../../../../hooks/useGetPlayerTasks";
import PlayerOverview from "./PlayerOverview";
import PlayerTask from "./PlayerTask";
import PlayerDetails from "./PlayerDetails";
import PlayerStatsCards from "./PlayerStatsCards";
import PlayerGridSection from "./PlayerGridSection";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useState, useMemo } from "react";
import { useChangePlayerVitals } from "../../../../hooks/useChangePlayerVitals";

export default function PlayerTab() {
  const { players } = useGetPlayers();
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null); // "IMPOSTER", "CREWMATE", or null
  const { tasks } = useGetPlayerTasks(selectedPlayerId);
  const { changePlayerVitals } = useChangePlayerVitals();

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
      ([, player]) => player.game_role === roleFilter
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

  const selectedPlayer = selectedPlayerId && players?.[selectedPlayerId];

  const handleSelectPlayer = (id) => {
    setSelectedPlayerId(id);
  };

  const handleClosePlayerDialog = () => {
    setSelectedPlayerId(null);
  };

  const handleTogglePlayerStatus = () => {
    if (!selectedPlayerId || !selectedPlayer) return;
    changePlayerVitals(selectedPlayerId, !selectedPlayer.isAlive);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Stats Section */}
      <PlayerStatsCards
        stats={stats}
        roleFilter={roleFilter}
        onChangeRole={setRoleFilter}
      />

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
      <PlayerGridSection
        title="Living"
        players={livingPlayers}
        roleFilter={roleFilter}
        onSelect={handleSelectPlayer}
      />

      <PlayerGridSection
        title="Dead"
        players={deadPlayers}
        roleFilter={roleFilter}
        onSelect={handleSelectPlayer}
      />

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
          <PlayerDetails
            player={selectedPlayer}
            playerId={selectedPlayerId}
            tasks={tasks}
            handleClosePlayerDialog={handleClosePlayerDialog}
            onToggleAlive={handleTogglePlayerStatus}
            renderTasks={({ playerId, tasks }) => (
              <PlayerTask playerId={playerId} tasks={tasks} />
            )}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
