import path from "path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const configDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["@splinetool/runtime", "@splinetool/react-spline"],
  },

  resolve: {
    alias: {
      "@": path.resolve(configDir, "./src"),
    },
  },
});
