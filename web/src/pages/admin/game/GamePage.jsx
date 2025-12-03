import { Button } from "@mui/material";
import { useSocketConnection } from "../../../hooks/useSocketConnection";

export default function GamePage() {
  const { socket } = useSocketConnection();
  const stopGame = () => {
    if (socket) {
      socket.emit("stop_game");
    }
  };
  return (
    <>
      <h1>Game is running</h1>
      <Button
        variant="contained"
        color="secondary"
        id="stop-game"
        onClick={stopGame}
      >
        Stop Game
      </Button>
    </>
  );
  if (emergencyMeeting) {
    return (
      <div>
        <h1>Emergency Meeting</h1>
      </div>
    );
    /* {showEmergency && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={emergencyMeeting}
                  disabled={cooldownRemainingMs > 0}
                >
                  {cooldownRemainingMs > 0
                    ? `Emergency Cooldown (${Math.ceil(
                        cooldownRemainingMs / 1000
                      )}s)`
                    : "Emergency Meeting (Space)"}
                </Button>
              )}
              {showContinue && (
                <>
                  <Typography variant="h5" color="error">
                    MEETING TIME
                  </Typography>
                  <Button variant="contained" onClick={continueGame}>
                    Continue
                  </Button>
                </>
              )} */
  }

  return <h1>Client Running</h1>;
}
