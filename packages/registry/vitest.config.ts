import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import path from "path";

export default defineConfig({
  optimizeDeps: {
    include: [
      "react/jsx-dev-runtime",
      "@base-ui/react/accordion",
      "@base-ui/react/alert-dialog",
      "@base-ui/react/collapsible",
      "@base-ui/react/dialog",
      "@base-ui/react/popover",
      "@base-ui/react/slider",
      "@base-ui/react/toast",
      "react-resizable-panels",
    ],
  },
  test: {
    browser: {
      provider: playwright({
        launch: {
          args: ["--disable-dev-shm-usage"],
        },
      }),
      enabled: true,
      // at least one instance is required
      instances: [{ browser: "chromium" }],
    },
    exclude: ["dist"],
  },
});
