import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ConfigList from "./ConfigList";
import ConfigAddForm from "./ConfigAddForm";
import ConfigPresetControls from "./ConfigPresetControls";

export default function ConfigManagerCard({
  title,
  data,
  activeKey,
  presets = [],
  onAdd,
  onDelete,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
  primaryLabel,
  secondaryLabel,
  secondaryKey,
  tertiaryLabel,
  tertiaryKey,
  quaternaryLabel,
  quaternaryKey,
  quaternaryType,
  booleanLabel,
  booleanKey,
  addButtonLabel = "Add",
  emptyMessage = "No items yet.",
}) {
  const list = useMemo(() => data?.[activeKey] || {}, [data, activeKey]);
  const [selectedPreset, setSelectedPreset] = useState("");

  useEffect(() => {
    if (!selectedPreset && presets.length > 0) {
      setSelectedPreset(presets[0]);
    }
  }, [presets, selectedPreset]);

  const entries = useMemo(
    () =>
      Object.entries(list).sort(([idA], [idB]) => Number(idB) - Number(idA)),
    [list]
  );

  return (
    <Stack spacing={1} alignItems="center" sx={{ py: 3 }}>
      <Typography variant="overline">
        {title}
        {selectedPreset ? ` (${selectedPreset})` : ""}
      </Typography>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent>
          <ConfigList
            entries={entries}
            emptyMessage={emptyMessage}
            onDelete={onDelete}
            secondaryKey={secondaryKey}
            tertiaryKey={tertiaryKey}
            quaternaryKey={quaternaryKey}
            quaternaryLabel={quaternaryLabel}
            booleanKey={booleanKey}
            booleanLabel={booleanLabel}
          />

          <ConfigAddForm
            primaryLabel={primaryLabel}
            secondaryLabel={secondaryLabel}
            tertiaryLabel={tertiaryLabel}
            quaternaryLabel={quaternaryLabel}
            quaternaryType={quaternaryType}
            booleanLabel={booleanLabel}
            addButtonLabel={addButtonLabel}
            onAdd={onAdd}
          />

          <Divider sx={{ width: "100%" }} />

          <ConfigPresetControls
            presets={presets}
            selectedPreset={selectedPreset}
            setSelectedPreset={setSelectedPreset}
            onSavePreset={onSavePreset}
            onLoadPreset={onLoadPreset}
            onDeletePreset={onDeletePreset}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
