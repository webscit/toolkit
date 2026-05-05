# Generative Design Token System — Design

**Status:** Approved (brainstorming)
**Date:** 2026-05-03
**Owner:** Frédéric Collonval

## Goal

Let consumers of `@webscit/toolkit` generate an adaptive design token system from a small set of key theme variables. Generation is **CLI-time only**: prompts capture choices, a generator produces W3C DTCG JSON, Style Dictionary v4 emits the same `tokens.css` / `tokens-dark.css` / `theme.css` shape the project already uses, and the generated files are written into the consumer's project as static, checked-in CSS. No runtime theming dependency.

Color palettes are built with `@adobe/leonardo-contrast-colors` so each step is contrast-tuned against the chosen neutral background, in both light and dark modes.

## Non-goals (v1)

- Runtime `<ThemeProvider>` or in-app theme switching.
- Loading web fonts (Google Fonts / Fontsource) — consumer wires up themselves.
- Free-form hex color input — only curated lists.
- Per-component density or scale overrides.
- Tint-from-primary neutrals.

## Constraints

- All length tokens are in `rem` **except** border widths (kept in `px`).
- All spacing (margin/padding/gap/...) derives from a single `--sct-spacing` CSS property.
- Color palettes generated for: `primary`, `neutral`, `success`, `info`, `warning`, `destructive`.
- Three font families: `text`, `heading` (defaults to `text`), `mono`.
- Inspiration: Tailwind CSS scales; structural patterns from `@microsoft/fast-components` (see `ref/package/`).

## Init prompts

`@webscit/cli init` interactively asks the user six questions (`@inquirer/prompts` `select`):

| Prompt | Choices |
|---|---|
| Neutral color | `slate`, `gray`, `zinc`, `neutral`, `stone` |
| Primary color | `blue`, `indigo`, `violet`, `rose`, `green`, `amber`, `cyan`, `emerald` |
| Border radius | `none`, `small`, `medium`, `large`, `full` |
| Sizing | `small`, `medium`, `large` (one knob driving spacing base **and** font-size base) |
| Text font | `system`, `geometric-sans`, `humanist-sans`, `serif`, `slab` |
| Heading font | same list **plus** `inherit (use text font)` |

Mono font is fixed to `system-mono` in v1; advanced override via `components.json` JSON edit.

Non-interactive mode (no TTY or `--yes` flag): write `defaultThemeConfig()` and proceed.

## Configuration storage

Choices are persisted in a `theme` section of the consumer's `components.json`:

```jsonc
{
  "tailwind": { "css": "src/index.css", "...": "..." },
  "theme": {
    "neutral": "slate",
    "primary": "blue",
    "radius": "medium",
    "sizing": "medium",
    "font": { "text": "system", "heading": "inherit", "mono": "system-mono" },
    "advanced": {
      // optional, hand-edited; absent by default
      // "darkBackground": "#0a0a0a",
      // "contrastTargets": [1.05, 1.1, 1.2, 1.4, 2, 3, 4.5, 6, 8, 11, 17]
    }
  }
}
```

Re-running `init` reuses this section unless `--reconfigure` is passed. A new `@webscit/cli theme` subcommand regenerates the CSS files from this section (overwriting), useful when the user edits the JSON or upgrades `@webscit/tokens`.

## Architecture

The generator lives inside the existing `@webscit/tokens` package (no new package).

```
packages/tokens/
  src/
    defaults/
      neutrals.ts       # name → key color
      primaries.ts      # name → key color
      fonts.ts          # name → CSS font-family stack
    generate/
      config.ts         # ThemeConfig type + parse/validate from components.json
      palettes.ts       # Leonardo wrapper: key color + role → 11-step scale (light + dark)
      tokens.ts         # ThemeConfig → DTCG JSON document (light + dark)
      css.ts            # DTCG JSON → CSS via Style Dictionary v4 (programmatic)
      index.ts          # generateTheme(config) → TokenBundle
    index.ts            # public exports
  build.mjs             # generateTheme(defaultThemeConfig()) → dist/{tokens,tokens-dark,theme}.css
```

The static JSON files currently in `packages/tokens/src/*.tokens.json` are removed; defaults live in code (`defaults/` + `generate/tokens.ts`). The package's `dist/` output (built by `build.mjs`) preserves today's CSS shape, used by Storybook and as a fallback if a consumer skips `init`.

## Public API

```ts
export type NeutralName = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone';
export type PrimaryName = 'blue' | 'indigo' | 'violet' | 'rose' | 'green' | 'amber' | 'cyan' | 'emerald';
export type FontName = 'system' | 'geometric-sans' | 'humanist-sans' | 'serif' | 'slab';
export type RadiusChoice = 'none' | 'small' | 'medium' | 'large' | 'full';
export type SizingChoice = 'small' | 'medium' | 'large';

export interface ThemeConfig {
  neutral: NeutralName;
  primary: PrimaryName;
  radius: RadiusChoice;
  sizing: SizingChoice;
  font: { text: FontName; heading: FontName | 'inherit'; mono: FontName | 'system-mono' };
  advanced?: {
    darkBackground?: string;
    contrastTargets?: number[]; // length 11
  };
}

export interface TokenBundle {
  tokensCss: string;       // light, @layer design-tokens
  tokensDarkCss: string;   // dark overrides under [data-theme="dark"], @layer design-tokens
  themeCss: string;        // base element styles, @layer theme
  configJson: string;      // serialized `theme` section for components.json
}

export function generateTheme(config: ThemeConfig): TokenBundle;
export function defaultThemeConfig(): ThemeConfig;

export const NEUTRAL_CHOICES: readonly NeutralName[];
export const PRIMARY_CHOICES: readonly PrimaryName[];
export const FONT_CHOICES: readonly FontName[];
```

## Token model

### Color palettes (Leonardo)

Each role (`primary`, `neutral`, `success`, `info`, `warning`, `destructive`) is generated as an 11-step scale at keys `{50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950}` using `@adobe/leonardo-contrast-colors`.

```ts
import { BackgroundColor, Color, Theme } from '@adobe/leonardo-contrast-colors';

const TARGET_RATIOS = [1.05, 1.1, 1.2, 1.4, 2, 3, 4.5, 6, 8, 11, 17];

const bg = new BackgroundColor({ name: 'background', colorKeys: [neutralKey], colorspace: 'OKLCH' });
const colors = ROLES.map(role =>
  new Color({ name: role, colorKeys: [keyFor(role)], colorspace: 'OKLCH', ratios: TARGET_RATIOS })
);

const lightTheme = new Theme({ colors, backgroundColor: bg, lightness: 100 });
const darkTheme  = new Theme({ colors, backgroundColor: bg, lightness: 8 });
```

`TARGET_RATIOS` and the dark `lightness` value are overridable via `advanced`.

Default key colors (Tailwind 500-ish anchors):

- **Neutrals:** slate `#64748b`, gray `#6b7280`, zinc `#71717a`, neutral `#737373`, stone `#78716c`
- **Primaries:** blue `#3b82f6`, indigo `#6366f1`, violet `#8b5cf6`, rose `#f43f5e`, green `#22c55e`, amber `#f59e0b`, cyan `#06b6d4`, emerald `#10b981`
- **Fixed roles** (not user-configurable in v1): success `#22c55e`, info = primary, warning `#f59e0b`, destructive `#ef4444`

### Semantic aliases

Single alias→step map applied to **both** light and dark Leonardo scales. Step semantics carry across modes (Leonardo flips the curve), so the same step number is the right pick in both contexts.

| Alias | Step |
|---|---|
| `--sct-color-background` | `neutral.50` |
| `--sct-color-foreground` | `neutral.950` |
| `--sct-color-muted` | `neutral.100` |
| `--sct-color-muted-foreground` | `neutral.600` |
| `--sct-color-border` | `neutral.200` |
| `--sct-color-input` | `neutral.200` |
| `--sct-color-ring` | `primary.500` |
| `--sct-color-primary` | `primary.600` |
| `--sct-color-primary-foreground` | `primary.50` |
| `--sct-color-secondary` | `neutral.100` |
| `--sct-color-secondary-foreground` | `neutral.900` |
| `--sct-color-accent` | `neutral.100` |
| `--sct-color-accent-foreground` | `neutral.900` |
| `--sct-color-destructive` | `destructive.600` |
| `--sct-color-destructive-foreground` | `destructive.50` |
| `--sct-color-success` | `success.600` |
| `--sct-color-success-foreground` | `success.50` |
| `--sct-color-warning` | `warning.500` |
| `--sct-color-warning-foreground` | `warning.950` |
| `--sct-color-info` | `info.600` |
| `--sct-color-info-foreground` | `info.50` |

`tokens.css` populates aliases from the **light** theme; `tokens-dark.css` populates the same aliases under `[data-theme="dark"]` from the **dark** theme.

### Sizing (one knob → spacing + font-size)

```css
:root {
  --sct-spacing: 0.25rem;        /* small=0.2rem, medium=0.25rem, large=0.3rem */
  --sct-font-size-base: 1rem;    /* small=0.875rem, medium=1rem, large=1.0625rem */

  /* spacing scale */
  --sct-space-0:  calc(var(--sct-spacing) * 0);
  --sct-space-1:  calc(var(--sct-spacing) * 1);
  --sct-space-2:  calc(var(--sct-spacing) * 2);
  --sct-space-3:  calc(var(--sct-spacing) * 3);
  --sct-space-4:  calc(var(--sct-spacing) * 4);
  --sct-space-5:  calc(var(--sct-spacing) * 5);
  --sct-space-6:  calc(var(--sct-spacing) * 6);
  --sct-space-8:  calc(var(--sct-spacing) * 8);
  --sct-space-10: calc(var(--sct-spacing) * 10);
  --sct-space-12: calc(var(--sct-spacing) * 12);
  --sct-space-16: calc(var(--sct-spacing) * 16);
  --sct-space-20: calc(var(--sct-spacing) * 20);
  --sct-space-24: calc(var(--sct-spacing) * 24);

  /* font size scale */
  --sct-font-size-xs:  calc(var(--sct-font-size-base) * 0.75);
  --sct-font-size-sm:  calc(var(--sct-font-size-base) * 0.875);
  /* --sct-font-size-base is the base var itself */
  --sct-font-size-lg:  calc(var(--sct-font-size-base) * 1.125);
  --sct-font-size-xl:  calc(var(--sct-font-size-base) * 1.25);
  --sct-font-size-2xl: calc(var(--sct-font-size-base) * 1.5);
  --sct-font-size-3xl: calc(var(--sct-font-size-base) * 1.875);
}
```

### Border radius

```css
:root {
  --sct-radius: 0.5rem;             /* none=0, small=0.25rem, medium=0.5rem, large=0.75rem */
  --sct-radius-sm:  calc(var(--sct-radius) * 0.5);
  --sct-radius-md:  var(--sct-radius);
  --sct-radius-lg:  calc(var(--sct-radius) * 1.5);
  --sct-radius-xl:  calc(var(--sct-radius) * 2);
  --sct-radius-full: 9999px;
}
```

Special cases handled in the generator:
- `radius: 'none'` → `--sct-radius: 0`; sm/md/lg/xl resolve to `0`; full stays `9999px`.
- `radius: 'full'` → all of sm/md/lg/xl emitted as `9999px` directly (no `calc()`).

### Border width

Kept in `px`, not user-configurable in v1:

```css
:root {
  --sct-border-width-1: 1px;
  --sct-border-width-2: 2px;
}
```

### Fonts

Each `FontName` maps to a CSS font-family stack baked into the generated CSS (no `@import`, no font loading).

```css
:root {
  --sct-font-family-text:    /* stack from FONT_CHOICES[textChoice] */;
  --sct-font-family-heading: var(--sct-font-family-text);  /* if heading='inherit'; else stack */
  --sct-font-family-mono:    /* mono stack */;
}
```

`theme.css` (in `@layer theme`) sets:

```css
@layer theme {
  html, :host {
    font-family: var(--sct-font-family-text);
    font-size: var(--sct-font-size-base);
  }
  h1, h2, h3, h4, h5, h6 { font-family: var(--sct-font-family-heading); }
  code, kbd, samp, pre   { font-family: var(--sct-font-family-mono); }
}
```

## CLI integration

### `init` (existing command, extended)

1. Locate `components.json` (existing behavior).
2. If `theme` section exists and no `--reconfigure`, use it as-is.
3. Otherwise run the six interactive prompts (or default config if non-interactive / `--yes`).
4. Write the answers into `components.json` under `theme`.
5. Call `generateTheme(config)` from `@webscit/tokens`.
6. Write `tokens.css`, `tokens-dark.css`, `theme.css` next to the CSS entry (existing `init.ts` behavior, sourcing from the generator instead of a static `TokenBundle` import).
7. Inject `@import` lines into the CSS entry (existing behavior).

Existing-file behavior matches today: `init` skips files that already exist on disk and only injects missing `@import` lines.

### `theme` (new subcommand)

- Reads `theme` section from `components.json`.
- Calls `generateTheme(config)`.
- Writes the three CSS files, **overwriting** existing files (this is the explicit regenerate path).
- Errors with a clear message if the `theme` section is missing.
- `--config <path>` flag for a non-default `components.json` location.

### Dependency impact

- `@webscit/cli` adds `@inquirer/prompts` (small dep, currently CLI has only Node built-ins).
- `@webscit/tokens` adds `@adobe/leonardo-contrast-colors` and promotes Style Dictionary v4 from devDep to runtime dep (used programmatically by `generate/css.ts`).
- CLI imports the generator from `@webscit/tokens` (already a dep based on `init.ts`).

## Component migration (two phases)

### Phase A — generator + alias compatibility

The generator's emitted token names are a superset of today's tokens. All current aliases continue to resolve to reasonable values. Two compatibility shims to avoid touching components in this phase:

- `--sct-font-family-sans` is emitted as a copy of `--sct-font-family-text`.
- `--sct-font-size-base` becomes `1rem` × sizing factor (was `13px`); component CSS using this token re-renders slightly larger but visually consistent.

Acceptance for Phase A: components render at the new rem-based sizes; existing Vitest browser tests pass; visual smoke check in Storybook.

### Phase B — component CSS audit

One component per commit (ideally). For each component in `packages/registry/src/components/`:

1. Replace any raw `px` length (except `border-width`) with a token (`--sct-space-*`, `--sct-font-size-*`, `--sct-radius-*`). Add a new token to the generator if none fits, rather than inlining.
2. Replace any raw `rem` length with the closest existing scale token.
3. Drop `--sct-font-family-sans` references in favor of `--sct-font-family-text` (or `-heading` for heading elements). Remove the compatibility shim once all components are migrated.
4. Verify scale-step references match the new semantic aliases.
5. Confirm tests pass.

Components likely needing the most attention: `button`, `input`, `select`, `dialog`, `sidebar`, `table`, `combobox`, `command`, `pagination`. Layout-only components (`card`, `aspect-ratio`, `separator`) likely trivial.

Phase B is sequenced after Phase A is merged. Scope is purely consistency with the new vocabulary; no behavior changes.

## Testing

### `packages/tokens` (vitest, node)

- `generate/palettes.test.ts` — Leonardo wrapper produces 11 steps per role, light + dark, monotonic contrast against background. Snapshot the hex outputs for the default config.
- `generate/tokens.test.ts` — `ThemeConfig` → DTCG JSON: shape conforms to W3C DTCG, all required aliases present, alias→step map is identical light vs. dark, `advanced` overrides take effect.
- `generate/css.test.ts` — DTCG → CSS: contains `@layer design-tokens`, `[data-theme="dark"]` selector, `calc()` for spacing/radius/font-size, no raw px in spacing/font-size, border widths in px, layer-order declaration at top of `tokens.css`.
- `generate/index.test.ts` — `generateTheme(defaultThemeConfig())` matches committed snapshots in `packages/tokens/dist/__snapshots__/`.
- `defaults.test.ts` — every name in `NEUTRAL_CHOICES` / `PRIMARY_CHOICES` / `FONT_CHOICES` resolves to a valid generator config.

### `packages/cli` (vitest)

- Extend `init.test.ts`: `theme` section pre-existing → no prompts, generated CSS reflects config; no section + `--yes` → default config written and applied.
- New `theme.test.ts`: regenerates files from `components.json` (overwrites); errors clearly if `theme` section missing.
- Existing smoke test stays green.

### `packages/registry` (vitest browser)

- Phase A: existing `*.test.tsx` continue to pass. Add one smoke test asserting a key token resolves to a non-empty value via `getComputedStyle`.
- Phase B: per-component PRs keep their own tests green.

## Build

`packages/tokens/build.mjs` becomes:

```js
import { generateTheme, defaultThemeConfig } from './src/index.ts';
const bundle = generateTheme(defaultThemeConfig());
writeFile('dist/tokens.css', bundle.tokensCss);
writeFile('dist/tokens-dark.css', bundle.tokensDarkCss);
writeFile('dist/theme.css', bundle.themeCss);
```

The static `src/*.tokens.json` files are removed. Style Dictionary is invoked programmatically inside `generate/css.ts` rather than via a `config.json`.

## Storybook (optional, v1+)

A "Theme Playground" page that renders `<select>` controls for each `ThemeConfig` choice, calls `generateTheme()` in-browser (Style Dictionary v4 works in browsers), and applies the generated CSS via a `<style>` tag — gives a live preview without restarting Storybook. Implementation deferred unless needed for documentation polish.
