import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  useTheme,
} from "@mui/material";

export default function RulesCard() {
  const theme = useTheme();

  const crewmateRules = [
    "Erledige deine zugewiesenen Aufgaben",
    "Stimmt in Meetings ab, um Impostor aus dem Spiel zu wählen.",
    "Repariert Sabotagen schnell, um das Spiel nicht zu verlieren.",
    "Wenn du stirbst, kannst du weiterhin Aufgaben erledigen, aber nicht mehr sprechen oder abstimmen.",
    "Melde gefundene Leichen sofort.",
  ];

  const impostorRules = [
    "Eliminiere Crewmates heimlich, ohne entdeckt zu werden.",
    "Erfülle Aufgaben um Sabotagen auszulösen.",
    "Verhalte dich unauffällig um nicht entdeckt zu werden.",
    "Wenn du entlarvt wirst, bist du aus dem Spiel.",
  ];

  const RuleList = ({ rules, color }) => (
    <Stack spacing={1}>
      {rules.map((rule, idx) => (
        <Box
          key={idx}
          sx={{
            p: 1.5,
            backgroundColor:
              color === "info"
                ? theme.palette.info.lighter ?? "rgba(13, 110, 253, 0.08)"
                : theme.palette.warning.lighter ?? "rgba(255, 193, 7, 0.08)",
            borderLeft: `4px solid ${
              color === "info"
                ? theme.palette.info.main
                : theme.palette.warning.main
            }`,
            borderRadius: 1,
          }}
        >
          <Typography sx={{ fontSize: "0.95rem", lineHeight: 1.6, m: 0 }}>
            {rule}
          </Typography>
        </Box>
      ))}
    </Stack>
  );

  return (
    <Stack spacing={2}>
      <Card sx={{ backgroundColor: theme.palette.info.light, boxShadow: 2 }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            color="info.dark"
            sx={{ fontWeight: 700 }}
          >
            Regeln für Crewmates
          </Typography>
          <RuleList rules={crewmateRules} color="info" />
        </CardContent>
      </Card>
      <Card sx={{ backgroundColor: theme.palette.info.light, boxShadow: 2 }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            color="info.dark"
            sx={{ fontWeight: 700 }}
          >
            Regeln für Impostor
          </Typography>
          <RuleList rules={impostorRules} color="info" />
        </CardContent>
      </Card>
    </Stack>
  );
}
