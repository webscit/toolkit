# @webscit/toolkit — Design Specification

**Date:** 2026-04-01
**Status:** Approved

---

## 1. Purpose

`@webscit/toolkit` is a themable React component library for scientific-domain web applications. It delivers accessible, VS Code-inspired UI components that consumers install per-project (shadcn-style), styled with plain CSS using `@scope` rules and a build-time design token system. There is no Tailwind dependency and no runtime JavaScript for styling.

---

## 2. Core Constraints

| Constraint | Decision |
|---|---|
| Package name | `@webscit/toolkit` |
| CSS class / token prefix | `sct` |
| Component primitives | Base UI (`@base-ui-components/react`) where available; native HTML otherwise |
| Styling approach | Plain `.css` files with `@scope` rules |
| Design tokens | W3C DTCG JSON → Style Dictionary v4 → CSS custom properties |
| Runtime JS for tokens | None — all token computation is at build time |
| Tailwind | Not used anywhere |
| Component delivery | Copy-into-project via shadcn-compatible CLI + custom registry |
| Registry URL | `https://webscit.github.io/toolkit` |
| Package manager | npm workspaces |

---

## 3. Repository Structure

```
webscit-toolkit/               # monorepo root (npm workspaces)
├── packages/
│   ├── tokens/                # Design token definitions + Style Dictionary build
│   └── registry/              # Component source files + registry manifest
└── apps/
    └── docs/                  # Storybook documentation app
```

---

## 4. Styling: `@scope` + Plain CSS

### Rationale
- `@scope` is a W3C standard (baseline 2024, Chrome 118+, Firefox 128+, Safari 17.4+)
- Zero build-tooling dependency — a plain `import './button.css'` works in any modern bundler
- Scoping is enforced by the browser CSS engine, not a hash transform
- Scope boundaries allow the browser to skip rule evaluation outside the scope root

### Anatomy of a component style file

```css
@scope (.sct-button) {
  :scope {
    display: inline-flex;
    align-items: center;
    background-color: var(--sct-color-primary);
    color: var(--sct-color-primary-foreground);
    border-radius: var(--sct-radius-md);
  }

  :scope[data-variant="destructive"] { /* variant */ }
  :scope[data-size="sm"]             { /* size    */ }
  :scope[data-disabled]              { /* state via Base UI data attributes */ }
}
```

### Alpha color values
Tailwind's `/opacity` suffix (`bg-primary/90`) maps to CSS `color-mix()`:
```css
/* Tailwind: hover:bg-primary/90 */
:scope:hover {
  background-color: color-mix(in srgb, var(--sct-color-primary) 90%, transparent);
}
```

### Naming conventions
- **Scope anchor**: single stable class on the component root — `sct-button`, `sct-input`, etc.
- **Variants/sizes**: `data-variant` / `data-size` attributes on the root element
- **States**: Base UI's injected `data-*` attributes — `data-disabled`, `data-checked`, `data-open`, `data-selected`, `data-highlighted` (no `data-[state=*]` Radix syntax)
- **Child elements**: descendant selectors inside the `@scope` block

### No `cn()` / `tailwind-merge`
```tsx
className={`sct-button${className ? ` ${className}` : ''}`}
```

---

## 5. Design Token System

### First theme: VS Code-inspired
The default token values are taken directly from VS Code's **Default Light Modern** (light) and **Default Dark Modern** (dark) themes. This gives the library an immediately recognisable VS Code aesthetic without requiring a runtime adapter.

Key mappings (light → dark):
- Primary: `#0078d4` → `#0e70c0` (VS Code button background)
- Background: `#ffffff` → `#1e1e1e` (VS Code editor background)
- Foreground: `#000000` → `#d4d4d4` (VS Code editor foreground)
- Surface: `#f3f3f3` → `#252526` (VS Code sidebar background)
- Border: `#8a8a8a` → `#3c3c3c` (VS Code input border)
- Focus ring: `#0090f1` → `#007fd4` (VS Code focus border)

### Format
Tokens are defined in [W3C Design Tokens Community Group (DTCG)](https://www.w3.org/community/design-tokens/) JSON format and processed by [Style Dictionary v4](https://styledictionary.com/).

### Token layers

```
base tokens          →  primitive palette, type scale, spacing scale
    ↓
semantic tokens      →  role-based (--sct-color-primary, --sct-surface-background)
    ↓
component tokens     →  component-level overrides (--sct-button-radius)
```

### Algorithm-based color derivation
Semantic colors are derived from base palette entries via Style Dictionary transforms using `@tokens-studio/sd-transforms`. Dark theme tokens are declared as a separate override file — no runtime JS.

### Build outputs from Style Dictionary

| Output | File | Consumer |
|---|---|---|
| CSS custom properties (light) | `dist/tokens.css` | React apps — import once at root |
| CSS custom properties (dark) | `dist/tokens-dark.css` | Override with `[data-theme="dark"]` |
| Figma Variables | `dist/tokens.figma.json` | Figma via Tokens Studio plugin |
| Penpot | `dist/tokens.penpot.css` | Penpot CSS variables import |

### Token naming
```css
:root {
  --sct-color-primary: #0078d4;
  --sct-color-primary-foreground: #ffffff;
  --sct-radius-md: 4px;
  --sct-space-4: 1rem;
}
```

### Theming
A consumer overrides any token at any cascade level:
```css
[data-theme="custom"] {
  --sct-color-primary: hotpink;
}
```

---

## 6. Component Model

### Delivery: copy-into-project
```sh
npx @webscit/toolkit add button
```
Copies `button.tsx` + `button.css` into the consumer's project. The consumer owns and can modify the files freely.

### Compatibility with shadcn CLI
The project hosts a shadcn-compatible registry at `https://webscit.github.io/toolkit`. No CLI fork required. A thin wrapper `@webscit/toolkit` delegates to `npx shadcn@latest add --registry https://webscit.github.io/toolkit`.

### Component file structure
```
components/
└── button/
    ├── button.tsx         # React component (Base UI or native HTML)
    ├── button.css         # @scope styles
    ├── button.test.tsx    # Vitest tests
    └── registry.meta.json # shadcn registry metadata
```

### CSS translation rule
All component CSS is derived by translating shadcn v4 Tailwind classes into equivalent plain CSS properties, referencing `--sct-*` tokens instead of hardcoded values. This ensures visual parity with shadcn while eliminating Tailwind.

### Initial 17 core components

| Component | Primitive | Notes |
|---|---|---|
| Button | Base UI `button` | |
| Input | Native `<input>` | |
| Label | Native `<label>` | |
| Checkbox | Base UI `checkbox` | |
| Checkbox Group | Base UI `checkbox` (wrapper) | Groups checkboxes with legend |
| Radio | Base UI `radio-group` (item) | Individual radio item |
| Radio Group | Base UI `radio-group` | Root + Radio items |
| Switch | Base UI `switch` | |
| Select | Base UI `select` | |
| Textarea | Native `<textarea>` | |
| Dialog | Base UI `dialog` | |
| Menu | Base UI `menu` | Formerly "Dropdown Menu" |
| Tabs | Base UI `tabs` | |
| Card | Native HTML | No Base UI primitive |
| Badge | Native HTML | No Base UI primitive |
| Alert | Native HTML `role="alert"` | No Base UI primitive |
| Tooltip | Base UI `tooltip` | |

---

## 7. Build Tooling

| Tool | Version | Role |
|---|---|---|
| npm | 10+ | Monorepo package manager (workspaces) |
| TypeScript | 5+ | All packages |
| Vite | 6+ | docs app bundler |
| Style Dictionary | 4+ | Token build pipeline |
| @tokens-studio/sd-transforms | 1+ | DTCG parsing + color modifiers |
| Storybook | 8+ | Component documentation |
| Vitest | 2+ | Unit + browser component tests |
| @storybook/addon-a11y | 8+ | Accessibility checks in Storybook |

---

## 8. Out of Scope for v1

- Automated Figma component generation (Figma Code Connect, etc.)
- Dark/light mode toggle built into components (consumers handle via `data-theme` attribute)
- IE11 or legacy browser support
- CSS Modules as an alternative styling option
- VS Code webview runtime support
- Upstream diff automation tool
