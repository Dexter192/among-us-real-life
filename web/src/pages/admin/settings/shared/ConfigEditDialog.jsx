import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ConfigEditDialog({
  open,
  item,
  secondaryKey,
  tertiaryKey,
  quaternaryKey,
  quaternaryLabel,
  quaternaryType = "text",
  booleanKey,
  booleanLabel,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (open && item) {
      setFormData({
        name: item?.name || "",
        [secondaryKey]: item?.[secondaryKey] || "",
        [tertiaryKey]: item?.[tertiaryKey] || "",
        [quaternaryKey]: item?.[quaternaryKey] || "",
        [booleanKey]: item?.[booleanKey] || false,
      });
    }
  }, [open, item, secondaryKey, tertiaryKey, quaternaryKey, booleanKey]);

  const handleSave = () => {
    if (!formData.name?.trim()) return;
    const payload = {
      name: formData.name.trim(),
    };
    if (secondaryKey && formData[secondaryKey] !== undefined) {
      payload[secondaryKey] =
        formData[secondaryKey].trim?.() || formData[secondaryKey];
    }
    if (tertiaryKey && formData[tertiaryKey] !== undefined) {
      payload[tertiaryKey] =
        formData[tertiaryKey].trim?.() || formData[tertiaryKey];
    }
    if (quaternaryKey && formData[quaternaryKey] !== undefined) {
      payload[quaternaryKey] =
        formData[quaternaryKey].trim?.() || formData[quaternaryKey];
    }
    if (booleanKey && formData[booleanKey] !== undefined) {
      payload[booleanKey] = formData[booleanKey];
    }
    onSave(payload);
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            required
          />
          {secondaryKey && (
            <TextField
              label={
                secondaryKey.charAt(0).toUpperCase() + secondaryKey.slice(1)
              }
              value={formData[secondaryKey] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [secondaryKey]: e.target.value,
                })
              }
              fullWidth
            />
          )}
          {tertiaryKey && (
            <TextField
              label={tertiaryKey.charAt(0).toUpperCase() + tertiaryKey.slice(1)}
              value={formData[tertiaryKey] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [tertiaryKey]: e.target.value,
                })
              }
              fullWidth
              multiline
              rows={3}
            />
          )}
          {quaternaryKey && quaternaryLabel && (
            <TextField
              label={quaternaryLabel}
              type={quaternaryType}
              value={formData[quaternaryKey] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [quaternaryKey]: e.target.value,
                })
              }
              multiline={quaternaryType === "text"}
              rows={quaternaryType === "text" ? 3 : 1}
              fullWidth
            />
          )}
          {booleanKey && booleanLabel && (
            <Button
              variant={formData[booleanKey] ? "contained" : "outlined"}
              onClick={() =>
                setFormData({
                  ...formData,
                  [booleanKey]: !formData[booleanKey],
                })
              }
              sx={{ textTransform: "none" }}
            >
              {booleanLabel}: {formData[booleanKey] ? "Yes" : "No"}
            </Button>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
