import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import Inspect from "vite-plugin-inspect";
export default defineConfig({
  plugins: [react(), tailwindcss(), Inspect()],
  build: {
    target: "esnext", // Modern JS
    minify: "esbuild", // Fast minifier
    cssCodeSplit: true, // Split CSS
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
