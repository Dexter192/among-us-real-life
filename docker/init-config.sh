#!/bin/sh
set -e

CONFIG_DST=/app/server/data

mkdir -p "$CONFIG_DST"

# Create empty JSON files if they don't exist
if [ ! -f "$CONFIG_DST/config.json" ]; then
  echo '{}' > "$CONFIG_DST/config.json"
fi

if [ ! -f "$CONFIG_DST/players.json" ]; then
  echo '{"players": {}, "admins": {}}' > "$CONFIG_DST/players.json"
fi

if [ ! -f "$CONFIG_DST/sabotages.json" ]; then
  echo '{"activeSabotageList": {}}' > "$CONFIG_DST/sabotages.json"
fi

if [ ! -f "$CONFIG_DST/tasks.json" ]; then
  echo '{"activeTaskList": {}}' > "$CONFIG_DST/tasks.json"
fi

exec "$@"
