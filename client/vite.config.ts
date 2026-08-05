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
  ssr: {
    // dicons is CommonJS but is imported with named exports by the templates.
    // Bundle it so Node's ESM loader does not try to resolve those exports.
    noExternal: ["dicons"],
  },

  resolve: {
    alias: {
      "@": path.resolve(configDir, "./src"),
    },
  },
});
