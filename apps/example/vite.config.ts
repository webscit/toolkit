import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@webscit/registry": path.resolve(
        __dirname,
        "../../packages/registry/src",
      ),
      "@webscit/tokens": path.resolve(__dirname, "../../packages/tokens/dist"),
    },
  },
});
