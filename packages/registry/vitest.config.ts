import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  optimizeDeps: {
    include: [
      "react",
      "react/jsx-dev-runtime",
      "@base-ui/react/accordion",
      "@base-ui/react/field",
      "@base-ui/react/fieldset",
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
        launchOptions: {
          args: ["--disable-dev-shm-usage"],
        },
        contextOptions: {
          viewport: { width: 1280, height: 720 },
        },
      }),
      enabled: true,
      // at least one instance is required
      instances: [{ browser: "chromium" }],
    },
    exclude: ["dist"],
  },
});
