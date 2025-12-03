import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import TaskList from "./TaskList";
import AddTask from "./AddTasks";
import SaveTasksPreset from "./SaveTaskPreset";
import LoadTaskPreset from "./LoadTaskPreset";
import { useGetAllTasks } from "../../../../hooks/useGetAllTasks";
import { useState } from "react";

export default function TaskTab() {
  const { tasks } = useGetAllTasks();
  const [selectedPreset, setSelectedPreset] = useState("");

  return (
    <Stack spacing={1} alignItems="center" sx={{ py: 3 }}>
      <Typography variant="overline">Tasks ({selectedPreset})</Typography>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent>
          <TaskList tasks={tasks} />
          <AddTask />
          <Divider sx={{ width: "100%" }} />
          <SaveTasksPreset
            selectedPreset={selectedPreset}
            setSelectedPreset={setSelectedPreset}
          />
          <Divider sx={{ width: "100%" }} />
          <LoadTaskPreset
            tasks={tasks}
            selectedPreset={selectedPreset}
            setSelectedPreset={setSelectedPreset}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
