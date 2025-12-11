import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function ConfigAddForm({
  primaryLabel,
  secondaryLabel,
  tertiaryLabel,
  addButtonLabel = "Add",
  onAdd,
}) {
  const [primaryValue, setPrimaryValue] = useState("");
  const [secondaryValue, setSecondaryValue] = useState("");
  const [tertiaryValue, setTertiaryValue] = useState("");

  const handleAdd = () => {
    const name = primaryValue.trim();
    const detail = secondaryValue.trim();
    const tertiary = tertiaryValue.trim();
    if (!name) return;
    onAdd(name, detail, tertiary);
    setPrimaryValue("");
    setSecondaryValue("");
    setTertiaryValue("");
  };

  return (
    <Stack spacing={1} marginTop={2} marginBottom={2}>
      <Stack direction="row" spacing={1}>
        <TextField
          label={primaryLabel}
          value={primaryValue}
          onChange={(e) => setPrimaryValue(e.target.value)}
          fullWidth
        />
        <TextField
          label={secondaryLabel}
          value={secondaryValue}
          onChange={(e) => setSecondaryValue(e.target.value)}
          fullWidth
        />
      </Stack>
      {tertiaryLabel && (
        <TextField
          label={tertiaryLabel}
          value={tertiaryValue}
          onChange={(e) => setTertiaryValue(e.target.value)}
          fullWidth
          multiline
          rows={2}
        />
      )}
      <Button variant="contained" onClick={handleAdd}>
        {addButtonLabel}
      </Button>
    </Stack>
  );
}
