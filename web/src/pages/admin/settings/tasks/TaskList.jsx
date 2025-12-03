import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  if (!tasks || !tasks.activeTaskList) {
    return <Typography>Loading tasks...</Typography>;
  }

  const taskList = tasks.activeTaskList;

  if (Object.keys(taskList).length === 0) {
    return (
      <ListItem>
        <ListItemText primary="No tasks yet." />
      </ListItem>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", minHeight: 50, maxHeight: 240, overflowY: "auto" }}
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
