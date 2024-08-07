import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173, // Вы можете изменить порт на любой другой, если требуется
  },
  define: {
    "process.env": {},
  },
  optimizeDeps: {
    include: ["jwt-decode"],
  },
});
