import { Button, Stack, TextField } from "@mui/material";

export default function ConfigPresetControls({
  presets,
  selectedPreset,
  setSelectedPreset,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
}) {
  const handleSave = () => {
    if (!selectedPreset) return;
    onSavePreset(selectedPreset);
  };

  const handleLoad = (value) => {
    setSelectedPreset(value);
    onLoadPreset(value);
  };

  const handleDelete = () => {
    if (!selectedPreset) return;
    onDeletePreset(selectedPreset);
    setSelectedPreset("");
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        marginTop={2}
        marginBottom={2}
        alignItems="center"
      >
        <TextField
          label="Preset Name"
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value)}
          fullWidth
        />
        <Button variant="contained" size="small" onClick={handleSave}>
          Save Preset
        </Button>
      </Stack>

      {presets.length > 0 && (
        <Stack direction="row" spacing={1} marginTop={1}>
          <select
            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            value={selectedPreset}
            onChange={(e) => handleLoad(e.target.value)}
          >
            <option value="" disabled>
              Select a preset
            </option>
            {presets.map((preset) => (
              <option key={preset} value={preset}>
                {preset}
              </option>
            ))}
          </select>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      )}
    </>
  );
}
