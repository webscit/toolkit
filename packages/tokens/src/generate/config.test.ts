// packages/tokens/src/generate/config.test.ts
import { describe, it, expect } from "vitest";
import { defaultThemeConfig, parseThemeConfig } from "./config.js";

describe("defaultThemeConfig", () => {
  it("returns a valid ThemeConfig", () => {
    const cfg = defaultThemeConfig();
    expect(cfg.neutral).toBe("slate");
    expect(cfg.primary).toBe("blue");
    expect(cfg.radius).toBe("medium");
    expect(cfg.sizing).toBe("medium");
    expect(cfg.font.text).toBe("system");
    expect(cfg.font.heading).toBe("inherit");
    expect(cfg.font.mono).toBe("system-mono");
  });
});

describe("parseThemeConfig", () => {
  it("accepts a valid config object", () => {
    const cfg = parseThemeConfig({
      neutral: "zinc",
      primary: "violet",
      radius: "large",
      sizing: "small",
      font: { text: "serif", heading: "geometric-sans", mono: "system-mono" },
    });
    expect(cfg.neutral).toBe("zinc");
  });

  it("fills missing optional advanced field with empty object", () => {
    const cfg = parseThemeConfig({
      neutral: "slate",
      primary: "blue",
      radius: "medium",
      sizing: "medium",
      font: { text: "system", heading: "inherit", mono: "system-mono" },
    });
    expect(cfg.advanced).toEqual({});
  });

  it("rejects unknown neutral", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "purple-fog",
        primary: "blue",
        radius: "medium",
        sizing: "medium",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/neutral/i);
  });

  it("rejects unknown primary", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "slate",
        primary: "magenta",
        radius: "medium",
        sizing: "medium",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/primary/i);
  });

  it("rejects unknown radius", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "slate",
        primary: "blue",
        radius: "huge",
        sizing: "medium",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/radius/i);
  });

  it("rejects unknown sizing", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "slate",
        primary: "blue",
        radius: "medium",
        sizing: "xl",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/sizing/i);
  });

  it("rejects unknown font", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "slate",
        primary: "blue",
        radius: "medium",
        sizing: "medium",
        font: { text: "comic-sans", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/text/i);
  });

  it("accepts heading: 'inherit'", () => {
    const cfg = parseThemeConfig({
      neutral: "slate",
      primary: "blue",
      radius: "medium",
      sizing: "medium",
      font: { text: "system", heading: "inherit", mono: "system-mono" },
    });
    expect(cfg.font.heading).toBe("inherit");
  });

  it("rejects non-object input", () => {
    expect(() => parseThemeConfig(null)).toThrow();
    expect(() => parseThemeConfig("nope")).toThrow();
  });
});
