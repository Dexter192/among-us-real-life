import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useGetPlayers } from "../../../../hooks/useGetPlayers";
import { Cancel, DeleteForever } from "@mui/icons-material";
import { useKickPlayer } from "../../../../hooks/useKickPlayer";
import { useState, useMemo } from "react";

export default function PlayerInfo() {
  const { players } = useGetPlayers();
  const { kickPlayer, kickAll } = useKickPlayer();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const playerEntries = useMemo(
    () => (players ? Object.entries(players) : []),
    [players]
  );

  const handleConfirm = () => {
    kickAll();
    setConfirmOpen(false);
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
      <Card sx={{ width: "100%", maxWidth: 420, p: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center" sx={{ fontWeight: 700 }}>
            Players ({playerEntries.length})
          </Typography>
        </CardContent>

        <Divider />

        <CardContent sx={{ pt: 0 }}>
          {playerEntries.length > 0 ? (
            <List dense>
              {playerEntries.map(([id, player], index) => (
                <ListItem
                  key={id}
                  secondaryAction={
                    <Tooltip title="Kick player">
                      <IconButton
                        edge="end"
                        aria-label={`kick-${player.name}`}
                        onClick={() => kickPlayer(id)}
                      >
                        <Cancel color="error" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{ fontSize: 14 }}
                    primary={`${index + 1}. ${player.name}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">Waiting for players...</Typography>
          )}
        </CardContent>

        <Divider />

        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteForever />}
              onClick={() => {
                setConfirmOpen(true);
              }}
              fullWidth
            >
              Kick everyone
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Confirm dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm action</DialogTitle>
        <DialogContent>
          <Typography>This will disconnect all players. Continue?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
