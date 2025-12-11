import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ConfigList({
  entries,
  emptyMessage,
  onDelete,
  secondaryKey,
  tertiaryKey,
}) {
  const hasEntries = entries && entries.length > 0;

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", minHeight: 50, maxHeight: 240, overflowY: "auto" }}
    >
      {!hasEntries ? (
        <ListItem>
          <ListItemText primary={emptyMessage} />
        </ListItem>
      ) : (
        <List dense disablePadding>
          {entries.map(([id, item]) => (
            <Box key={id} component="li">
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item?.name || "Untitled"}
                  secondary={
                    secondaryKey
                      ? `${item?.[secondaryKey]}${
                          tertiaryKey && item?.[tertiaryKey]
                            ? `\n${item?.[tertiaryKey]}`
                            : ""
                        }`
                      : undefined
                  }
                  secondaryTypographyProps={{
                    component: "div",
                    style: { whiteSpace: "pre-wrap" },
                  }}
                />
              </ListItem>
              <Divider component="div" />
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );
}
