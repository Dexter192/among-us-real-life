import { Card, Box, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export default function DeadBanner({ playerInfo, isMeeting }) {
  const isPlayerDead = playerInfo?.isAlive === false;

  return (
    <>
      {isPlayerDead && (
        <Card
          sx={{
            mb: 2,
            backgroundColor: "error.main",
            color: "white",
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              p: 3,
            }}
          >
            <CancelIcon sx={{ fontSize: 48 }} />
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Du bist tot!
            </Typography>
            <CancelIcon sx={{ fontSize: 48 }} />
          </Box>
          <Typography
            sx={{ fontWeight: 200, marginBottom: 2, textAlign: "center" }}
          >
            Als Geist darfst du nicht mehr mit lebenden Spielern sprechen
            {isMeeting ? "und nicht abstimmen." : "."}
            <br />
            {isMeeting
              ? "Warte bis das Treffen vorbei ist."
              : "Erledige deine Aufgaben um den Crewmates zum Sieg zu helfen!"}
          </Typography>
        </Card>
      )}
    </>
  );
}
