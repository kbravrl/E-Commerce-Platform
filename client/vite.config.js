import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  define: {
    global: {},
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:9191",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
