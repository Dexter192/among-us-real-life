import StopGameButton from "./StopGameButton";
import EmergencyMeeting from "../../../components/meeting/EmergencyMeeting";
import { useChangePlayerVitals } from "../../../hooks/useChangePlayerVitals";

export default function GamePage({ gameState }) {
  if (gameState.emergency_meeting) {
    return (
      <>
        <EmergencyMeeting gameState={gameState} isAdmin={true} />
        <StopGameButton />
      </>
    );
  }

  return (
    <>
      <h1>Game is running</h1>
      <StopGameButton />
    </>
  );
}
