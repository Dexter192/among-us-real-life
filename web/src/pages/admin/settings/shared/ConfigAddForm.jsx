import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function ConfigAddForm({
  primaryLabel,
  secondaryLabel,
  tertiaryLabel,
  quaternaryLabel,
  quaternaryType = "text",
  booleanLabel,
  addButtonLabel = "Add",
  onAdd,
}) {
  const [primaryValue, setPrimaryValue] = useState("");
  const [secondaryValue, setSecondaryValue] = useState("");
  const [tertiaryValue, setTertiaryValue] = useState("");
  const [quaternaryValue, setQuaternaryValue] = useState("");
  const [booleanValue, setBooleanValue] = useState(false);

  const handleAdd = () => {
    const name = primaryValue.trim();
    const detail = secondaryValue.trim();
    const tertiary = tertiaryValue.trim();
    const quaternary = quaternaryValue.trim();
    if (!name) return;
    onAdd(name, detail, tertiary, quaternary, booleanValue);
    setPrimaryValue("");
    setSecondaryValue("");
    setTertiaryValue("");
    setQuaternaryValue("");
    setBooleanValue(false);
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
      {quaternaryLabel && (
        <TextField
          label={quaternaryLabel}
          type={quaternaryType}
          value={quaternaryValue}
          onChange={(e) => setQuaternaryValue(e.target.value)}
          fullWidth
        />
      )}
      {booleanLabel && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            variant={booleanValue ? "contained" : "outlined"}
            onClick={() => setBooleanValue((prev) => !prev)}
            sx={{ textTransform: "none" }}
          >
            {booleanLabel}: {booleanValue ? "Yes" : "No"}
          </Button>
        </Stack>
      )}
      <Button variant="contained" onClick={handleAdd}>
        {addButtonLabel}
      </Button>
    </Stack>
  );
}
