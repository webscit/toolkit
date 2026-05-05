// packages/tokens/src/generate/palettes.test.ts
import { describe, it, expect } from "vitest";
import { defaultThemeConfig } from "./config.js";
import {
  generatePalettes,
  ROLE_NAMES,
  SCALE_STEPS,
  type Scale,
} from "./palettes.js";

const HEX = /^#[0-9a-fA-F]{6}$/;

function isHex(value: unknown): value is string {
  return typeof value === "string" && HEX.test(value);
}

describe("generatePalettes", () => {
  const palettes = generatePalettes(defaultThemeConfig());

  it("emits both light and dark themes", () => {
    expect(palettes.light).toBeDefined();
    expect(palettes.dark).toBeDefined();
  });

  it.each(ROLE_NAMES)("light theme has all 11 steps for %s", (role) => {
    const scale = palettes.light[role];
    for (const step of SCALE_STEPS) {
      expect(isHex(scale[step])).toBe(true);
    }
  });

  it.each(ROLE_NAMES)("dark theme has all 11 steps for %s", (role) => {
    const scale = palettes.dark[role];
    for (const step of SCALE_STEPS) {
      expect(isHex(scale[step])).toBe(true);
    }
  });

  it("light step 50 is lighter than light step 950 for primary", () => {
    const lum = (hex: string) => parseInt(hex.slice(1), 16);
    expect(lum(palettes.light.primary[50])).toBeGreaterThan(
      lum(palettes.light.primary[950]),
    );
  });

  it("dark step 50 is darker than dark step 950 for primary", () => {
    const lum = (hex: string) => parseInt(hex.slice(1), 16);
    expect(lum(palettes.dark.primary[50])).toBeLessThan(
      lum(palettes.dark.primary[950]),
    );
  });

  it("info role mirrors primary key color", () => {
    expect(palettes.light.info[500]).toBe(palettes.light.primary[500]);
  });

  it("respects advanced.contrastTargets override", () => {
    const cfg = defaultThemeConfig();
    cfg.advanced = { contrastTargets: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] };
    const flat = generatePalettes(cfg);
    // With all ratios at 1, every step should be ~equal to background
    // (flat.light.primary[50] === flat.light.primary[950] within rounding)
    const a: Scale = flat.light.primary;
    expect(a[50]).toBe(a[950]);
  });

  it("respects advanced.darkBackground override", () => {
    const cfg = defaultThemeConfig();
    cfg.advanced = { darkBackground: "#101820" };
    const out = generatePalettes(cfg);
    // Dark step 50 (lowest contrast against bg) should be near #101820
    expect(out.dark.neutral[50].toLowerCase()).toMatch(/^#1[0-3]/);
  });

  it("snapshot of default config", () => {
    const palettes = generatePalettes(defaultThemeConfig());
    expect({
      lightPrimary: palettes.light.primary,
      darkPrimary: palettes.dark.primary,
      lightNeutral: palettes.light.neutral,
      darkNeutral: palettes.dark.neutral,
    }).toMatchSnapshot();
  });
});
