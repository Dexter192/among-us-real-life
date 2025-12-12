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
  quaternaryKey,
  quaternaryLabel,
  booleanKey,
  booleanLabel,
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
          {entries.map(([id, item]) => {
            const lines = [];
            if (secondaryKey && item?.[secondaryKey]) {
              lines.push(item[secondaryKey]);
            }
            if (tertiaryKey && item?.[tertiaryKey]) {
              lines.push(item[tertiaryKey]);
            }
            if (quaternaryKey && item?.[quaternaryKey] !== undefined) {
              const labelPrefix = quaternaryLabel ? `${quaternaryLabel}: ` : "";
              lines.push(`${labelPrefix}${item[quaternaryKey]}`);
            }
            const secondaryText = lines.length ? lines.join("\n") : undefined;
            const booleanText =
              booleanKey && booleanLabel && item?.[booleanKey] !== undefined
                ? `${booleanLabel}: ${item[booleanKey] ? "Yes" : "No"}`
                : undefined;
            const combinedSecondary = [secondaryText, booleanText]
              .filter(Boolean)
              .join("\n");

            return (
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
                    secondary={combinedSecondary || undefined}
                    secondaryTypographyProps={{
                      component: "div",
                      style: { whiteSpace: "pre-wrap" },
                    }}
                  />
                </ListItem>
                <Divider component="div" />
              </Box>
            );
          })}
        </List>
      )}
    </Paper>
  );
}
