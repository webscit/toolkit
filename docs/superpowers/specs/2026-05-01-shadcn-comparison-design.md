# Design: shadcn/ui Comparison in Storybook

**Date:** 2026-05-01  
**Branch:** chore/compare-with-shadcn  
**Status:** Approved

---

## Context

`@webscit/toolkit` is a shadcn-style component library built on Base UI primitives with W3C design tokens instead of Tailwind. To demonstrate visual and behavioral parity (or intentional divergence) with shadcn/ui, the Storybook docs app needs a side-by-side comparison mode. This lets contributors and consumers see both implementations at a glance and evaluate differences interactively.

---

## Architecture

### 1. Infrastructure — `apps/docs` only

Tailwind v4 and shadcn/ui are added **only to `apps/docs`**. The toolkit packages (`packages/registry`, `packages/tokens`) remain Tailwind-free.

**Dependencies added to `apps/docs`:**

- `tailwindcss` v4 + `@tailwindcss/vite` (dev)
- shadcn peer deps: `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`

**Files created/modified in `apps/docs`:**

- `src/index.css` — `@import "tailwindcss"` plus shadcn CSS variable theme config
- `.storybook/main.ts` — add `@tailwindcss/vite` plugin via the `viteFinal` hook (no separate vite.config exists)
- `src/components/ui/` — shadcn component sources installed via `npx shadcn@latest add`
- `components.json` — shadcn project config (style, paths, aliases)

**CSS isolation:**  
Tailwind's preflight resets could affect toolkit components. Every shadcn render is wrapped in `<div className="shadcn">`. Tailwind's base layer is scoped to `.shadcn *` so resets don't leak into the toolkit half of the story canvas. The toolkit's `@scope (.sct-*)` rules are natively isolated by the CSS `@scope` mechanism.

**shadcn components to install** (one per toolkit component, 32 total):  
`accordion`, `alert`, `alert-dialog`, `badge`, `button`, `card`, `checkbox`,
`collapsible`, `dialog`, `input`, `label`, `popover`, `radio-group`, `resizable`,
`scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`,
`switch`, `table`, `tabs`, `textarea`, `toast`, `toggle`, `tooltip`,
`dropdown-menu`, `navigation-menu` (for Menu), `form` (for Field),
`input-otp` or plain `input` group (for InputGroup), `button` group composed (for ButtonGroup)

---

### 2. Toolbar Toggle

A second global type `compareShadcn` added to `apps/docs/.storybook/preview.tsx` alongside the existing `theme` toggle:

```ts
compareShadcn: {
  description: "Show shadcn/ui equivalent",
  defaultValue: "off",
  toolbar: {
    title: "Compare with shadcn/ui",
    items: [
      { value: "off", title: "Hide comparison", icon: "eye" },
      { value: "on",  title: "Show shadcn/ui",  icon: "eyeclose" },
    ],
  },
},
```

---

### 3. Global Decorator

A second decorator added to `apps/docs/.storybook/preview.tsx`. It reads the toolbar global and the story parameter:

```tsx
(Story, context) => {
  const compare = context.globals["compareShadcn"] === "on";
  const shadcnRender = context.parameters.shadcn?.render;

  if (!compare || !shadcnRender) return <Story />;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
      <div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, marginBottom: 8 }}>
          sci-ui toolkit
        </p>
        <Story />
      </div>
      <div className="shadcn">
        <p style={{ fontFamily: "sans-serif", fontSize: 12, marginBottom: 8 }}>
          shadcn/ui
        </p>
        {shadcnRender(context.args)}
      </div>
    </div>
  );
},
```

When a story has no `parameters.shadcn`, the decorator is a no-op — the story renders normally regardless of toolbar state.

---

### 4. Story Parameter Structure

**Key files to modify:** all 32 files in `apps/docs/src/stories/`

Every story export gains `parameters.shadcn.render`. The render function receives the story's current `args`, enabling live prop sync in the Playground.

**Playground (live prop sync):**

```ts
export const Playground: Story = {
  args: { variant: "default", size: "default", children: "Click me" },
  parameters: {
    shadcn: {
      render: (args) => (
        <ShadcnButton variant={args.variant} size={args.size}>
          {args.children}
        </ShadcnButton>
      ),
    },
  },
};
```

**Static stories (AllVariants, Sizes, Disabled — args ignored):**

```ts
export const AllVariants: Story = {
  render: () => (/* toolkit layout */),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <ShadcnButton variant="default">Default</ShadcnButton>
          <ShadcnButton variant="destructive">Destructive</ShadcnButton>
          {/* … */}
        </div>
      ),
    },
  },
};
```

For components with no direct prop mapping (Menu, Sidebar, etc.) each story variant gets a representative shadcn render matching the visual intent of the toolkit story.

---

### 5. Story Review and Fixes

All 32 story files are reviewed for rendering issues. Known problem categories:

| Category                                        | Example components            | Fix                                                        |
| ----------------------------------------------- | ----------------------------- | ---------------------------------------------------------- |
| Missing trigger for overlay components          | Dialog, Sheet, Drawer, Toast  | Add a trigger button that opens the component              |
| Sub-component composition required              | Select, Menu, Accordion, Tabs | Add required sub-components (Trigger, Content, Item, etc.) |
| Missing children / args-only stories            | Button Disabled               | Add `children` default in args                             |
| Broken/missing exports from `@webscit/registry` | Any                           | Fix import or add export                                   |

---

## Critical Files

| File                                  | Change                                                 |
| ------------------------------------- | ------------------------------------------------------ |
| `apps/docs/package.json`              | Add Tailwind v4, shadcn deps                           |
| `apps/docs/.storybook/main.ts`        | Add `@tailwindcss/vite` plugin via `viteFinal`         |
| `apps/docs/src/index.css`             | Add Tailwind import + shadcn theme vars                |
| `apps/docs/components.json`           | shadcn project config                                  |
| `apps/docs/.storybook/preview.tsx`    | Add `compareShadcn` global type + comparison decorator |
| `apps/docs/src/components/ui/`        | shadcn component sources (generated)                   |
| `apps/docs/src/stories/*.stories.tsx` | Add `parameters.shadcn` to all story exports           |

---

## Verification

1. Run `npm run dev -w apps/docs` — Storybook loads without errors
2. Open any story (e.g., Button) — renders normally with toolbar showing "Theme" and "Compare with shadcn/ui"
3. Click the comparison toggle — story canvas splits into two labeled columns
4. Open Button → Playground — change variant/size in controls panel — both toolkit and shadcn components update simultaneously
5. Toggle comparison OFF — story returns to single-column layout
6. Open a story for an overlay component (Dialog, Sheet) — there is a trigger button that opens it
7. Open every story file and confirm no blank/error canvases
