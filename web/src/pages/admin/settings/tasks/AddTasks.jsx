import { Button, Stack, TextField } from "@mui/material";
import { useState, memo } from "react";
import { useSocketConnection } from "../../../../hooks/useSocketConnection";

function AddTask() {
  const { socket } = useSocketConnection();
  const [taskName, setTaskName] = useState("");
  const [taskLocation, setTaskLocation] = useState("");

  const addTask = (name, location) => {
    console.log("Add task with name:", name, "and location:", location);
    if (socket) {
      socket.emit("add_task", { name, location });
    }
  };

  return (
    <Stack direction="row" spacing={1} marginTop={2} marginBottom={2}>
      <TextField
        label="Task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Location"
        value={taskLocation}
        onChange={(e) => setTaskLocation(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={() => {
          const name = taskName.trim();
          const loc = taskLocation.trim();
          if (!name) return;
          addTask(name, loc);
          setTaskName("");
          setTaskLocation("");
        }}
      >
        Add
      </Button>
    </Stack>
  );
}

export default memo(AddTask);
