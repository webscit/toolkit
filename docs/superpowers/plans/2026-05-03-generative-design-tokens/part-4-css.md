# Part 4 — CSS emission via Style Dictionary

Feeds the DTCG documents produced in Part 3 to Style Dictionary v5 (already a runtime dep — see `packages/tokens/package.json`) and emits three CSS strings: `tokensCss`, `tokensDarkCss`, `themeCss`. Style Dictionary is invoked **programmatically with in-memory tokens** (no file IO at run time) and a minimal value-preserving transform group.

**Files created in this part:**
- `packages/tokens/src/generate/css.ts`
- `packages/tokens/src/generate/css.test.ts`
- `packages/tokens/src/generate/theme-base.ts` (the static `theme.css` body)

---

## Why a minimal transform group

The existing `build.mjs` uses `tokens-studio-kebab`, which includes `ts/resolveMath`, `ts/size/px`, `size/rem`, etc. Those transforms try to mutate dimension values: a literal string like `"calc(var(--sct-spacing) * 2)"` would be parsed as a math expression and rewritten — which we explicitly do not want. Part 3 already produced exact CSS strings; the build's only job is naming + reference resolution.

The new transform group `webscit/passthrough`:

- `attribute/cti` — sets the `attributes.category/type/item` Style Dictionary needs for naming.
- `name/kebab` — `sct-color-primary-500` style names.
- `color/css` — only touches color tokens (passes hex through unchanged unless the value is an HSL/RGB shorthand; safe).

That's it. No size transforms, no math resolution.

---

## Task 4.1 — Define the static `theme.css` body

**Files:**
- Create: `packages/tokens/src/generate/theme-base.ts`

The current `theme.css` (the long Tailwind-style reset bundled in `build.mjs`) is independent of the chosen `ThemeConfig` — it consumes `--sct-font-family-text` (new) and `--sct-font-family-mono`. Carry it forward verbatim, but switch the `font-family` reference from `--sct-font-family-sans` to `--sct-font-family-text` (the compatibility alias `--sct-font-family-sans` is also emitted from Part 3, so existing consumers keep working).

- [ ] **Step 1: Create the file**

```ts
// packages/tokens/src/generate/theme-base.ts

/**
 * Static base/reset CSS, applied in @layer theme.
 *
 * Independent of ThemeConfig — every theme produces the same theme.css.
 * Token references resolved at runtime via the CSS custom properties emitted
 * into @layer design-tokens.
 */
export const THEME_CSS = `/**
 * Do not edit directly, this file was auto-generated.
 */

@layer theme {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--sct-font-family-text, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-size: var(--sct-font-size-base, 1rem);
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr { height: 0; color: inherit; border-top-width: 1px; }
  abbr:where([title]) { -webkit-text-decoration: underline dotted; text-decoration: underline dotted; }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
    font-family: var(--sct-font-family-heading, var(--sct-font-family-text));
  }
  a { color: inherit; -webkit-text-decoration: inherit; text-decoration: inherit; }
  b, strong { font-weight: bolder; }
  code, kbd, samp, pre {
    font-family: var(--sct-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small { font-size: 80%; }
  sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }
  sub { bottom: -0.25em; }
  sup { top: -0.5em; }
  table { text-indent: 0; border-color: inherit; border-collapse: collapse; }
  :-moz-focusring { outline: auto; }
  progress { vertical-align: baseline; }
  summary { display: list-item; }
  ol, ul, menu { list-style: none; }
  img, svg, video, canvas, audio, iframe, embed, object { display: block; vertical-align: middle; }
  img, video { max-width: 100%; height: auto; }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup { font-weight: bolder; }
  :where(select:is([multiple], [size])) optgroup option { padding-inline-start: 20px; }
  ::file-selector-button { margin-inline-end: 4px; }
  ::placeholder { opacity: 1; }
  @supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea { resize: vertical; }
  ::-webkit-search-decoration { -webkit-appearance: none; }
  ::-webkit-date-and-time-value { min-height: 1lh; text-align: inherit; }
  ::-webkit-datetime-edit { display: inline-flex; }
  ::-webkit-datetime-edit-fields-wrapper { padding: 0; }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator { line-height: 1; }
  :-moz-ui-invalid { box-shadow: none; }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { height: auto; }
  [hidden]:where(:not([hidden="until-found"])) { display: none !important; }
}
`;
```

- [ ] **Step 2: No commit yet**

Commit with Tasks 4.2 and 4.3.

---

## Task 4.2 — Implement `generateCss`

**Files:**
- Create: `packages/tokens/src/generate/css.ts`

- [ ] **Step 1: Write the file**

```ts
// packages/tokens/src/generate/css.ts
import StyleDictionary from "style-dictionary";
import type { DtcgDocuments } from "./tokens.js";
import { THEME_CSS } from "./theme-base.js";

const TRANSFORM_GROUP = "webscit/passthrough";
const FORMAT_LAYERED = "webscit/css-variables-layered";

let registered = false;

function ensureRegistered(): void {
  if (registered) return;
  registered = true;

  StyleDictionary.registerTransformGroup({
    name: TRANSFORM_GROUP,
    transforms: [
      "attribute/cti",
      "name/kebab",
      // Note: no size/rem, no ts/resolveMath, no ts/size/px.
      // Values from generateTokenDocuments are already exact CSS strings.
    ],
  });

  StyleDictionary.registerFormat({
    name: FORMAT_LAYERED,
    format: ({ dictionary, options }) => {
      const opts = options as {
        selector?: string;
        layerOrder?: string;
      };
      const selector = opts.selector ?? ":root";
      const layerOrderDecl = opts.layerOrder
        ? `@layer ${opts.layerOrder};\n\n`
        : "";
      const lines = dictionary.allTokens.map((token) => {
        const value =
          (token as { $value?: string }).$value ??
          (token as { value?: string }).value ??
          "";
        return `    --${token.name}: ${value};`;
      });
      return (
        `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n` +
        `${layerOrderDecl}` +
        `@layer design-tokens {\n` +
        `  ${selector} {\n` +
        `${lines.join("\n")}\n` +
        `  }\n` +
        `}\n`
      );
    },
  });
}

interface BuildArgs {
  tokens: Record<string, unknown>;
  selector: string;
  layerOrder?: string;
}

async function buildCss(args: BuildArgs): Promise<string> {
  ensureRegistered();
  const sd = new StyleDictionary({
    tokens: args.tokens,
    platforms: {
      css: {
        transformGroup: TRANSFORM_GROUP,
        files: [
          {
            destination: "out.css", // not actually written
            format: FORMAT_LAYERED,
            options: {
              selector: args.selector,
              layerOrder: args.layerOrder,
              outputReferences: false,
            },
          },
        ],
      },
    },
  });

  const platforms = await sd.formatAllPlatforms();
  const css = platforms.css?.[0]?.output;
  if (typeof css !== "string") {
    throw new Error("Style Dictionary did not produce CSS output");
  }
  return css;
}

export interface GeneratedCss {
  tokensCss: string;
  tokensDarkCss: string;
  themeCss: string;
}

export async function generateCss(
  docs: DtcgDocuments,
): Promise<GeneratedCss> {
  const tokensCss = await buildCss({
    tokens: docs.light,
    selector: ":root",
    layerOrder: "design-tokens, theme",
  });
  const tokensDarkCss = await buildCss({
    tokens: docs.dark,
    selector: '[data-theme="dark"]',
  });
  return {
    tokensCss,
    tokensDarkCss,
    themeCss: THEME_CSS,
  };
}
```

> **API note for the implementer:** The Style Dictionary v5 API for capturing CSS output without writing files differs slightly between minor releases. The call above uses `formatAllPlatforms()` (returns `{ [platform]: Array<{ destination, output }> }`). If that method is unavailable in the installed version, the alternative is `await sd.buildAllPlatforms()` while overriding `fs` — but the `formatAllPlatforms` path is preferred. Check `node_modules/style-dictionary/lib/StyleDictionary.d.ts` to confirm the exact method name; if it's named differently (e.g. `formatPlatform`), adjust the call site (and only the call site) accordingly.

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck -w packages/tokens
```

Expected: no errors.

- [ ] **Step 3: No commit yet**

---

## Task 4.3 — Test `generateCss`

**Files:**
- Create: `packages/tokens/src/generate/css.test.ts`

- [ ] **Step 1: Write the test**

```ts
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
```

- [ ] **Step 2: Run the tests**

```bash
npm test -w packages/tokens -- css.test
```

Expected: all assertions pass; two new snapshot files written.

If the "no raw px" test fails because the filter is too narrow (e.g. `--sct-radius-full: 9999px` slips through despite the `9999px` filter), inspect the actual output and tighten the filter (don't loosen the assertion).

If aliases like `--sct-color-primary` come out as `{sct.color.primary.600}` literal text instead of the resolved hex, Style Dictionary v5 may need `outputReferences: false` set on the format options *and* references resolved before the format step. The `outputReferences: false` flag in the format options block above should be enough; if not, add `usesReferences` handling in the format function (look for `dictionary.usesReference(token.original.$value)` and resolve via `dictionary.getReferences()`).

- [ ] **Step 3: Inspect snapshots**

```bash
ls packages/tokens/src/generate/__snapshots__/
cat packages/tokens/src/generate/__snapshots__/css.test.ts.snap | head -100
```

Sanity check: `tokens.css` starts with `@layer design-tokens, theme;`, contains `:root {`, has all 6 × 11 = 66 scale variables plus 21 alias variables, plus spacing/radius/font/border tokens.

- [ ] **Step 4: Commit Tasks 4.1 + 4.2 + 4.3**

```bash
git add packages/tokens/src/generate/theme-base.ts \
        packages/tokens/src/generate/css.ts \
        packages/tokens/src/generate/css.test.ts \
        packages/tokens/src/generate/__snapshots__/
git commit -m "feat(tokens): emit CSS from DTCG docs via Style Dictionary"
```

---

## End of Part 4

After Part 4 the package can produce a `GeneratedCss` triple from a `ThemeConfig` (composed in Part 5). The CSS shape matches the project's existing layer contract: `@layer design-tokens, theme;` declared at the top of `tokens.css`, design-tokens block under `:root`, dark overrides under `[data-theme="dark"]`, base reset in `theme.css` under `@layer theme`.
