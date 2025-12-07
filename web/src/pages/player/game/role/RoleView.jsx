import { useState } from "react";
import { Button, Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useGetPlayerInfo } from "../../../../hooks/useGetPlayerInfo";

export default function RoleView() {
  const { playerInfo } = useGetPlayerInfo();
  const role = playerInfo?.game_role || "UNKNOWN";
  const [showRole, setShowRole] = useState(false);

  return (
    <>
      <Box sx={{ position: "relative", width: "100%" }}>
        <Button
          onClick={() => setShowRole(true)}
          sx={{
            backgroundImage: "url(/images/role.png)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            p: 10,
            position: "relative",
          }}
        />
      </Box>
      {showRole && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 360,
              bgcolor: "rgba(15, 16, 24, 0.92)",
              borderRadius: 2,
              boxShadow: 4,
              border: "2px solid rgba(255,255,255,0.2)",
              color: "white",
              p: 3,
              cursor: "default",
            }}
            onClick={() => setShowRole(false)}
          >
            <IconButton
              size="small"
              sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
              onClick={() => setShowRole(false)}
              aria-label="close role overlay"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  backgroundImage: `url(/images/characters/char${
                    playerInfo?.characterId || 0
                  }.png)`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  minHeight: 140,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {role}
              </Typography>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
}
