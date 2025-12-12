import { useConfigList } from "./useConfigList";

export function useTaskConfig() {
  return useConfigList({
    getAllEvent: "get_all_tasks",
    updateEvent: "tasks",
    addEvent: "add_task",
    deleteEvent: "delete_task",
    savePresetEvent: "save_task_preset",
    loadPresetEvent: "load_task_preset",
    deletePresetEvent: "delete_task_preset",
    presetNameKey: "taskSetName",
    activeKey: "activeTaskList",
  });
}
