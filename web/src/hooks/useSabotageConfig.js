import { useConfigList } from "./useConfigList";

export function useSabotageConfig() {
  return useConfigList({
    getAllEvent: "get_all_sabotages",
    updateEvent: "sabotages",
    addEvent: "add_sabotage",
    deleteEvent: "delete_sabotage",
    savePresetEvent: "save_sabotage_preset",
    loadPresetEvent: "load_sabotage_preset",
    deletePresetEvent: "delete_sabotage_preset",
    presetNameKey: "sabotageSetName",
    activeKey: "activeSabotageList",
  });
}
