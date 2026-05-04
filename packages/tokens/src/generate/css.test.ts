// packages/tokens/src/generate/css.test.ts
import { describe, it, expect } from "vitest";
import { defaultThemeConfig } from "./config.js";
import { generatePalettes } from "./palettes.js";
import { generateTokenDocuments } from "./tokens.js";
import { generateCss } from "./css.js";

describe("generateCss", () => {
  it("emits tokens.css with the layer-order declaration first", async () => {
    const cfg = defaultThemeConfig();
    const docs = generateTokenDocuments(cfg, generatePalettes(cfg));
    const out = await generateCss(docs);
    expect(out.tokensCss).toMatch(/^[\s\S]*?@layer design-tokens, theme;/);
    expect(out.tokensCss).toContain("@layer design-tokens {");
    expect(out.tokensCss).toContain(":root {");
  });

  it("uses [data-theme=\"dark\"] for the dark file", async () => {
    const cfg = defaultThemeConfig();
    const docs = generateTokenDocuments(cfg, generatePalettes(cfg));
    const out = await generateCss(docs);
    expect(out.tokensDarkCss).toContain('[data-theme="dark"] {');
    // No layer-order declaration on the dark file.
    expect(out.tokensDarkCss).not.toMatch(/@layer design-tokens, theme;/);
  });

  it("emits kebab-case --sct-* variables", async () => {
    const cfg = defaultThemeConfig();
    const docs = generateTokenDocuments(cfg, generatePalettes(cfg));
    const out = await generateCss(docs);
    expect(out.tokensCss).toMatch(/--sct-color-primary-500: #/);
    expect(out.tokensCss).toMatch(/--sct-color-primary: #/); // alias resolved
    expect(out.tokensCss).toMatch(/--sct-spacing: 0\.25rem;/);
    expect(out.tokensCss).toMatch(
      /--sct-space-2: calc\(var\(--sct-spacing\) \* 2\);/,
    );
    expect(out.tokensCss).toMatch(
      /--sct-font-size-xs: calc\(var\(--sct-font-size-base\) \* 0\.75\);/,
    );
    expect(out.tokensCss).toMatch(/--sct-border-width-1: 1px;/);
  });

  it("preserves calc() strings (no math resolution)", async () => {
    const cfg = defaultThemeConfig();
    const docs = generateTokenDocuments(cfg, generatePalettes(cfg));
    const out = await generateCss(docs);
    expect(out.tokensCss).not.toMatch(/--sct-space-2: 0\.5rem;/); // would be the resolved math
    expect(out.tokensCss).toContain("calc(var(--sct-spacing) * 2)");
  });

  it("emits no raw px outside border-width tokens", async () => {
    const cfg = defaultThemeConfig();
    const docs = generateTokenDocuments(cfg, generatePalettes(cfg));
    const out = await generateCss(docs);
    // Strip border-width lines and the special 9999px radius full token.
    const filtered = out.tokensCss
      .split("\n")
      .filter((l) => !/--sct-border-width/.test(l))
      .filter((l) => !/9999px/.test(l))
      // Compatibility shims (Phase A): shadows, sidebar, and drawer keep
      // their legacy px values until Phase B revisits them.
      .filter((l) => !/--sct-shadow-/.test(l))
      .filter((l) => !/--sct-sidebar-/.test(l))
      .filter((l) => !/--sct-drawer-/.test(l))
      .join("\n");
    expect(filtered).not.toMatch(/\b\d+px\b/);
  });

  it("themeCss references --sct-font-family-text", async () => {
    const cfg = defaultThemeConfig();
    const docs = generateTokenDocuments(cfg, generatePalettes(cfg));
    const out = await generateCss(docs);
    expect(out.themeCss).toContain("@layer theme");
    expect(out.themeCss).toContain("var(--sct-font-family-text");
    expect(out.themeCss).toContain("var(--sct-font-family-mono");
  });

  it("snapshot of default-theme tokens.css", async () => {
    const cfg = defaultThemeConfig();
    const docs = generateTokenDocuments(cfg, generatePalettes(cfg));
    const out = await generateCss(docs);
    expect(out.tokensCss).toMatchSnapshot();
  });

  it("snapshot of default-theme tokens-dark.css", async () => {
    const cfg = defaultThemeConfig();
    const docs = generateTokenDocuments(cfg, generatePalettes(cfg));
    const out = await generateCss(docs);
    expect(out.tokensDarkCss).toMatchSnapshot();
  });
});
