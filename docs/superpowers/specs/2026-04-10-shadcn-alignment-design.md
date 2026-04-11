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

---

## Audit Results

### `menu` (vs shadcn `dropdown-menu`)

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Menu` | `DropdownMenu` | ⚠️ accepted deviation — cleaner name for our API |
| `MenuTrigger` | ✅ present | `DropdownMenuTrigger` | ✅ match (renamed) |
| `MenuContent` | ✅ present | `DropdownMenuContent` | ✅ match (renamed) |
| `MenuItem` | ✅ present | `DropdownMenuItem` | ✅ match (renamed) |
| `MenuSeparator` | ✅ present | `DropdownMenuSeparator` | ✅ match (renamed) |
| `MenuLabel` | ✅ present | `DropdownMenuLabel` | ✅ match (renamed) |
| `MenuCheckboxItem` | ✅ present | `DropdownMenuCheckboxItem` | ✅ match (renamed) |
| `MenuRadioGroup` | ✅ present | `DropdownMenuRadioGroup` | ✅ match (renamed) |
| `MenuRadioItem` | ✅ present | `DropdownMenuRadioItem` | ✅ match (renamed) |
| `MenuGroup` | ✅ added | `DropdownMenuGroup` | 🔧 fixed |
| `MenuShortcut` | ✅ added | `DropdownMenuShortcut` | 🔧 fixed |
| `MenuSub` | ✅ added | `DropdownMenuSub` | 🔧 fixed |
| `MenuSubTrigger` | ✅ added | `DropdownMenuSubTrigger` | 🔧 fixed |
| `MenuSubContent` | ✅ added | `DropdownMenuSubContent` | 🔧 fixed |
| `MenuPortal` | not exported (handled in `MenuContent`) | `DropdownMenuPortal` | ⚠️ accepted deviation |
| `inset` on `MenuItem` | ✅ added | ✅ present | 🔧 fixed |
| `asChild` | not present | present | ❌ intentional skip (Radix pattern) |

### `select` (vs shadcn `select`)

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Select` | `Select` | ✅ match |
| `SelectTrigger` | ✅ present | `SelectTrigger` | ✅ match |
| `SelectValue` | ✅ present | `SelectValue` | ✅ match |
| `SelectContent` | ✅ present | `SelectContent` | ✅ match |
| `SelectItem` | ✅ present | `SelectItem` | ✅ match |
| `SelectSeparator` | ✅ present | `SelectSeparator` | ✅ match |
| `SelectLabel` | ✅ present | `SelectLabel` | ✅ match |
| `SelectGroup` | ✅ added | `SelectGroup` | 🔧 fixed |
| `SelectScrollUpButton` | ✅ added (via `BaseSelect.ScrollUpArrow`) | `SelectScrollUpButton` | 🔧 fixed |
| `SelectScrollDownButton` | ✅ added (via `BaseSelect.ScrollDownArrow`) | `SelectScrollDownButton` | 🔧 fixed |
| `SelectItemText` | inlined inside `SelectItem` | `SelectItemText` exported separately | ⚠️ accepted deviation — simpler consumer API |
| `SelectPortal` | not exported (handled in `SelectContent`) | `SelectPortal` | ⚠️ accepted deviation |
| `asChild` | not present | present | ❌ intentional skip (Radix pattern) |

### `dialog` (vs shadcn `dialog`)

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Dialog` | `Dialog` | ✅ match |
| `DialogTrigger` | ✅ present | `DialogTrigger` | ✅ match |
| `DialogPortal` | ✅ present | `DialogPortal` | ✅ match |
| `DialogOverlay` | ✅ present (via `BaseDialog.Backdrop`) | `DialogOverlay` | ✅ match (renamed primitive) |
| `DialogContent` | ✅ present | `DialogContent` | ✅ match |
| `DialogHeader` | ✅ present | `DialogHeader` | ✅ match |
| `DialogFooter` | ✅ present | `DialogFooter` | ✅ match |
| `DialogTitle` | ✅ present | `DialogTitle` | ✅ match |
| `DialogDescription` | ✅ present | `DialogDescription` | ✅ match |
| `DialogClose` | ✅ present | `DialogClose` | ✅ match |
| Built-in close X button in `DialogContent` | not included | included | ⚠️ accepted deviation — consumer adds their own |
| `asChild` | not present | present | ❌ intentional skip (Radix pattern) |

### `alert-dialog` (vs shadcn `alert-dialog`)

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `AlertDialog` | `AlertDialog` | ✅ match |
| `AlertDialogTrigger` | ✅ present | `AlertDialogTrigger` | ✅ match |
| `AlertDialogOverlay` | ✅ present (via `BaseAlertDialog.Backdrop`) | `AlertDialogOverlay` | ✅ match (renamed primitive) |
| `AlertDialogContent` | ✅ present | `AlertDialogContent` | ✅ match |
| `AlertDialogHeader` | ✅ present | `AlertDialogHeader` | ✅ match |
| `AlertDialogFooter` | ✅ present | `AlertDialogFooter` | ✅ match |
| `AlertDialogTitle` | ✅ present | `AlertDialogTitle` | ✅ match |
| `AlertDialogDescription` | ✅ present | `AlertDialogDescription` | ✅ match |
| `AlertDialogAction` | ✅ present | `AlertDialogAction` | ✅ match |
| `AlertDialogCancel` | ✅ present (via `BaseAlertDialog.Close`) | `AlertDialogCancel` | ✅ match |
| `AlertDialogPortal` | not exported (handled in `AlertDialogContent`) | `AlertDialogPortal` | ⚠️ accepted deviation |
| `asChild` | not present | present | ❌ intentional skip (Radix pattern) |

### `input`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Input` | `Input` | ✅ match |
| Prop type | `React.ComponentProps<"input">` | `React.ComponentProps<"input">` | ✅ match |
| `data-slot` | `"input"` | `"input"` | ✅ match |
| Underlying element | `InputPrimitive` from `@base-ui/react/input` | `InputPrimitive` from `@base-ui/react/input` | 🔧 fixed (was plain `<input>`) |
| Sub-components | none (not needed) | none | ✅ match |

### `textarea`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Textarea` | `Textarea` | ✅ match |
| Prop type | `React.ComponentProps<"textarea">` | `React.ComponentProps<"textarea">` | ✅ match |
| `data-slot` | `"textarea"` | `"textarea"` | ✅ match |
| Underlying element | native `<textarea>` | native `<textarea>` | ✅ match |
| Sub-components | none (not needed) | none | ✅ match |

### `checkbox`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Checkbox` | `Checkbox` | ✅ match |
| Prop type | `React.ComponentProps<typeof BaseCheckbox.Root>` | `CheckboxPrimitive.Root.Props` (same type) | ✅ match |
| `data-slot` root | `"checkbox"` | `"checkbox"` | ✅ match |
| `data-slot` indicator | `"checkbox-indicator"` | `"checkbox-indicator"` | ✅ match |
| Indicator inlined | yes (`BaseCheckbox.Indicator`) | yes (`CheckboxPrimitive.Indicator`) | ✅ match |
| Sub-components | none exported | none exported | ✅ match |
| `asChild` | not present | not present (Base UI) | ✅ match |

### `radio-group`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `RadioGroup` | `RadioGroup` | ✅ match |
| `RadioGroupItem` export | ✅ added | `RadioGroupItem` | 🔧 fixed (was missing) |
| `RadioGroupItem` prop type | `React.ComponentProps<typeof BaseRadio.Root>` | `RadioPrimitive.Root.Props` (same type) | ✅ match |
| `data-slot` root | `"radio-group"` | `"radio-group"` | ✅ match |
| `data-slot` item | `"radio-group-item"` | `"radio-group-item"` | ✅ match |
| `data-slot` indicator | `"radio-group-indicator"` | `"radio-group-indicator"` | ✅ match |
| `orientation` prop on root | `"horizontal" \| "vertical"` via `data-orientation` | not present (shadcn) | ⚠️ accepted deviation — useful CSS hook |
| Inlined `Indicator` in item | ✅ present | ✅ present | ✅ match |

### `switch`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Switch` | `Switch` | ✅ match |
| Prop type | `React.ComponentProps<typeof BaseSwitch.Root> & { size? }` | `SwitchPrimitive.Root.Props & { size? }` (same type) | ✅ match |
| `data-slot` root | `"switch"` | `"switch"` | ✅ match |
| `data-slot` thumb | `"switch-thumb"` | `"switch-thumb"` | ✅ match |
| `size` prop | ✅ added `"sm" \| "default"` | `"sm" \| "default"` | 🔧 fixed (was missing) |
| `data-size` attribute | ✅ added | ✅ present | 🔧 fixed |
| Thumb inlined | ✅ present | ✅ present | ✅ match |

### `slider`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Slider` | `Slider` | ✅ match |
| Prop type | `React.ComponentProps<typeof BaseSlider.Root>` | `SliderPrimitive.Root.Props` (same type) | ✅ match |
| Redundant `className?` re-declaration | removed | not present | 🔧 fixed |
| `data-slot` root | `"slider"` | `"slider"` | ✅ match |
| `data-slot` control | `"slider-control"` | not present on Control (shadcn omits) | ⚠️ accepted deviation — useful CSS hook |
| `data-slot` track | `"slider-track"` | `"slider-track"` | ✅ match |
| `data-slot` range | `"slider-range"` | `"slider-range"` | ✅ match |
| `data-slot` thumb | `"slider-thumb"` | `"slider-thumb"` | ✅ match |
| `thumbAlignment` | ✅ added `"edge"` | `"edge"` | 🔧 fixed (was missing) |
| Multiple thumbs from value array | ✅ fixed | ✅ present | 🔧 fixed (was single thumb) |
| Thumb placement | inside `Control` (alongside `Track`) | inside `Control` (alongside `Track`) | ✅ match |

### `label`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Label` | `Label` | ✅ match |
| Prop type | `React.ComponentProps<"label">` | `React.ComponentProps<"label">` | ✅ match |
| `data-slot` | `"label"` | `"label"` | ✅ match |
| Underlying element | native `<label>` | native `<label>` | ✅ match |

### `badge`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Badge` | `Badge` | ✅ match |
| Underlying element | `<span>` | `<span>` (via `useRender`) | ✅ match |
| `data-slot` | `"badge"` | `"badge"` | ✅ match |
| Prop type | `React.ComponentProps<"span">` | `useRender.ComponentProps<"span">` | ✅ match (equivalent) |
| `variant` prop | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | 🔧 fixed (added `ghost`, `link`) |
| `data-variant` attribute | ✅ present | via state slot | ✅ match |
| `asChild` / `render` | not present | `render` prop (Base UI pattern) | ⚠️ accepted deviation — our convention omits render prop |

### `card`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Card` | `Card` | ✅ match |
| `CardHeader` | ✅ present | `CardHeader` | ✅ match |
| `CardTitle` | ✅ present | `CardTitle` | ✅ match |
| `CardDescription` | ✅ present | `CardDescription` | ✅ match |
| `CardContent` | ✅ present | `CardContent` | ✅ match |
| `CardFooter` | ✅ present | `CardFooter` | ✅ match |
| `CardAction` | ✅ added | `CardAction` | 🔧 fixed (was missing) |
| `size` prop on `Card` | ✅ added `"default" \| "sm"` | `"default" \| "sm"` | 🔧 fixed (was missing) |
| `data-size` attribute | ✅ added | ✅ present | 🔧 fixed |
| `data-slot` root | `"card"` | `"card"` | ✅ match |

### `separator`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Separator` | `Separator` | ✅ match |
| Underlying element | native `<div>` | `@base-ui/react/separator` primitive | ⚠️ accepted deviation — native div with manual ARIA is simpler for a decorative separator |
| `orientation` prop | `"horizontal" \| "vertical"` | `"horizontal" \| "vertical"` | ✅ match |
| `decorative` prop | ✅ present, controls `role`/`aria-orientation` | not present (shadcn v4 Base UI primitive handles ARIA internally) | ⚠️ accepted deviation — `decorative` adds useful semantic control |
| `data-slot` | `"separator"` | `"separator"` | ✅ match |
| `data-orientation` | ✅ present | ✅ present (via Base UI) | ✅ match |

### `skeleton`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Skeleton` | `Skeleton` | ✅ match |
| Underlying element | `<div>` | `<div>` | ✅ match |
| Prop type | `React.ComponentProps<"div">` | `React.ComponentProps<"div">` | 🔧 fixed (was `React.HTMLAttributes<HTMLDivElement>`) |
| `data-slot` | `"skeleton"` | `"skeleton"` | ✅ match |
| Sub-components | none | none | ✅ match |

### `alert`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| Root export | `Alert` | `Alert` | ✅ match |
| `AlertTitle` | ✅ present | `AlertTitle` | ✅ match |
| `AlertDescription` | ✅ present | `AlertDescription` | ✅ match |
| `AlertAction` | ✅ added | `AlertAction` | 🔧 fixed (was missing) |
| `variant` prop | `"default" \| "destructive"` | `"default" \| "destructive"` | ✅ match |
| `data-slot` root | `"alert"` | `"alert"` | ✅ match |
| `role="alert"` | ✅ present | ✅ present | ✅ match |

### `toast`

Custom extension — shadcn v4 removed this component (replaced with `sonner`). Kept intentionally as scientific UIs don't use sonner. No audit performed.
