import { Button, Stack } from "@mui/material";
import { useSocketConnection } from "../../../../hooks/useSocketConnection";
import { useEffect } from "react";

export default function LoadTaskPreset({
  tasks,
  selectedPreset,
  setSelectedPreset,
}) {
  const { socket } = useSocketConnection();

  const presets = tasks
    ? Object.keys(tasks).filter((key) => key !== "activeTaskList")
    : [];

  if (!tasks) {
    return null;
  }

  const loadPreset = (presetName) => {
    setSelectedPreset(presetName);
    socket.emit("load_task_preset", { taskSetName: presetName });
  };

  const deletePreset = () => {
    socket.emit("delete_task_preset", { taskSetName: selectedPreset });
    setSelectedPreset("");
  };

  console.log("Available presets:", presets);
  return (
    <Stack direction="row" spacing={1} marginTop={2}>
      <select
        style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
        value={selectedPreset}
        onChange={(e) => loadPreset(e.target.value)}
      >
        {presets.map((preset) => (
          <option key={preset} value={preset}>
            {preset}
          </option>
        ))}
      </select>
      <Button variant="contained" onClick={deletePreset}>
        Delete
      </Button>
    </Stack>
  );
}
