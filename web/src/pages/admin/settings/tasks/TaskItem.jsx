import {
  Typography,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { useSocketConnection } from "../../../../hooks/useSocketConnection";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskItem({ id, task }) {
  const { socket } = useSocketConnection();

  const deleteTask = (id) => {
    console.log("Delete task with id:", id);
    if (socket) {
      socket.emit("delete_task", id);
    }
  };

  if (!task) {
    return <Typography>Error loading task...</Typography>;
  }

  return (
    <>
      <ListItem
        key={id}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteTask(id)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={task.name} secondary={task.location} />
      </ListItem>
      <Divider component="li" />
    </>
  );
}
