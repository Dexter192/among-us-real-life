import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy Socket.IO websocket and polling to the Python server
      // Add socket.io proxy here if needed
    },
  },
});
