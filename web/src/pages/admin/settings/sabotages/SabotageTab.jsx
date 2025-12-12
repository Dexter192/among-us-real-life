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
      onAdd={(
        name,
        effect,
        diffuseDescription,
        timerSecondsInput,
        dismissByPlayer
      ) => {
        const parsedTimer = Number(timerSecondsInput);
        const timerSeconds = Number.isFinite(parsedTimer)
          ? Math.max(0, parsedTimer)
          : 0;
        addItem({
          name,
          effect,
          diffuseDescription,
          timerSeconds,
          dismissByPlayer: Boolean(dismissByPlayer),
        });
      }}
      onDelete={deleteItem}
      onSavePreset={savePreset}
      onLoadPreset={loadPreset}
      onDeletePreset={deletePreset}
      primaryLabel="Sabotage"
      secondaryLabel="Effect"
      secondaryKey="effect"
      tertiaryLabel="Diffuse Description"
      tertiaryKey="diffuseDescription"
      quaternaryLabel="Timer (seconds)"
      quaternaryKey="timerSeconds"
      quaternaryType="number"
      booleanLabel="Dismissible by players"
      booleanKey="dismissByPlayer"
      addButtonLabel="Add"
      emptyMessage="No sabotages yet."
    />
  );
}
