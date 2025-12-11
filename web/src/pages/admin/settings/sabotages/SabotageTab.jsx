import ConfigManagerCard from "../shared/ConfigManagerCard";
import { useSabotageConfig } from "../../../../hooks/useSabotageConfig";

export default function SabotageTab() {
  const {
    data,
    presets,
    addItem,
    deleteItem,
    savePreset,
    loadPreset,
    deletePreset,
    activeKey,
  } = useSabotageConfig();

  return (
    <ConfigManagerCard
      title="Sabotages"
      data={data}
      activeKey={activeKey}
      presets={presets}
      onAdd={(name, effect, diffuseDescription) =>
        addItem({ name, effect, diffuseDescription })
      }
      onDelete={deleteItem}
      onSavePreset={savePreset}
      onLoadPreset={loadPreset}
      onDeletePreset={deletePreset}
      primaryLabel="Sabotage"
      secondaryLabel="Effect"
      secondaryKey="effect"
      tertiaryLabel="Diffuse Description"
      tertiaryKey="diffuseDescription"
      addButtonLabel="Add"
      emptyMessage="No sabotages yet."
    />
  );
}
