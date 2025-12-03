import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import { useGetAllTasks } from "../../../../hooks/useGetAllTasks";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks } = useGetAllTasks();

  if (!tasks || !tasks.taskList) {
    return <Typography>Loading tasks...</Typography>;
  }

  const taskList = tasks.taskList;

  if (Object.keys(taskList).length === 0) {
    return (
      <ListItem>
        <ListItemText primary="No tasks yet. Add some above." />
      </ListItem>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", maxHeight: 240, overflowY: "auto" }}
    >
      <List dense disablePadding>
        {Object.entries(taskList)
          .sort(([idA], [idB]) => Number(idB) - Number(idA))
          .map(([id, task]) => (
            <TaskItem key={id} id={id} task={task} />
          ))}
      </List>
    </Paper>
  );
}
