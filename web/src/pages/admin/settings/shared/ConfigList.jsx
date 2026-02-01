import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ConfigEditDialog from "./ConfigEditDialog";

export default function ConfigList({
  entries,
  emptyMessage,
  onDelete,
  onEdit,
  secondaryKey,
  tertiaryKey,
  quaternaryKey,
  quaternaryLabel,
  quaternaryType = "text",
  booleanKey,
  booleanLabel,
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const hasEntries = entries && entries.length > 0;

  const handleEditClick = (id, item) => {
    setEditingId(id);
    setEditingItem(item);
    setEditDialogOpen(true);
  };

  const handleEditSave = (payload) => {
    onEdit?.(editingId, payload);
    setEditDialogOpen(false);
    setEditingItem(null);
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
    setEditingItem(null);
    setEditingId(null);
  };

  return (
    <>
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
                    <Stack direction="row" spacing={0.5}>
                      {onEdit && (
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEditClick(id, item)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
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

    <ConfigEditDialog
      open={editDialogOpen}
      item={editingItem}
      secondaryKey={secondaryKey}
      tertiaryKey={tertiaryKey}
      quaternaryKey={quaternaryKey}
      quaternaryLabel={quaternaryLabel}
      quaternaryType={quaternaryType}
      booleanKey={booleanKey}
      booleanLabel={booleanLabel}
      onSave={handleEditSave}
      onCancel={handleEditCancel}
    />
    </>
  );
}
