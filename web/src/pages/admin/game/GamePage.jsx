import StopGameButton from "./StopGameButton";
import EmergencyMeeting from "../../../components/meeting/EmergencyMeeting";
import ProgressBar from "../../../components/ProgressBar";
import GameTimer from "../../../components/Timer";
import PlayerTab from "./players/PlayerTab";
import PendingTaskList from "./tasks/PendingTaskList";
import SabotageInfo from "./sabotage/SabotageInfo";
import { Box, Divider, Typography } from "@mui/material";

export default function GamePage({ gameState }) {
  return (
    <>
      <h1>Admin Page</h1>
      <GameTimer endTimeUTC={gameState.endOfGameUTC} />
      {gameState.emergency_meeting && (
        <EmergencyMeeting gameState={gameState} isAdmin={true} />
      )}
      <ProgressBar />
      <Divider sx={{ my: 2 }} />
      <SabotageInfo gameState={gameState} />
      <Divider sx={{ my: 2 }} />
      <PendingTaskList />
      <Divider sx={{ my: 2 }} />
      <PlayerTab gameState={gameState} />
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: "rgba(231, 76, 60, 0.1)",
          border: "1px solid rgba(231, 76, 60, 0.3)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#e74c3c" }}>
          Danger Zone
        </Typography>
        <StopGameButton />
      </Box>
    </>
  );
}
