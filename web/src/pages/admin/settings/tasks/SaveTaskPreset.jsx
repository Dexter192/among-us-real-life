import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { memo, useState } from "react";
import { useSocketConnection } from "../../../../hooks/useSocketConnection";

function SaveTaskPreset({ selectedPreset, setSelectedPreset }) {
  const { socket } = useSocketConnection();

  const saveTaskPreset = () => {
    socket.emit("save_task_preset", { taskSetName: selectedPreset });
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      marginTop={2}
      marginBottom={2}
      alignItems="center"
    >
      <TextField
        label="Task Set Name"
        value={selectedPreset || ""}
        onChange={(e) => setSelectedPreset(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          if (!selectedPreset) return;
          saveTaskPreset(selectedPreset);
          setSelectedPreset(selectedPreset);
        }}
      >
        Save Preset
      </Button>
    </Stack>
  );
}

export default memo(SaveTaskPreset);
