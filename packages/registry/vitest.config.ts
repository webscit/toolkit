import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import path from "path";

export default defineConfig({
  optimizeDeps: {
    include: [
      "react/jsx-dev-runtime",
      "@base-ui/react/popover",
      "@base-ui/react/slider",
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
