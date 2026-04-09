import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import path from "path";

export default defineConfig({
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
