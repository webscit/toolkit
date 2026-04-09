# New Components Design Spec

**Date:** 2026-04-09
**Scope:** Add 16 new components to @webscit/toolkit, matching shadcn's general-purpose API.

## Components

accordion, alert-dialog, button-group, collapsible, field, input-group, popover, resizable, scroll-area, separator, sheet, sidebar, skeleton, slider, toast (replaces "sonner" from the original list — built on Base UI Toast instead of the sonner library), table

## Implementation Strategy: Dependency-First

### Token Additions (first)

New semantic color tokens:

| Token | Purpose |
|---|---|
| `sct.color.success` / `sct.color.success-foreground` | Success states (toast, future use) |
| `sct.color.warning` / `sct.color.warning-foreground` | Warning states |
| `sct.color.info` / `sct.color.info-foreground` | Informational states |

New sidebar dimension tokens:

| Token | Default | Purpose |
|---|---|---|
| `sct.sidebar.width` | 16rem | Default sidebar width |
| `sct.sidebar.width-collapsed` | 3rem | Collapsed/icon-only width |

Primitive green/amber values go in `base.tokens.json`. Semantic aliases in `semantic.tokens.json` and `semantic-dark.tokens.json`.

### Dependency Graph

```
Layer 0 — Leaf components (no deps on other new components):
├── separator        (native <hr>/<div role="separator">)
├── skeleton         (native <div> + CSS animation)
├── scroll-area      (native HTML + CSS scrollbar styling)
├── table            (native <table> elements)
├── popover          (Base UI popover)
├── slider           (Base UI slider)
├── collapsible      (Base UI collapsible)
├── accordion        (Base UI accordion)
├── alert-dialog     (Base UI alert-dialog)
├── sheet            (Base UI dialog, side-sliding variant)
├── button-group     (native <div role="group">)
├── input-group      (native <div> composition)
├── resizable        (react-resizable-panels wrapper)
└── toast            (Base UI toast)

Layer 1 — Depends on Layer 0:
└── field            (uses separator, label; Base UI field + fieldset)

Layer 2 — Depends on Layers 0 + 1:
└── sidebar          (uses collapsible, sheet, separator, skeleton,
                      scroll-area, tooltip, button, input)
```

**Build order:** Tokens first → all Layer 0 (parallelizable) → field → sidebar.

## Component API Designs

All components follow existing conventions:
- `sct-<name>` scope-anchor class on root element
- `@scope (.sct-<name>) { ... }` in CSS
- `data-slot` attributes on every sub-component
- `data-variant` / `data-size` / `data-orientation` for variants
- Base UI `data-*` attributes for states
- No `cn()` / `clsx` — manual class composition: `` `sct-foo${className ? ` ${className}` : ''}` ``

### Separator

```tsx
export function Separator({ orientation = "horizontal", decorative = true, className, ...props })
// Renders <div role="separator"> (or role="none" if decorative)
// data-orientation="horizontal" | "vertical"
```

### Skeleton

```tsx
export function Skeleton({ className, ...props })
// Renders <div> with pulse/shimmer CSS animation
// CSS-only, no JS state
```

### Scroll Area

```tsx
export function ScrollArea({ className, children, ...props })
export function ScrollBar({ orientation = "vertical", className, ...props })
// Native overflow with custom scrollbar styling via CSS
// Uses ::-webkit-scrollbar + scrollbar-width/color for Firefox
```

### Table

```tsx
export function Table({ className, ...props })        // <table>
export function TableHeader({ className, ...props })  // <thead>
export function TableBody({ className, ...props })    // <tbody>
export function TableFooter({ className, ...props })  // <tfoot>
export function TableRow({ className, ...props })     // <tr>
export function TableHead({ className, ...props })    // <th>
export function TableCell({ className, ...props })    // <td>
export function TableCaption({ className, ...props }) // <caption>
```

### Popover

```tsx
export function Popover(props)           // Base UI Popover.Root
export function PopoverTrigger(props)    // Base UI Popover.Trigger
export function PopoverContent(props)    // Base UI Popover.Popup (inside Portal + Positioner)
export function PopoverClose(props)      // Base UI Popover.Close
```

### Slider

```tsx
export function Slider({ className, ...props })  // Base UI Slider.Root
export function SliderTrack(props)               // Base UI Slider.Track
export function SliderRange(props)               // Base UI Slider.Range (or Indicator)
export function SliderThumb(props)               // Base UI Slider.Thumb
```

### Collapsible

```tsx
export function Collapsible(props)          // Base UI Collapsible.Root
export function CollapsibleTrigger(props)   // Base UI Collapsible.Trigger
export function CollapsibleContent(props)   // Base UI Collapsible.Panel (animated)
```

### Accordion

```tsx
export function Accordion(props)          // Base UI Accordion.Root
export function AccordionItem(props)      // Base UI Accordion.Item
export function AccordionTrigger(props)   // Base UI Accordion.Trigger (inside Header)
export function AccordionContent(props)   // Base UI Accordion.Panel
```

### Alert Dialog

```tsx
export function AlertDialog(props)             // Base UI AlertDialog.Root
export function AlertDialogTrigger(props)      // Base UI AlertDialog.Trigger
export function AlertDialogContent(props)      // Base UI AlertDialog.Popup (inside Portal)
export function AlertDialogOverlay(props)      // Base UI AlertDialog.Backdrop
export function AlertDialogHeader(props)       // plain <div>
export function AlertDialogFooter(props)       // plain <div>
export function AlertDialogTitle(props)        // Base UI AlertDialog.Title
export function AlertDialogDescription(props)  // Base UI AlertDialog.Description
export function AlertDialogAction(props)       // <button> (confirm action)
export function AlertDialogCancel(props)       // Base UI AlertDialog.Close
```

### Sheet

```tsx
export function Sheet(props)             // Base UI Dialog.Root
export function SheetTrigger(props)      // Base UI Dialog.Trigger
export function SheetContent({ side = "right", className, ...props })
  // side: "top" | "right" | "bottom" | "left" → data-side attribute
  // Base UI Dialog.Popup inside Portal, slides in from edge
export function SheetOverlay(props)      // Base UI Dialog.Backdrop
export function SheetHeader(props)       // plain <div>
export function SheetFooter(props)       // plain <div>
export function SheetTitle(props)        // Base UI Dialog.Title
export function SheetDescription(props)  // Base UI Dialog.Description
export function SheetClose(props)        // Base UI Dialog.Close
```

### Button Group

```tsx
export function ButtonGroup({ orientation = "horizontal", className, ...props })
// <div role="group"> with data-orientation
// CSS handles border-radius flattening on inner buttons
```

### Input Group

```tsx
export function InputGroup({ className, ...props })      // wrapper <div>
export function InputGroupAddon({ className, ...props }) // prefix/suffix addon
// CSS handles border merging between input and addons
```

### Resizable

```tsx
export function ResizablePanelGroup(props)  // react-resizable-panels PanelGroup
export function ResizablePanel(props)       // react-resizable-panels Panel
export function ResizableHandle(props)      // react-resizable-panels PanelResizeHandle
// New dependency: react-resizable-panels
```

### Toast

```tsx
export function ToastProvider(props)       // Base UI Toast.Provider
export function ToastViewport(props)       // Base UI Toast.Viewport
export function Toast({ variant, ...props })  // Base UI Toast.Content
  // variant: "default" | "success" | "warning" | "info" | "destructive"
export function ToastTitle(props)          // Base UI Toast.Title
export function ToastDescription(props)    // Base UI Toast.Description
export function ToastClose(props)          // Base UI Toast.Close
export function ToastAction(props)         // action button inside toast
export { useToastManager }                 // re-export Base UI hook
```

### Field (Layer 1)

```tsx
// Base UI Field-backed (accessibility: auto id, aria-describedby, validation)
export function Field(props)              // Base UI Field.Root + role="group" + data-orientation
export function FieldLabel(props)         // Base UI Field.Label
export function FieldDescription(props)   // Base UI Field.Description
export function FieldError({ errors, ...props })  // Base UI Field.Error + error list rendering
export function FieldValidity(props)      // Base UI Field.Validity

// Base UI Fieldset-backed (accessible group labeling)
export function FieldSet(props)           // Base UI Fieldset.Root
export function FieldLegend(props)        // Base UI Fieldset.Legend

// Pure layout (native HTML)
export function FieldGroup(props)         // <div> — groups multiple fields vertically
export function FieldContent(props)       // <div> — wraps control + description + error
export function FieldSeparator(props)     // uses Separator component internally

// Dependencies: @base-ui/react (field + fieldset)
// registryDependencies: ["separator", "label"]
```

### Sidebar (Layer 2)

Full shadcn parity.

**State Management:**

```tsx
export function SidebarProvider({
  defaultOpen = true,
  open,
  onOpenChange,
  className,
  ...props
})
// Manages: open/collapsed state, mobile vs desktop detection (matchMedia),
// keyboard shortcut (Ctrl+B toggle), cookie-persisted state
// Exposed via React context

export function useSidebar()
// Returns: { open, setOpen, toggleSidebar, isMobile, state }
// state: "expanded" | "collapsed"
```

**Layout:**

```tsx
export function Sidebar({
  side = "left",              // "left" | "right"
  variant = "sidebar",        // "sidebar" | "floating" | "inset"
  collapsible = "offcanvas",  // "offcanvas" | "icon" | "none"
  className,
  ...props
})
// Desktop: collapsible aside using Base UI Collapsible
// Mobile: renders inside Sheet (side-sliding dialog)
// data-side, data-variant, data-collapsible attributes

export function SidebarTrigger(props)    // button that calls toggleSidebar()
export function SidebarRail(props)       // thin hover-target strip for toggling
export function SidebarInset(props)      // main content area next to sidebar
```

**Sections:**

```tsx
export function SidebarHeader(props)
export function SidebarContent(props)    // scrollable, uses ScrollArea
export function SidebarFooter(props)
export function SidebarSeparator(props)  // uses Separator
```

**Grouping:**

```tsx
export function SidebarGroup(props)
export function SidebarGroupLabel(props)
export function SidebarGroupAction(props)
export function SidebarGroupContent(props)
```

**Menu (navigation items):**

```tsx
export function SidebarMenu(props)          // <ul>
export function SidebarMenuItem(props)      // <li>
export function SidebarMenuButton({
  isActive,
  variant = "default",  // "default" | "outline"
  size = "default",     // "default" | "sm" | "lg"
  tooltip,              // tooltip text shown in collapsed icon mode
  ...props
})
export function SidebarMenuAction(props)
export function SidebarMenuBadge(props)
export function SidebarMenuSkeleton(props)  // uses Skeleton
export function SidebarMenuSub(props)       // nested <ul>
export function SidebarMenuSubItem(props)
export function SidebarMenuSubButton({ isActive, ...props })
```

**CSS Tokens:**

```
--sct-sidebar-width           → 16rem
--sct-sidebar-width-collapsed → 3rem
```

**registryDependencies:**

```json
["button", "collapsible", "sheet", "separator", "skeleton", "scroll-area", "tooltip", "input"]
```

## Testing Strategy

Every component gets `<name>.test.tsx` (Vitest browser mode, `vitest-browser-react`).

**Tests cover:**
- Renders without crashing — basic render + element assertion
- `data-slot` attributes — verify each sub-component sets its slot
- Interaction — click/toggle behavior (accordion expand, collapsible toggle, popover open, sheet open/close, slider drag, etc.)
- Variants/orientations — verify `data-variant`, `data-orientation`, `data-side` attributes
- Accessibility basics — correct ARIA roles (`separator`, `group`, `table`, `dialog`, etc.)

**Not testing:** visual appearance, animations, cookie persistence, `matchMedia` mocking.

## Stories Strategy

One `<Name>.stories.tsx` per component in `apps/docs/src/stories/`.

Each includes:
- **Default** — primary usage example
- **Playground** — interactive variant where applicable
- **Variant stories** — one per major variant (Sheet sides, Slider range, Accordion single vs multiple, Sidebar variants, Toast variants, etc.)

Stories import from `@webscit/registry`.

## New Dependencies

| Package | Component | Type |
|---|---|---|
| `react-resizable-panels` | resizable | dependencies |

No other new external dependencies. All Base UI primitives (accordion, alert-dialog, collapsible, field, fieldset, popover, slider, toast) are already available via the existing `@base-ui/react@^1.3.0` dependency.
