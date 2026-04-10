# Shadcn Alignment Design

**Date:** 2026-04-10
**Branch:** ft/align-component

## Goal

Align `packages/registry/` with the shadcn v4 base UI component set by:
1. Adding all missing shadcn components (coverage gap)
2. Auditing and fixing existing component APIs against shadcn v4 (best-effort parity)

Token additions in `packages/tokens/` are made as needed to support new components.

---

## Scope

### New components to add (~20)

All from shadcn v4 `apps/v4/registry/bases/base/ui`, excluding: calendar, carousel, chart, avatar, input-otp, sonner (not relevant to scientific UIs or duplicates).

### Existing custom extensions (keep, no shadcn equivalent)

- `checkbox-group` — multi-checkbox convenience wrapper
- `radio` — standalone radio item (shadcn only ships `radio-group`)
- `toast` — shadcn v4 dropped this in favour of `sonner` (which we drop)

### Naming alignment

- Our `menu` is kept and its API aligned to shadcn's `dropdown-menu`
- New `context-menu` and `menubar` added as siblings

---

## Architecture & Conventions

Every new component lives in `packages/registry/src/components/<name>/` and must include:

| File | Purpose |
|---|---|
| `<name>.tsx` | React component |
| `<name>.css` | `@scope (.sct-<name>) { }` CSS block |
| `registry.meta.json` | title, description, dependencies, registryDependencies |
| `<name>.test.tsx` | Vitest browser-mode tests (`vitest-browser-react`) |

**CSS conventions:** single scope-anchor class `sct-<name>` on root element; variants via `data-variant`/`data-size`; states via Base UI injected `data-*` attributes. No Tailwind, no CVA, no `cn()`.

**Class composition:**
```tsx
className={`sct-button${className ? ` ${className}` : ''}`}
```

**Base UI primitives** are used wherever available. Native HTML is used for layout/display-only components.

---

## New Components

### Group 1 — Native HTML / trivial (no new tokens expected)

| Component | Implementation note |
|---|---|
| `aspect-ratio` | `div` with padding-bottom ratio trick |
| `breadcrumb` | `nav` + `ol` + `li` chain |
| `direction` | React context provider setting `dir` attribute |
| `empty` | `div` with slots for icon, title, description |
| `item` | Generic styled `div` primitive (list row) |
| `kbd` | `<kbd>` HTML element with styling |
| `native-select` | Native `<select>` with CSS styling |
| `pagination` | `nav` + button list |
| `spinner` | CSS animated element (border-radius or SVG) |

### Group 2 — Native HTML / moderate (new tokens likely needed)

| Component | Token additions likely needed |
|---|---|
| `navigation-menu` | nav background, hover state colors |
| `command` | search input bg, item hover, group label colors |
| `progress` | track color, fill color, height |

### Group 3 — Base UI primitives (new tokens likely needed)

| Component | Base UI primitive | Token additions likely needed |
|---|---|---|
| `context-menu` | `@base-ui/react/menu` | reuses existing menu tokens |
| `hover-card` | `@base-ui/react/popover` | reuses popover tokens |
| `menubar` | `@base-ui/react/menu` | menubar bg, item spacing |
| `drawer` | `@base-ui/react/dialog` | drawer width/height, slide animation |
| `toggle` | `@base-ui/react/toggle-group` | toggle bg, active/pressed state |
| `toggle-group` | `@base-ui/react/toggle-group` | group border, gap |
| `combobox` | `@base-ui/react/select` (with search input in trigger) | reuses input + select tokens |

---

## Token Updates

When a new component needs design values not already present in `packages/tokens/src/`:
- Primitive values → `base.tokens.json`
- Semantic aliases (light theme) → `semantic.tokens.json`
- Dark overrides → `semantic-dark.tokens.json`

Token names follow the `--sct-*` kebab-case convention, e.g. `--sct-progress-track-color`.

---

## Alignment Audit (Phase 2)

After all new components are added, each existing component is audited against its shadcn v4 counterpart.

### Audit dimensions

1. **Prop names** — same names for equivalent props
2. **Variant/size values** — same string literals for equivalent variants
3. **Sub-component exports** — same slot/compound component structure
4. **Missing props** — props shadcn exposes that we silently omit

### Audit output

Per-component table:

| Prop / slot | Our value | Shadcn value | Status |
|---|---|---|---|
| `variant` | `"default" \| "outline"…` | `"default" \| "outline"…` | ✅ |
| `size` | `"default" \| "sm" \| "lg"` | adds `"icon-xs"` etc. | ⚠️ deviation |
| `asChild` | not present | present (Radix pattern) | ❌ intentional skip |

### Acceptable deviations (not fixed)

- Styling implementation differences (data-attributes vs className/CVA)
- Props that don't apply because we use Base UI instead of Radix (e.g., no `asChild`)
- Tailwind-only props with no CSS equivalent

### Components flagged for special attention

- `menu` → must fully match `dropdown-menu` API
- `select` → shadcn v4 uses Base UI; subtle differences likely
- `dialog` / `alert-dialog` → verify sub-component export names match

---

## Implementation Approach

**Phase 1 — New components** (Group 1 → Group 2 → Group 3, increasing complexity)
Each component is fully implemented with `.tsx`, `.css`, `registry.meta.json`, and `.test.tsx` before moving to the next.

**Phase 2 — Alignment audit**
Systematic per-component review; fix deviations that are not intentional; document accepted deviations.

**Skipped components:** calendar, carousel, chart, avatar, input-otp, sonner.
