import { useEffect, useMemo, useState } from "react";
import { useSocketConnection } from "./useSocketConnection";

export function useConfigList({
  getAllEvent,
  updateEvent,
  addEvent,
  deleteEvent,
  savePresetEvent,
  loadPresetEvent,
  deletePresetEvent,
  presetNameKey,
  activeKey,
}) {
  const { socket } = useSocketConnection();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (!socket || !getAllEvent || !updateEvent) return;

    socket.emit(getAllEvent);

    const handler = (payload) => {
      setData(payload || {});
    };

    socket.on(updateEvent, handler);

    return () => {
      socket.off(updateEvent, handler);
    };
  }, [socket, getAllEvent, updateEvent]);

  const addItem = (payload) => {
    if (!socket || !addEvent) return;
    socket.emit(addEvent, payload);
  };

  const deleteItem = (id) => {
    if (!socket || !deleteEvent) return;
    socket.emit(deleteEvent, id);
  };

  const savePreset = (name) => {
    if (!socket || !savePresetEvent || !presetNameKey || !name) return;
    socket.emit(savePresetEvent, { [presetNameKey]: name });
  };

  const loadPreset = (name) => {
    if (!socket || !loadPresetEvent || !presetNameKey || !name) return;
    socket.emit(loadPresetEvent, { [presetNameKey]: name });
  };

  const deletePreset = (name) => {
    if (!socket || !deletePresetEvent || !presetNameKey || !name) return;
    socket.emit(deletePresetEvent, { [presetNameKey]: name });
  };

  const presets = useMemo(() => {
    if (!data) return [];
    return Object.keys(data).filter((key) => key !== activeKey);
  }, [data, activeKey]);

  return {
    data,
    presets,
    addItem,
    deleteItem,
    savePreset,
    loadPreset,
    deletePreset,
    activeKey,
  };
}
