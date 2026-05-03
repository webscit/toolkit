# Part 5 — Public API & default build

Composes the generator pieces from Parts 1–4 into the package's public API, replaces `build.mjs` so the default build produces `dist/tokens.css` / `dist/tokens-dark.css` / `dist/theme.css` from `defaultThemeConfig()`, and removes the now-unused static JSON sources.

**Files created in this part:**
- `packages/tokens/src/generate/index.ts`
- `packages/tokens/src/generate/index.test.ts`

**Files modified in this part:**
- `packages/tokens/src/index.ts` — re-export the public API.
- `packages/tokens/build.mjs` — call `generateTheme(defaultThemeConfig())`.

**Files deleted in this part:**
- `packages/tokens/src/base.tokens.json`
- `packages/tokens/src/semantic.tokens.json`
- `packages/tokens/src/semantic-dark.tokens.json`

---

## Task 5.1 — Implement `generateTheme`

**Files:**
- Create: `packages/tokens/src/generate/index.ts`

- [ ] **Step 1: Write the file**

```ts
// packages/tokens/src/generate/index.ts
import type { ThemeConfig } from "./config.js";
import { generatePalettes } from "./palettes.js";
import { generateTokenDocuments } from "./tokens.js";
import { generateCss } from "./css.js";

export interface TokenBundle {
  tokensCss: string;
  tokensDarkCss: string;
  themeCss: string;
  /** Serialized `theme` section, ready to embed in components.json. */
  configJson: string;
}

export async function generateTheme(
  config: ThemeConfig,
): Promise<TokenBundle> {
  const palettes = generatePalettes(config);
  const docs = generateTokenDocuments(config, palettes);
  const css = await generateCss(docs);
  return {
    tokensCss: css.tokensCss,
    tokensDarkCss: css.tokensDarkCss,
    themeCss: css.themeCss,
    configJson: JSON.stringify(config, null, 2),
  };
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck -w packages/tokens
```

Expected: no errors.

---

## Task 5.2 — Smoke-test the composed API

**Files:**
- Create: `packages/tokens/src/generate/index.test.ts`

- [ ] **Step 1: Write the test**

```ts
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
```

- [ ] **Step 2: Run the tests**

```bash
npm test -w packages/tokens -- index.test
```

Expected: 3 tests pass, snapshot written.

- [ ] **Step 3: Commit Tasks 5.1 + 5.2**

```bash
git add packages/tokens/src/generate/index.ts \
        packages/tokens/src/generate/index.test.ts \
        packages/tokens/src/generate/__snapshots__/
git commit -m "feat(tokens): add generateTheme composition + snapshot test"
```

---

## Task 5.3 — Update the package entry to re-export the public API

**Files:**
- Modify: `packages/tokens/src/index.ts`

- [ ] **Step 1: Replace `src/index.ts` entirely**

```ts
// packages/tokens/src/index.ts

// Public types
export type {
  ThemeConfig,
  AdvancedThemeConfig,
  RadiusChoice,
  SizingChoice,
} from "./generate/config.js";
export type { NeutralName } from "./defaults/neutrals.js";
export type { PrimaryName } from "./defaults/primaries.js";
export type { FontName } from "./defaults/fonts.js";

// Public values
export {
  defaultThemeConfig,
  parseThemeConfig,
  RADIUS_CHOICES,
  SIZING_CHOICES,
} from "./generate/config.js";
export { NEUTRAL_CHOICES } from "./defaults/neutrals.js";
export { PRIMARY_CHOICES } from "./defaults/primaries.js";
export { FONT_CHOICES } from "./defaults/fonts.js";

// Generator
export { generateTheme, type TokenBundle } from "./generate/index.js";
```

- [ ] **Step 2: Verify the previous synchronous `generateTokens` consumer (CLI) still type-checks**

The CLI in `packages/cli/src/index.ts` currently calls `generateTokens()` synchronously and uses the returned `TokenBundle`. The new `generateTheme(...)` is **async** and takes a `ThemeConfig`. We're about to break that import.

This task only changes the tokens entry; the CLI is updated in Part 6. Do **not** run the CLI typecheck yet — it will fail with `Module '"@webscit/tokens"' has no exported member 'generateTokens'`. That's expected and fixed in Part 6.

Run only the tokens typecheck:

```bash
npm run typecheck -w packages/tokens
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add packages/tokens/src/index.ts
git commit -m "refactor(tokens): re-export the new public generator API"
```

---

## Task 5.4 — Replace `build.mjs`

**Files:**
- Modify: `packages/tokens/build.mjs`

The new build calls `generateTheme(defaultThemeConfig())` and writes the three CSS files into `dist/`. It no longer reads source JSON.

- [ ] **Step 1: Replace the file**

```js
// packages/tokens/build.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, fileURLToPath } from "node:path";

// We import the compiled JS — but the build runs *before* tsc.
// Use a tsx/ts-node loader by invoking the ESM .ts source directly via
// Node's import-from-loader is fragile; the simpler path is to have build.mjs
// shell out to tsc first, then import dist/index.js. We do the opposite:
// run build.mjs *after* tsc by reordering the npm script.
import { generateTheme, defaultThemeConfig } from "./dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = join(here, "dist");
mkdirSync(distDir, { recursive: true });

const bundle = await generateTheme(defaultThemeConfig());

writeFileSync(join(distDir, "tokens.css"), bundle.tokensCss);
writeFileSync(join(distDir, "tokens-dark.css"), bundle.tokensDarkCss);
writeFileSync(join(distDir, "theme.css"), bundle.themeCss);

console.log("✓ tokens built");
```

- [ ] **Step 2: Reorder the build script so tsc runs first**

In `packages/tokens/package.json`, change the `build` script:

```json
"build": "tsc -p tsconfig.build.json && node build.mjs"
```

(Was `node build.mjs && tsc -p tsconfig.build.json`. The new order matters: `build.mjs` imports from `./dist/index.js`, so the TS compile must happen first.)

- [ ] **Step 3: Run the build**

```bash
npm run build -w packages/tokens
```

Expected output:
- `dist/index.js`, `dist/index.d.ts` (and the same for every `.ts` source).
- `dist/tokens.css`, `dist/tokens-dark.css`, `dist/theme.css`.
- Final line: `✓ tokens built`.

If the build fails because Style Dictionary's ESM exports differ between v4 and v5, check `node_modules/style-dictionary/package.json` for the exported subpath and adjust the import in `css.ts` accordingly. The current `build.mjs` imports `StyleDictionary` from `"style-dictionary"` so the same import should work.

- [ ] **Step 4: Spot-check the generated CSS**

```bash
head -5 packages/tokens/dist/tokens.css
grep -c "^    --sct-" packages/tokens/dist/tokens.css
```

Expected:
- Line 1 of `tokens.css`: `/**`
- Line 5: `@layer design-tokens, theme;`
- Variable count >= 90 (66 scale + 21 aliases + spacing base + space scale (13) + radius base + radius scale (5) + font-size base + font-size scale (6) + font families (4) + border widths (2) ≈ 120).

- [ ] **Step 5: Commit**

```bash
git add packages/tokens/build.mjs packages/tokens/package.json
git commit -m "feat(tokens): rebuild dist via generateTheme(defaultThemeConfig())"
```

---

## Task 5.5 — Remove static JSON sources

**Files:**
- Delete: `packages/tokens/src/base.tokens.json`
- Delete: `packages/tokens/src/semantic.tokens.json`
- Delete: `packages/tokens/src/semantic-dark.tokens.json`

- [ ] **Step 1: Remove the files**

```bash
git rm packages/tokens/src/base.tokens.json \
       packages/tokens/src/semantic.tokens.json \
       packages/tokens/src/semantic-dark.tokens.json
```

- [ ] **Step 2: Re-run the tokens build to confirm nothing references them**

```bash
npm run build -w packages/tokens
```

Expected: the build still succeeds. (`build.mjs` no longer reads JSON; it pulls everything from the generator.)

- [ ] **Step 3: Run tokens tests**

```bash
npm test -w packages/tokens
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git commit -m "refactor(tokens): drop static JSON sources, defaults live in code"
```

---

## Task 5.6 — Verify the registry/storybook builds still resolve `@webscit/tokens`

The Storybook app and the registry import `@webscit/tokens` (and its CSS subpath exports). The package's `exports` map still points at `./dist/tokens.css` / `./dist/tokens-dark.css` / `./dist/theme.css`, so consumers don't change.

- [ ] **Step 1: Run the rest of the workspace's typecheck**

```bash
npm run typecheck
```

Expected: `packages/cli` fails with `Module '"@webscit/tokens"' has no exported member 'generateTokens'`. That is the only acceptable failure at this point — fixed in Part 6. Everything else (registry, docs) should pass.

- [ ] **Step 2: Run all tests except CLI**

```bash
npm test -w packages/tokens
npm test -w packages/registry
```

Expected: both pass. Registry tests still pass because the new `tokens.css` is shape-compatible — the `.sct-<name>` scope anchors and tokens that components rely on (`--sct-color-primary`, `--sct-radius-md`, `--sct-space-N`, `--sct-font-family-sans` shim, etc.) all still resolve.

If a registry test fails on a specific token that no longer exists, **stop** and adjust the generator's compatibility shims (in `tokens.ts` from Part 3) — do not edit the component to make it pass. The contract is "Phase A doesn't touch components."

- [ ] **Step 3: No commit (no source changes in this task)**

---

## End of Part 5

After Part 5:
- `@webscit/tokens` exposes `generateTheme(config)`, `defaultThemeConfig()`, the choice lists, and the validator.
- `dist/` contains generator-produced `tokens.css`, `tokens-dark.css`, `theme.css` — same shape as before, generated values throughout.
- Static JSON sources are gone.
- Workspace typecheck fails only in `packages/cli` (intentional, Part 6 fixes it).
- Registry tests still pass — Phase A's "no component change" promise holds.
