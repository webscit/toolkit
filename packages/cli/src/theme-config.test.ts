// packages/cli/src/theme-config.test.ts
import { describe, it, expect } from "vitest";
import { mkdtempSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { defaultThemeConfig } from "@webscit/tokens";
import {
  readThemeConfig,
  writeThemeConfig,
  hasThemeConfig,
} from "./theme-config.js";

function tempCwd(initial: object): string {
  const cwd = mkdtempSync(join(tmpdir(), "webscit-theme-"));
  writeFileSync(
    join(cwd, "components.json"),
    JSON.stringify(initial, null, 2) + "\n",
  );
  return cwd;
}

describe("theme-config", () => {
  it("hasThemeConfig=false when section is missing", () => {
    const cwd = tempCwd({ tailwind: { css: "src/index.css" } });
    expect(hasThemeConfig(cwd)).toBe(false);
  });

  it("readThemeConfig throws when section is missing", () => {
    const cwd = tempCwd({ tailwind: { css: "src/index.css" } });
    expect(() => readThemeConfig(cwd)).toThrow(/theme/i);
  });

  it("writes theme section without dropping other fields", () => {
    const cwd = tempCwd({
      tailwind: { css: "src/index.css" },
      registries: { "@webscit": "https://x/y/{name}.json" },
    });
    writeThemeConfig(cwd, defaultThemeConfig());

    const content = JSON.parse(
      readFileSync(join(cwd, "components.json"), "utf8"),
    );
    expect(content.tailwind.css).toBe("src/index.css");
    expect(content.registries["@webscit"]).toBe("https://x/y/{name}.json");
    expect(content.theme.neutral).toBe("slate");
    expect(content.theme.primary).toBe("blue");
  });

  it("readThemeConfig validates and returns the section", () => {
    const cwd = tempCwd({
      tailwind: { css: "src/index.css" },
      theme: {
        neutral: "zinc",
        primary: "violet",
        radius: "large",
        sizing: "small",
        font: { text: "serif", heading: "inherit", mono: "system-mono" },
      },
    });
    const cfg = readThemeConfig(cwd);
    expect(cfg.neutral).toBe("zinc");
    expect(cfg.primary).toBe("violet");
    expect(cfg.advanced).toEqual({});
  });

  it("readThemeConfig surfaces validation errors clearly", () => {
    const cwd = tempCwd({
      tailwind: { css: "src/index.css" },
      theme: {
        neutral: "purple",
        primary: "blue",
        radius: "medium",
        sizing: "medium",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      },
    });
    expect(() => readThemeConfig(cwd)).toThrow(/neutral/i);
  });
});
