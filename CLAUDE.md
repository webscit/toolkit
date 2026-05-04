# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

`@webscit/toolkit` is a themable React component library for scientific-domain UIs. Components are distributed **shadcn-style** (copy-into-project, not a published npm package). Styling uses plain CSS with `@scope` rules and W3C design tokens—no Tailwind, no runtime JS for styling.

## Monorepo Structure

```
packages/tokens/      # W3C DTCG JSON tokens → Style Dictionary v4 → CSS custom properties
packages/registry/    # Component source (.tsx + .css) + registry manifest build
packages/cli/         # Thin CLI wrapper that delegates to `npx shadcn@latest add`
apps/docs/            # Storybook documentation (uses @webscit/tokens and @webscit/registry)
```

Package manager: **npm workspaces** (no pnpm/yarn).

## Commands

```bash
# Root — runs all workspaces
npm run build         # build all packages
npm run test          # run all tests
npm run lint          # ESLint (TypeScript rules only, flat config)
npm run typecheck     # tsc --noEmit across all packages

# packages/tokens
npm run build -w packages/tokens    # Style Dictionary → dist/tokens.css + dist/tokens-dark.css

# packages/registry
npm run build -w packages/registry  # tsc + copy CSS + build-registry.mjs
npm run test -w packages/registry   # vitest (browser mode via Playwright/Chromium)

# Run a single test file
cd packages/registry && npx vitest run src/components/button/button.test.tsx

# apps/docs
npm run dev -w apps/docs    # Storybook dev server on :6006
npm run build -w apps/docs  # static Storybook build → storybook-static/
```

## Testing

Tests run in **Vitest browser mode** (Playwright Chromium). There is no jsdom. Test files live alongside source as `*.test.tsx`. Use `vitest-browser-react`'s `render` and the `expect.element()` async API (not `@testing-library/react`'s `screen`).

```tsx
import { render } from "vitest-browser-react";
const screen = await render(<Button>Click</Button>);
await expect.element(screen.getByRole("button")).toBeInTheDocument();
```

## Component Conventions

Every component in `packages/registry/src/components/<name>/` has:

- `<name>.tsx` — React component
- `<name>.css` — scoped styles
- `registry.meta.json` — title, description, dependencies, registryDependencies
- `<name>.test.tsx` — Vitest browser tests

**CSS scoping:** Each component uses a single stable scope-anchor class `sct-<name>` on the root element and an `@scope (.sct-<name>) { ... }` block in CSS. Variants/sizes use `data-variant` / `data-size` attributes. States use Base UI's injected `data-*` attributes (`data-disabled`, `data-checked`, etc.). No Radix `data-[state=*]` syntax.

**No `cn()` / `clsx`:** Class composition is manual:

```tsx
className={`sct-button${className ? ` ${className}` : ''}`}
```

**Base UI primitives:** Use `@base-ui/react` components where they exist (Button, Checkbox, Radio, Switch, Select, Dialog, Menu, Tabs, Tooltip). Use native HTML for layout-only components (Label, Card, Badge, Alert).

## Design Token System

Tokens are **generated** at build time, not stored as static JSON. The pipeline lives in `packages/tokens/src/generate/`:

- `defaults/` — curated neutral, primary, and font defaults.
- `generate/config.ts` — `ThemeConfig` shape + `defaultThemeConfig()` + `parseThemeConfig()`.
- `generate/palettes.ts` — Leonardo-based 11-step color scale generation per role.
- `generate/tokens.ts` — assembles W3C DTCG documents (light + dark) from a `ThemeConfig`.
- `generate/css.ts` — feeds the DTCG documents through Style Dictionary, emits layered CSS.
- `generate/index.ts` — `generateTheme(config)` composition that returns a `TokenBundle` (`tokensCss`, `tokensDarkCss`, `themeCss`).

Default consumer flow: the CLI's `init` command persists a `theme` section in `components.json`, generates the bundle via `generateTheme(config)`, and copies the three CSS files into the project. `npx @webscit/toolkit theme` regenerates after edits or version bumps.

Style Dictionary outputs:

- `dist/tokens.css` — `@layer design-tokens { :root { --sct-* } }` (light theme) + `@layer design-tokens, theme;` ordering declaration
- `dist/tokens-dark.css` — `@layer design-tokens { [data-theme="dark"] { --sct-* } }` (dark overrides)
- `dist/theme.css` — `@layer theme { html, :host { font-family: var(--sct-font-family-text) } }` (base element styles)

**CSS layer contract:** Tokens live in `@layer design-tokens` (lowest priority); the default element styles live in `@layer theme`. The layer order `design-tokens, theme` is declared at the top of `tokens.css`. Consuming apps that use their own `@layer` declarations **must** import `tokens.css` before any other layered stylesheet, or explicitly redeclare the layer order (`@layer design-tokens, theme, <app-layers...>;`) before their own layers. Unlayered consumer rules always win over both layers regardless of import order.

Token names are kebab-case prefixed `sct-`, e.g. `--sct-color-primary`. Dark mode is toggled by setting `data-theme="dark"` on `<html>`.

## Registry Build

`packages/registry/scripts/build-registry.mjs` reads all component directories and produces:

- `registry/<name>.json` — per-component file with inlined source content
- `registry/registry.json` — index manifest (shadcn-compatible schema)

The `registry/` directory is git-ignored at the root level (`.gitignore` uses `/registry/` to avoid matching `packages/registry/`).

## CLI

`packages/cli/src/index.ts` wraps `npx shadcn@latest add --registry https://webscit.github.io/toolkit/r <components>`. It has no runtime dependencies beyond Node built-ins.

## TypeScript

All packages extend `tsconfig.base.json` at root (`ES2022`, `ESNext` modules, `strict`, `noUncheckedIndexedAccess`). Packages use `"files": []` in tsconfig when there are no source files yet, to avoid "no input files" errors.
