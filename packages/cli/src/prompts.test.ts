// packages/cli/src/prompts.test.ts
import { describe, it, expect } from "vitest";
import { defaultThemeConfig } from "@webscit/tokens";
import { buildPromptPlan, assembleConfig } from "./prompts.js";

describe("buildPromptPlan", () => {
  it("returns six questions with default-aware initial values", () => {
    const plan = buildPromptPlan(defaultThemeConfig());
    const names = plan.map((q) => q.name);
    expect(names).toEqual([
      "neutral",
      "primary",
      "radius",
      "sizing",
      "fontText",
      "fontHeading",
    ]);
    const neutral = plan.find((q) => q.name === "neutral")!;
    expect(neutral.choices).toContain("slate");
    expect(neutral.default).toBe("slate");

    const heading = plan.find((q) => q.name === "fontHeading")!;
    expect(heading.choices).toContain("inherit");
    expect(heading.default).toBe("inherit");
  });
});

describe("assembleConfig", () => {
  it("turns a flat answer record into a ThemeConfig", () => {
    const cfg = assembleConfig({
      neutral: "zinc",
      primary: "violet",
      radius: "large",
      sizing: "small",
      fontText: "serif",
      fontHeading: "inherit",
    });
    expect(cfg.neutral).toBe("zinc");
    expect(cfg.primary).toBe("violet");
    expect(cfg.radius).toBe("large");
    expect(cfg.sizing).toBe("small");
    expect(cfg.font.text).toBe("serif");
    expect(cfg.font.heading).toBe("inherit");
    expect(cfg.font.mono).toBe("system-mono");
    expect(cfg.advanced).toEqual({});
  });
});
