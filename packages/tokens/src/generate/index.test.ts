// packages/tokens/src/generate/index.test.ts
import { describe, it, expect } from "vitest";
import { defaultThemeConfig } from "./config.js";
import { generateTheme } from "./index.js";

describe("generateTheme", () => {
  it("returns a TokenBundle with all four fields populated", async () => {
    const bundle = await generateTheme(defaultThemeConfig());
    expect(bundle.tokensCss).toContain("@layer design-tokens");
    expect(bundle.tokensCss).toContain(":root {");
    expect(bundle.tokensDarkCss).toContain('[data-theme="dark"]');
    expect(bundle.themeCss).toContain("@layer theme");
    const parsed = JSON.parse(bundle.configJson);
    expect(parsed.neutral).toBe("slate");
    expect(parsed.primary).toBe("blue");
  });

  it("two runs with the same config produce identical output", async () => {
    const a = await generateTheme(defaultThemeConfig());
    const b = await generateTheme(defaultThemeConfig());
    expect(a.tokensCss).toBe(b.tokensCss);
    expect(a.tokensDarkCss).toBe(b.tokensDarkCss);
    expect(a.themeCss).toBe(b.themeCss);
  });

  it("snapshot of default-theme bundle", async () => {
    const bundle = await generateTheme(defaultThemeConfig());
    expect(bundle).toMatchSnapshot();
  });
});
