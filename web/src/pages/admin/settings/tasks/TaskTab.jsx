import ConfigManagerCard from "../shared/ConfigManagerCard";
import { useTaskConfig } from "../../../../hooks/useTaskConfig";

export default function TaskTab() {
  const {
    data,
    presets,
    addItem,
    deleteItem,
    savePreset,
    loadPreset,
    deletePreset,
    activeKey,
  } = useTaskConfig();

  return (
    <ConfigManagerCard
      title="Tasks"
      data={data}
      activeKey={activeKey}
      presets={presets}
      onAdd={(name, location, description) =>
        addItem({ name, location, description })
      }
      onDelete={deleteItem}
      onSavePreset={savePreset}
      onLoadPreset={loadPreset}
      onDeletePreset={deletePreset}
      primaryLabel="Task"
      secondaryLabel="Location"
      secondaryKey="location"
      tertiaryLabel="Description"
      tertiaryKey="description"
      addButtonLabel="Add"
      emptyMessage="No tasks yet."
    />
  );
}
