# New Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 16 new components (accordion, alert-dialog, button-group, collapsible, field, input-group, popover, resizable, scroll-area, separator, sheet, sidebar, skeleton, slider, toast, table) to @webscit/toolkit with full tests and stories.

**Architecture:** Components follow the existing shadcn-style pattern: each lives in `packages/registry/src/components/<name>/` with `.tsx`, `.css`, `.test.tsx`, and `registry.meta.json`. Base UI primitives are used where available; native HTML for layout-only components. CSS uses `@scope` with `data-*` attributes for variants. New design tokens are added for success/warning/info states and sidebar dimensions.

**Tech Stack:** React 19, @base-ui/react 1.3.0, react-resizable-panels (new), Vitest browser mode, Storybook 10, Style Dictionary v5, W3C DTCG tokens.

---

## File Structure

### Tokens (modified)

- `packages/tokens/src/base.tokens.json` — add green + amber primitive colors
- `packages/tokens/src/semantic.tokens.json` — add success/warning/info + sidebar tokens
- `packages/tokens/src/semantic-dark.tokens.json` — add dark overrides

### New Components (created)

Each component creates 4 files in `packages/registry/src/components/<name>/`:

| Component | Files |
|-----------|-------|
| separator | `separator.tsx`, `separator.css`, `separator.test.tsx`, `registry.meta.json` |
| skeleton | `skeleton.tsx`, `skeleton.css`, `skeleton.test.tsx`, `registry.meta.json` |
| scroll-area | `scroll-area.tsx`, `scroll-area.css`, `scroll-area.test.tsx`, `registry.meta.json` |
| table | `table.tsx`, `table.css`, `table.test.tsx`, `registry.meta.json` |
| button-group | `button-group.tsx`, `button-group.css`, `button-group.test.tsx`, `registry.meta.json` |
| input-group | `input-group.tsx`, `input-group.css`, `input-group.test.tsx`, `registry.meta.json` |
| popover | `popover.tsx`, `popover.css`, `popover.test.tsx`, `registry.meta.json` |
| slider | `slider.tsx`, `slider.css`, `slider.test.tsx`, `registry.meta.json` |
| collapsible | `collapsible.tsx`, `collapsible.css`, `collapsible.test.tsx`, `registry.meta.json` |
| accordion | `accordion.tsx`, `accordion.css`, `accordion.test.tsx`, `registry.meta.json` |
| alert-dialog | `alert-dialog.tsx`, `alert-dialog.css`, `alert-dialog.test.tsx`, `registry.meta.json` |
| sheet | `sheet.tsx`, `sheet.css`, `sheet.test.tsx`, `registry.meta.json` |
| resizable | `resizable.tsx`, `resizable.css`, `resizable.test.tsx`, `registry.meta.json` |
| toast | `toast.tsx`, `toast.css`, `toast.test.tsx`, `registry.meta.json` |
| field | `field.tsx`, `field.css`, `field.test.tsx`, `registry.meta.json` |
| sidebar | `sidebar.tsx`, `sidebar.css`, `sidebar.test.tsx`, `registry.meta.json` |

### Modified Files

- `packages/registry/src/index.ts` — add exports for all new components
- `packages/registry/package.json` — add `react-resizable-panels` dependency

### Stories (created)

Each in `apps/docs/src/stories/`:

`Separator.stories.tsx`, `Skeleton.stories.tsx`, `ScrollArea.stories.tsx`, `Table.stories.tsx`, `ButtonGroup.stories.tsx`, `InputGroup.stories.tsx`, `Popover.stories.tsx`, `Slider.stories.tsx`, `Collapsible.stories.tsx`, `Accordion.stories.tsx`, `AlertDialog.stories.tsx`, `Sheet.stories.tsx`, `Resizable.stories.tsx`, `Toast.stories.tsx`, `Field.stories.tsx`, `Sidebar.stories.tsx`

---

## Task 1: Token Additions

**Files:**
- Modify: `packages/tokens/src/base.tokens.json`
- Modify: `packages/tokens/src/semantic.tokens.json`
- Modify: `packages/tokens/src/semantic-dark.tokens.json`

- [ ] **Step 1: Add green and amber primitives to base tokens**

Add these entries inside `sct.color` in `packages/tokens/src/base.tokens.json`, after the `"red"` block:

```json
"green": {
  "light": { "$type": "color", "$value": "#4caf50" },
  "base": { "$type": "color", "$value": "#2e7d32" },
  "dark": { "$type": "color", "$value": "#1b5e20" }
},
"amber": {
  "light": { "$type": "color", "$value": "#ffb300" },
  "base": { "$type": "color", "$value": "#f57f17" },
  "dark": { "$type": "color", "$value": "#e65100" }
}
```

- [ ] **Step 2: Add semantic tokens for success/warning/info and sidebar**

Add these entries inside `sct.color` in `packages/tokens/src/semantic.tokens.json`, after the `"secondary-foreground"` entry:

```json
"success": { "$type": "color", "$value": "{sct.color.green.base}" },
"success-foreground": { "$type": "color", "$value": "{sct.color.neutral.0}" },
"warning": { "$type": "color", "$value": "{sct.color.amber.base}" },
"warning-foreground": { "$type": "color", "$value": "{sct.color.neutral.950}" },
"info": { "$type": "color", "$value": "{sct.color.blue.base}" },
"info-foreground": { "$type": "color", "$value": "{sct.color.neutral.0}" }
```

Add a new `sct.sidebar` section at the same level as `sct.color` in `packages/tokens/src/semantic.tokens.json`:

```json
"sidebar": {
  "width": { "$type": "dimension", "$value": "256px" },
  "width-collapsed": { "$type": "dimension", "$value": "48px" }
}
```

- [ ] **Step 3: Add dark theme overrides**

Add these entries inside `sct.color` in `packages/tokens/src/semantic-dark.tokens.json`, after the `"secondary-foreground"` entry:

```json
"success": { "$type": "color", "$value": "{sct.color.green.light}" },
"warning": { "$type": "color", "$value": "{sct.color.amber.light}" },
"warning-foreground": { "$type": "color", "$value": "{sct.color.neutral.950}" },
"info": { "$type": "color", "$value": "{sct.color.blue.light}" }
```

Note: `success-foreground` and `info-foreground` remain `neutral.0` in dark mode (same as light), so no override needed.

- [ ] **Step 4: Build tokens and verify**

Run: `npm run build -w packages/tokens`
Expected: `✓ tokens built`

Verify the output includes new tokens:

Run: `grep -E "sct-color-(success|warning|info)|sct-sidebar" packages/tokens/dist/tokens.css`
Expected: Lines containing `--sct-color-success`, `--sct-color-warning`, `--sct-color-info`, `--sct-sidebar-width`, `--sct-sidebar-width-collapsed`

- [ ] **Step 5: Commit**

```bash
git add packages/tokens/src/base.tokens.json packages/tokens/src/semantic.tokens.json packages/tokens/src/semantic-dark.tokens.json
git commit -m "feat(tokens): add success/warning/info colors and sidebar dimension tokens"
```

---

## Task 2: Install react-resizable-panels

**Files:**
- Modify: `packages/registry/package.json`

- [ ] **Step 1: Add dependency**

Run: `npm install react-resizable-panels -w packages/registry`

- [ ] **Step 2: Verify installation**

Run: `node -e "require.resolve('react-resizable-panels')"`
Expected: resolves without error

- [ ] **Step 3: Commit**

```bash
git add packages/registry/package.json package-lock.json
git commit -m "chore(registry): add react-resizable-panels dependency"
```

---

## Task 3: Separator

**Files:**
- Create: `packages/registry/src/components/separator/separator.tsx`
- Create: `packages/registry/src/components/separator/separator.css`
- Create: `packages/registry/src/components/separator/separator.test.tsx`
- Create: `packages/registry/src/components/separator/registry.meta.json`

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/separator/separator.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Separator } from "./separator";

describe("Separator", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Separator />);
    await expect.element(screen.getByRole("none")).toBeInTheDocument();
  });

  it("renders as separator role when not decorative", async () => {
    const screen = await render(<Separator decorative={false} />);
    await expect.element(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(<Separator decorative={false} />);
    await expect
      .element(screen.getByRole("separator"))
      .toHaveAttribute("data-slot", "separator");
  });

  it("defaults to horizontal orientation", async () => {
    const screen = await render(<Separator decorative={false} />);
    await expect
      .element(screen.getByRole("separator"))
      .toHaveAttribute("data-orientation", "horizontal");
  });

  it("supports vertical orientation", async () => {
    const screen = await render(
      <Separator orientation="vertical" decorative={false} />,
    );
    await expect
      .element(screen.getByRole("separator"))
      .toHaveAttribute("data-orientation", "vertical");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <Separator decorative={false} className="my-class" />,
    );
    await expect
      .element(screen.getByRole("separator"))
      .toHaveClass("sct-separator my-class");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/separator/separator.test.tsx`
Expected: FAIL — module not found

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/separator/separator.tsx`:

```tsx
import "./separator.css";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      data-slot="separator"
      data-orientation={orientation}
      className={`sct-separator${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/separator/separator.css`:

```css
@scope (.sct-separator) {
  :scope {
    flex-shrink: 0;
    background-color: var(--sct-color-border);
  }

  :scope[data-orientation="horizontal"] {
    height: 1px;
    width: 100%;
  }

  :scope[data-orientation="vertical"] {
    width: 1px;
    height: 100%;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/separator/registry.meta.json`:

```json
{
  "title": "Separator",
  "description": "A visual divider between content sections.",
  "dependencies": [],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/separator/separator.test.tsx`
Expected: All 6 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/separator/
git commit -m "feat(registry): add separator component"
```

---

## Task 4: Skeleton

**Files:**
- Create: `packages/registry/src/components/skeleton/skeleton.tsx`
- Create: `packages/registry/src/components/skeleton/skeleton.css`
- Create: `packages/registry/src/components/skeleton/skeleton.test.tsx`
- Create: `packages/registry/src/components/skeleton/registry.meta.json`

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/skeleton/skeleton.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Skeleton data-testid="skel" />);
    await expect.element(screen.getByTestId("skel")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(<Skeleton data-testid="skel" />);
    await expect
      .element(screen.getByTestId("skel"))
      .toHaveAttribute("data-slot", "skeleton");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <Skeleton data-testid="skel" className="my-class" />,
    );
    await expect
      .element(screen.getByTestId("skel"))
      .toHaveClass("sct-skeleton my-class");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/skeleton/skeleton.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/skeleton/skeleton.tsx`:

```tsx
import "./skeleton.css";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={`sct-skeleton${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/skeleton/skeleton.css`:

```css
@keyframes sct-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

@scope (.sct-skeleton) {
  :scope {
    background-color: var(--sct-color-muted);
    border-radius: var(--sct-radius-md);
    animation: sct-skeleton-pulse 2s ease-in-out infinite;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/skeleton/registry.meta.json`:

```json
{
  "title": "Skeleton",
  "description": "A placeholder loading animation.",
  "dependencies": [],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/skeleton/skeleton.test.tsx`
Expected: All 3 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/skeleton/
git commit -m "feat(registry): add skeleton component"
```

---

## Task 5: Scroll Area

**Files:**
- Create: `packages/registry/src/components/scroll-area/scroll-area.tsx`
- Create: `packages/registry/src/components/scroll-area/scroll-area.css`
- Create: `packages/registry/src/components/scroll-area/scroll-area.test.tsx`
- Create: `packages/registry/src/components/scroll-area/registry.meta.json`

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/scroll-area/scroll-area.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { ScrollArea, ScrollBar } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <ScrollArea data-testid="scroll">
        <div>Content</div>
      </ScrollArea>,
    );
    await expect.element(screen.getByTestId("scroll")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <ScrollArea data-testid="scroll">
        <div>Content</div>
      </ScrollArea>,
    );
    await expect
      .element(screen.getByTestId("scroll"))
      .toHaveAttribute("data-slot", "scroll-area");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <ScrollArea data-testid="scroll" className="my-class">
        <div>Content</div>
      </ScrollArea>,
    );
    await expect
      .element(screen.getByTestId("scroll"))
      .toHaveClass("sct-scroll-area my-class");
  });
});

describe("ScrollBar", () => {
  it("renders without crashing", async () => {
    const screen = await render(<ScrollBar data-testid="bar" />);
    await expect.element(screen.getByTestId("bar")).toBeInTheDocument();
  });

  it("defaults to vertical orientation", async () => {
    const screen = await render(<ScrollBar data-testid="bar" />);
    await expect
      .element(screen.getByTestId("bar"))
      .toHaveAttribute("data-orientation", "vertical");
  });

  it("supports horizontal orientation", async () => {
    const screen = await render(
      <ScrollBar data-testid="bar" orientation="horizontal" />,
    );
    await expect
      .element(screen.getByTestId("bar"))
      .toHaveAttribute("data-orientation", "horizontal");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/scroll-area/scroll-area.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/scroll-area/scroll-area.tsx`:

```tsx
import "./scroll-area.css";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div
      data-slot="scroll-area"
      className={`sct-scroll-area${className ? ` ${className}` : ""}`}
      {...props}
    >
      <div data-slot="scroll-area-viewport" className="sct-scroll-area-viewport">
        {children}
      </div>
    </div>
  );
}

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

export function ScrollBar({
  orientation = "vertical",
  className,
  ...props
}: ScrollBarProps) {
  return (
    <div
      data-slot="scroll-bar"
      data-orientation={orientation}
      className={`sct-scroll-bar${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/scroll-area/scroll-area.css`:

```css
@scope (.sct-scroll-area) {
  :scope {
    position: relative;
    overflow: hidden;
  }

  .sct-scroll-area-viewport {
    height: 100%;
    width: 100%;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--sct-color-border) transparent;
  }

  .sct-scroll-area-viewport::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .sct-scroll-area-viewport::-webkit-scrollbar-track {
    background: transparent;
  }

  .sct-scroll-area-viewport::-webkit-scrollbar-thumb {
    background-color: var(--sct-color-border);
    border-radius: var(--sct-radius-full);
    border: 2px solid transparent;
    background-clip: content-box;
  }

  .sct-scroll-area-viewport::-webkit-scrollbar-thumb:hover {
    background-color: var(--sct-color-muted-foreground);
  }
}

@scope (.sct-scroll-bar) {
  :scope {
    display: flex;
    touch-action: none;
    user-select: none;
    padding: 1px;
  }

  :scope[data-orientation="vertical"] {
    width: 8px;
    border-left: 1px solid transparent;
  }

  :scope[data-orientation="horizontal"] {
    height: 8px;
    flex-direction: column;
    border-top: 1px solid transparent;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/scroll-area/registry.meta.json`:

```json
{
  "title": "Scroll Area",
  "description": "A scrollable area with custom styled scrollbars.",
  "dependencies": [],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/scroll-area/scroll-area.test.tsx`
Expected: All 6 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/scroll-area/
git commit -m "feat(registry): add scroll-area component"
```

---

## Task 6: Table

**Files:**
- Create: `packages/registry/src/components/table/table.tsx`
- Create: `packages/registry/src/components/table/table.css`
- Create: `packages/registry/src/components/table/table.test.tsx`
- Create: `packages/registry/src/components/table/registry.meta.json`

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/table/table.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./table";

describe("Table", () => {
  it("renders a complete table without crashing", async () => {
    const screen = await render(
      <Table>
        <TableCaption>A test table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );
    await expect.element(screen.getByRole("table")).toBeInTheDocument();
  });

  it("sets data-slot on table", async () => {
    const screen = await render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await expect
      .element(screen.getByRole("table"))
      .toHaveAttribute("data-slot", "table");
  });

  it("forwards className on table", async () => {
    const screen = await render(
      <Table className="my-class">
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await expect
      .element(screen.getByRole("table"))
      .toHaveClass("sct-table my-class");
  });

  it("renders column headers with correct role", async () => {
    const screen = await render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Val</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await expect
      .element(screen.getByRole("columnheader"))
      .toBeInTheDocument();
  });

  it("renders caption", async () => {
    const screen = await render(
      <Table>
        <TableCaption>My caption</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await expect.element(screen.getByRole("caption")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/table/table.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/table/table.tsx`:

```tsx
import "./table.css";

export type TableProps = React.HTMLAttributes<HTMLTableElement>;

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="sct-table-wrapper">
      <table
        data-slot="table"
        className={`sct-table${className ? ` ${className}` : ""}`}
        {...props}
      />
    </div>
  );
}

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={`sct-table-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={`sct-table-body${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={`sct-table-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={`sct-table-row${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={`sct-table-head${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={`sct-table-cell${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={`sct-table-caption${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/table/table.css`:

```css
.sct-table-wrapper {
  position: relative;
  width: 100%;
  overflow: auto;
}

@scope (.sct-table) {
  :scope {
    width: 100%;
    caption-side: bottom;
    border-collapse: collapse;
    font-size: var(--sct-font-size-sm);
  }

  .sct-table-header {
    border-bottom: 1px solid var(--sct-color-border);
  }

  .sct-table-header .sct-table-row:hover {
    background-color: transparent;
  }

  .sct-table-body .sct-table-row:last-child {
    border-bottom: none;
  }

  .sct-table-footer {
    border-top: 1px solid var(--sct-color-border);
    background-color: var(--sct-color-muted);
    font-weight: var(--sct-font-weight-medium);
  }

  .sct-table-row {
    border-bottom: 1px solid var(--sct-color-border);
    transition: background-color 150ms;
  }

  .sct-table-row:hover {
    background-color: var(--sct-color-muted);
  }

  .sct-table-head {
    height: 2.5rem;
    padding-inline: 1rem;
    text-align: left;
    vertical-align: middle;
    font-weight: var(--sct-font-weight-medium);
    color: var(--sct-color-muted-foreground);
  }

  .sct-table-cell {
    padding: 0.75rem 1rem;
    vertical-align: middle;
  }

  .sct-table-caption {
    margin-top: 1rem;
    font-size: var(--sct-font-size-sm);
    color: var(--sct-color-muted-foreground);
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/table/registry.meta.json`:

```json
{
  "title": "Table",
  "description": "A semantic HTML table with styled rows and cells.",
  "dependencies": [],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/table/table.test.tsx`
Expected: All 5 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/table/
git commit -m "feat(registry): add table component"
```

---

## Task 7: Button Group

**Files:**
- Create: `packages/registry/src/components/button-group/button-group.tsx`
- Create: `packages/registry/src/components/button-group/button-group.css`
- Create: `packages/registry/src/components/button-group/button-group.test.tsx`
- Create: `packages/registry/src/components/button-group/registry.meta.json`

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/button-group/button-group.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { ButtonGroup } from "./button-group";

describe("ButtonGroup", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <ButtonGroup>
        <button>A</button>
        <button>B</button>
      </ButtonGroup>,
    );
    await expect.element(screen.getByRole("group")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <ButtonGroup>
        <button>A</button>
      </ButtonGroup>,
    );
    await expect
      .element(screen.getByRole("group"))
      .toHaveAttribute("data-slot", "button-group");
  });

  it("defaults to horizontal orientation", async () => {
    const screen = await render(
      <ButtonGroup>
        <button>A</button>
      </ButtonGroup>,
    );
    await expect
      .element(screen.getByRole("group"))
      .toHaveAttribute("data-orientation", "horizontal");
  });

  it("supports vertical orientation", async () => {
    const screen = await render(
      <ButtonGroup orientation="vertical">
        <button>A</button>
      </ButtonGroup>,
    );
    await expect
      .element(screen.getByRole("group"))
      .toHaveAttribute("data-orientation", "vertical");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <ButtonGroup className="my-class">
        <button>A</button>
      </ButtonGroup>,
    );
    await expect
      .element(screen.getByRole("group"))
      .toHaveClass("sct-button-group my-class");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/button-group/button-group.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/button-group/button-group.tsx`:

```tsx
import "./button-group.css";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function ButtonGroup({
  orientation = "horizontal",
  className,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={`sct-button-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/button-group/button-group.css`:

```css
@scope (.sct-button-group) {
  :scope {
    display: inline-flex;
  }

  :scope[data-orientation="vertical"] {
    flex-direction: column;
  }

  /* Flatten inner border-radius for horizontal */
  :scope[data-orientation="horizontal"] > :not(:first-child):not(:last-child) {
    border-radius: 0;
  }

  :scope[data-orientation="horizontal"] > :first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :scope[data-orientation="horizontal"] > :last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* Flatten inner border-radius for vertical */
  :scope[data-orientation="vertical"] > :not(:first-child):not(:last-child) {
    border-radius: 0;
  }

  :scope[data-orientation="vertical"] > :first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :scope[data-orientation="vertical"] > :last-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  /* Collapse borders between siblings */
  :scope[data-orientation="horizontal"] > :not(:first-child) {
    margin-left: -1px;
  }

  :scope[data-orientation="vertical"] > :not(:first-child) {
    margin-top: -1px;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/button-group/registry.meta.json`:

```json
{
  "title": "Button Group",
  "description": "Groups buttons together with connected styling.",
  "dependencies": [],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/button-group/button-group.test.tsx`
Expected: All 5 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/button-group/
git commit -m "feat(registry): add button-group component"
```

---

## Task 8: Input Group

**Files:**
- Create: `packages/registry/src/components/input-group/input-group.tsx`
- Create: `packages/registry/src/components/input-group/input-group.css`
- Create: `packages/registry/src/components/input-group/input-group.test.tsx`
- Create: `packages/registry/src/components/input-group/registry.meta.json`

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/input-group/input-group.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { InputGroup, InputGroupAddon } from "./input-group";

describe("InputGroup", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <InputGroup data-testid="ig">
        <input />
      </InputGroup>,
    );
    await expect.element(screen.getByTestId("ig")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <InputGroup data-testid="ig">
        <input />
      </InputGroup>,
    );
    await expect
      .element(screen.getByTestId("ig"))
      .toHaveAttribute("data-slot", "input-group");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <InputGroup data-testid="ig" className="my-class">
        <input />
      </InputGroup>,
    );
    await expect
      .element(screen.getByTestId("ig"))
      .toHaveClass("sct-input-group my-class");
  });
});

describe("InputGroupAddon", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <InputGroupAddon data-testid="addon">$</InputGroupAddon>,
    );
    await expect.element(screen.getByTestId("addon")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <InputGroupAddon data-testid="addon">$</InputGroupAddon>,
    );
    await expect
      .element(screen.getByTestId("addon"))
      .toHaveAttribute("data-slot", "input-group-addon");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/input-group/input-group.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/input-group/input-group.tsx`:

```tsx
import "./input-group.css";

export type InputGroupProps = React.HTMLAttributes<HTMLDivElement>;

export function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={`sct-input-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type InputGroupAddonProps = React.HTMLAttributes<HTMLDivElement>;

export function InputGroupAddon({ className, ...props }: InputGroupAddonProps) {
  return (
    <div
      data-slot="input-group-addon"
      className={`sct-input-group-addon${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/input-group/input-group.css`:

```css
@scope (.sct-input-group) {
  :scope {
    display: flex;
    align-items: stretch;
  }

  /* Flatten inner radii */
  :scope > :not(:first-child):not(:last-child) {
    border-radius: 0;
  }

  :scope > :first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :scope > :last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* Collapse borders */
  :scope > :not(:first-child) {
    margin-left: -1px;
  }

  .sct-input-group-addon {
    display: flex;
    align-items: center;
    padding-inline: 0.75rem;
    border: 1px solid var(--sct-color-input);
    background-color: var(--sct-color-muted);
    font-size: var(--sct-font-size-sm);
    color: var(--sct-color-muted-foreground);
    white-space: nowrap;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/input-group/registry.meta.json`:

```json
{
  "title": "Input Group",
  "description": "Groups an input with prefix/suffix addons.",
  "dependencies": [],
  "devDependencies": [],
  "registryDependencies": ["input"]
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/input-group/input-group.test.tsx`
Expected: All 5 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/input-group/
git commit -m "feat(registry): add input-group component"
```

---

## Task 9: Popover

**Files:**
- Create: `packages/registry/src/components/popover/popover.tsx`
- Create: `packages/registry/src/components/popover/popover.css`
- Create: `packages/registry/src/components/popover/popover.test.tsx`
- Create: `packages/registry/src/components/popover/registry.meta.json`

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/popover/popover.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "./popover";

describe("Popover", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Open" }))
      .toBeInTheDocument();
  });

  it("sets data-slot on trigger", async () => {
    const screen = await render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Open" }))
      .toHaveAttribute("data-slot", "popover-trigger");
  });

  it("opens popover on trigger click", async () => {
    const screen = await render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <p>Popover body</p>
        </PopoverContent>
      </Popover>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await expect.element(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("renders close button inside content", async () => {
    const screen = await render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Close" }))
      .toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/popover/popover.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/popover/popover.tsx`:

```tsx
import { Popover as BasePopover } from "@base-ui/react/popover";
import "./popover.css";

export const Popover = BasePopover.Root;
export type PopoverProps = React.ComponentProps<typeof BasePopover.Root>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PopoverTrigger({ ...props }: PopoverTriggerProps) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function PopoverContent({
  className,
  children,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner>
        <BasePopover.Popup
          data-slot="popover-content"
          className={`sct-popover-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PopoverClose({ ...props }: PopoverCloseProps) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/popover/popover.css`:

```css
@scope (.sct-popover-content) {
  :scope {
    z-index: 50;
    width: 18rem;
    background-color: var(--sct-color-background);
    border: 1px solid var(--sct-color-border);
    border-radius: var(--sct-radius-lg);
    padding: 1rem;
    box-shadow: var(--sct-shadow-lg);
    outline: none;
    transition:
      opacity 200ms,
      transform 200ms;
  }

  @starting-style {
    :scope {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  :scope[data-ending-style] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/popover/registry.meta.json`:

```json
{
  "title": "Popover",
  "description": "A floating panel anchored to a trigger element.",
  "dependencies": ["@base-ui/react"],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/popover/popover.test.tsx`
Expected: All 4 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/popover/
git commit -m "feat(registry): add popover component"
```

---

## Task 10: Slider

**Files:**
- Create: `packages/registry/src/components/slider/slider.tsx`
- Create: `packages/registry/src/components/slider/slider.css`
- Create: `packages/registry/src/components/slider/slider.test.tsx`
- Create: `packages/registry/src/components/slider/registry.meta.json`

Base UI Slider parts: `Root`, `Control`, `Track`, `Indicator`, `Thumb`.

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/slider/slider.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Slider } from "./slider";

describe("Slider", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Slider defaultValue={50} />);
    await expect.element(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("sets data-slot on root", async () => {
    const screen = await render(
      <Slider defaultValue={50} data-testid="slider" />,
    );
    await expect
      .element(screen.getByTestId("slider"))
      .toHaveAttribute("data-slot", "slider");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <Slider defaultValue={50} className="my-class" data-testid="slider" />,
    );
    await expect
      .element(screen.getByTestId("slider"))
      .toHaveClass("sct-slider my-class");
  });

  it("renders with aria valuemin and valuemax", async () => {
    const screen = await render(
      <Slider defaultValue={25} min={0} max={100} />,
    );
    const slider = screen.getByRole("slider");
    await expect.element(slider).toHaveAttribute("aria-valuemin", "0");
    await expect.element(slider).toHaveAttribute("aria-valuemax", "100");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/slider/slider.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/slider/slider.tsx`:

```tsx
import { Slider as BaseSlider } from "@base-ui/react/slider";
import "./slider.css";

export interface SliderProps
  extends React.ComponentProps<typeof BaseSlider.Root> {
  className?: string;
}

export function Slider({ className, ...props }: SliderProps) {
  return (
    <BaseSlider.Root
      data-slot="slider"
      className={`sct-slider${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseSlider.Control data-slot="slider-control" className="sct-slider-control">
        <BaseSlider.Track data-slot="slider-track" className="sct-slider-track">
          <BaseSlider.Indicator
            data-slot="slider-range"
            className="sct-slider-range"
          />
          <BaseSlider.Thumb
            data-slot="slider-thumb"
            className="sct-slider-thumb"
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/slider/slider.css`:

```css
@scope (.sct-slider) {
  :scope {
    position: relative;
    display: flex;
    width: 100%;
    touch-action: none;
    user-select: none;
  }

  .sct-slider-control {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.25rem;
  }

  .sct-slider-track {
    position: relative;
    width: 100%;
    height: 0.25rem;
    border-radius: var(--sct-radius-full);
    background-color: var(--sct-color-muted);
    overflow: hidden;
  }

  .sct-slider-range {
    position: absolute;
    height: 100%;
    background-color: var(--sct-color-primary);
  }

  .sct-slider-thumb {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--sct-radius-full);
    border: 2px solid var(--sct-color-primary);
    background-color: var(--sct-color-background);
    box-shadow: var(--sct-shadow-xs);
    cursor: pointer;
    outline: none;
    transition:
      box-shadow 150ms,
      border-color 150ms;
  }

  .sct-slider-thumb:hover {
    border-color: color-mix(
      in srgb,
      var(--sct-color-primary) 80%,
      transparent
    );
  }

  .sct-slider-thumb:focus-visible {
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
  }

  .sct-slider-thumb[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/slider/registry.meta.json`:

```json
{
  "title": "Slider",
  "description": "A range input slider built on Base UI.",
  "dependencies": ["@base-ui/react"],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/slider/slider.test.tsx`
Expected: All 4 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/slider/
git commit -m "feat(registry): add slider component"
```

---

## Task 11: Collapsible

**Files:**
- Create: `packages/registry/src/components/collapsible/collapsible.tsx`
- Create: `packages/registry/src/components/collapsible/collapsible.css`
- Create: `packages/registry/src/components/collapsible/collapsible.test.tsx`
- Create: `packages/registry/src/components/collapsible/registry.meta.json`

Base UI Collapsible parts: `Root`, `Trigger`, `Panel`.

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/collapsible/collapsible.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

describe("Collapsible", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Toggle" }))
      .toBeInTheDocument();
  });

  it("sets data-slot on trigger", async () => {
    const screen = await render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Toggle" }))
      .toHaveAttribute("data-slot", "collapsible-trigger");
  });

  it("shows content when opened", async () => {
    const screen = await render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>,
    );
    await expect
      .element(screen.getByText("Visible content"))
      .toBeInTheDocument();
  });

  it("toggles content on trigger click", async () => {
    const screen = await render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Toggle me</CollapsibleContent>
      </Collapsible>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    await expect
      .element(screen.getByText("Toggle me"))
      .toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/collapsible/collapsible.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/collapsible/collapsible.tsx`:

```tsx
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import "./collapsible.css";

export const Collapsible = BaseCollapsible.Root;
export type CollapsibleProps = React.ComponentProps<
  typeof BaseCollapsible.Root
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function CollapsibleTrigger({ ...props }: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CollapsibleContent({
  className,
  ...props
}: CollapsibleContentProps) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-content"
      className={`sct-collapsible-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/collapsible/collapsible.css`:

```css
@scope (.sct-collapsible-content) {
  :scope {
    overflow: hidden;
    transition: height 200ms ease;
  }

  :scope[data-starting-style],
  :scope[data-ending-style] {
    height: 0;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/collapsible/registry.meta.json`:

```json
{
  "title": "Collapsible",
  "description": "A panel that can be expanded or collapsed.",
  "dependencies": ["@base-ui/react"],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/collapsible/collapsible.test.tsx`
Expected: All 4 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/collapsible/
git commit -m "feat(registry): add collapsible component"
```

---

## Task 12: Accordion

**Files:**
- Create: `packages/registry/src/components/accordion/accordion.tsx`
- Create: `packages/registry/src/components/accordion/accordion.css`
- Create: `packages/registry/src/components/accordion/accordion.test.tsx`
- Create: `packages/registry/src/components/accordion/registry.meta.json`

Base UI Accordion parts: `Root`, `Item`, `Header`, `Trigger`, `Panel`.

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/accordion/accordion.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

describe("Accordion", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <Accordion data-testid="accordion">
        <AccordionItem>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await expect.element(screen.getByTestId("accordion")).toBeInTheDocument();
  });

  it("sets data-slot on root", async () => {
    const screen = await render(
      <Accordion data-testid="accordion">
        <AccordionItem>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await expect
      .element(screen.getByTestId("accordion"))
      .toHaveAttribute("data-slot", "accordion");
  });

  it("renders trigger as button", async () => {
    const screen = await render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Toggle</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Toggle" }))
      .toBeInTheDocument();
  });

  it("expands content when trigger is clicked", async () => {
    const screen = await render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Toggle</AccordionTrigger>
          <AccordionContent>Expanded text</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    await expect
      .element(screen.getByText("Expanded text"))
      .toBeInTheDocument();
  });

  it("forwards className on root", async () => {
    const screen = await render(
      <Accordion data-testid="accordion" className="my-class">
        <AccordionItem>
          <AccordionTrigger>Item</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await expect
      .element(screen.getByTestId("accordion"))
      .toHaveClass("sct-accordion my-class");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/accordion/accordion.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/accordion/accordion.tsx`:

```tsx
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import "./accordion.css";

export interface AccordionProps
  extends React.ComponentProps<typeof BaseAccordion.Root> {
  className?: string;
}

export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <BaseAccordion.Root
      data-slot="accordion"
      className={`sct-accordion${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface AccordionItemProps
  extends React.ComponentProps<typeof BaseAccordion.Item> {
  className?: string;
}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={`sct-accordion-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="sct-accordion-header">
      <BaseAccordion.Trigger
        data-slot="accordion-trigger"
        className={`sct-accordion-trigger${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
        <svg
          className="sct-accordion-chevron"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function AccordionContent({
  className,
  ...props
}: AccordionContentProps) {
  return (
    <BaseAccordion.Panel
      data-slot="accordion-content"
      className={`sct-accordion-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/accordion/accordion.css`:

```css
@scope (.sct-accordion) {
  .sct-accordion-item {
    border-bottom: 1px solid var(--sct-color-border);
  }

  .sct-accordion-header {
    display: flex;
  }

  .sct-accordion-trigger {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding-block: 1rem;
    font-size: var(--sct-font-size-sm);
    font-weight: var(--sct-font-weight-medium);
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    text-align: left;
    color: inherit;
    transition: text-decoration 150ms;
  }

  .sct-accordion-trigger:hover {
    text-decoration: underline;
  }

  .sct-accordion-trigger:focus-visible {
    border-color: var(--sct-color-ring);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
  }

  .sct-accordion-chevron {
    flex-shrink: 0;
    transition: transform 200ms;
  }

  .sct-accordion-trigger[data-panel-open] .sct-accordion-chevron {
    transform: rotate(180deg);
  }

  .sct-accordion-content {
    overflow: hidden;
    font-size: var(--sct-font-size-sm);
    transition: height 200ms ease;
  }

  .sct-accordion-content[data-starting-style],
  .sct-accordion-content[data-ending-style] {
    height: 0;
  }

  .sct-accordion-content > div {
    padding-bottom: 1rem;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/accordion/registry.meta.json`:

```json
{
  "title": "Accordion",
  "description": "A vertically stacked set of expandable panels.",
  "dependencies": ["@base-ui/react"],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/accordion/accordion.test.tsx`
Expected: All 5 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/accordion/
git commit -m "feat(registry): add accordion component"
```

---

## Task 13: Alert Dialog

**Files:**
- Create: `packages/registry/src/components/alert-dialog/alert-dialog.tsx`
- Create: `packages/registry/src/components/alert-dialog/alert-dialog.css`
- Create: `packages/registry/src/components/alert-dialog/alert-dialog.test.tsx`
- Create: `packages/registry/src/components/alert-dialog/registry.meta.json`

Base UI AlertDialog parts: `Root`, `Trigger`, `Popup`, `Backdrop`, `Portal`, `Title`, `Description`, `Close`.

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/alert-dialog/alert-dialog.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";

describe("AlertDialog", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Delete" }))
      .toBeInTheDocument();
  });

  it("sets data-slot on trigger", async () => {
    const screen = await render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Sure?</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Delete" }))
      .toHaveAttribute("data-slot", "alert-dialog-trigger");
  });

  it("opens dialog on trigger click", async () => {
    const screen = await render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await expect.element(screen.getByRole("alertdialog")).toBeInTheDocument();
    await expect
      .element(screen.getByText("Confirm deletion"))
      .toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/alert-dialog/alert-dialog.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/alert-dialog/alert-dialog.tsx`:

```tsx
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import "./alert-dialog.css";

export const AlertDialog = BaseAlertDialog.Root;
export type AlertDialogProps = React.ComponentProps<
  typeof BaseAlertDialog.Root
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertDialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AlertDialogTrigger({ ...props }: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

export interface AlertDialogOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogOverlayProps) {
  return (
    <BaseAlertDialog.Backdrop
      data-slot="alert-dialog-overlay"
      className={`sct-alert-dialog-overlay${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function AlertDialogContent({
  className,
  children,
  ...props
}: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <AlertDialogOverlay />
      <BaseAlertDialog.Popup
        data-slot="alert-dialog-content"
        className={`sct-alert-dialog-content${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
}

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function AlertDialogHeader({
  className,
  ...props
}: AlertDialogHeaderProps) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={`sct-alert-dialog-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function AlertDialogFooter({
  className,
  ...props
}: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={`sct-alert-dialog-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface AlertDialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      data-slot="alert-dialog-title"
      className={`sct-alert-dialog-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface AlertDialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      data-slot="alert-dialog-description"
      className={`sct-alert-dialog-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertDialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AlertDialogAction({ ...props }: AlertDialogActionProps) {
  return <button data-slot="alert-dialog-action" {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertDialogCancelProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AlertDialogCancel({ ...props }: AlertDialogCancelProps) {
  return <BaseAlertDialog.Close data-slot="alert-dialog-cancel" {...props} />;
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/alert-dialog/alert-dialog.css`:

```css
@scope (.sct-alert-dialog-overlay) {
  :scope {
    position: fixed;
    inset: 0;
    background-color: color-mix(
      in srgb,
      var(--sct-color-foreground) 50%,
      transparent
    );
    z-index: 50;
    transition: opacity 200ms;
  }

  :scope[data-starting-style],
  :scope[data-ending-style] {
    opacity: 0;
  }
}

@scope (.sct-alert-dialog-content) {
  :scope {
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: 50;
    width: 90vw;
    max-width: 32rem;
    background-color: var(--sct-color-background);
    border: 1px solid var(--sct-color-border);
    border-radius: var(--sct-radius-lg);
    box-shadow: var(--sct-shadow-lg);
    padding: 1.5rem;
    outline: none;
    transition:
      opacity 200ms,
      transform 200ms;
  }

  @starting-style {
    :scope {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.95);
    }
  }

  :scope[data-ending-style] {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }

  .sct-alert-dialog-header {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin-bottom: 1rem;
  }

  .sct-alert-dialog-title {
    font-size: var(--sct-font-size-lg);
    font-weight: var(--sct-font-weight-semibold);
    color: var(--sct-color-foreground);
    line-height: var(--sct-line-height-tight);
  }

  .sct-alert-dialog-description {
    font-size: var(--sct-font-size-sm);
    color: var(--sct-color-muted-foreground);
  }

  .sct-alert-dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/alert-dialog/registry.meta.json`:

```json
{
  "title": "Alert Dialog",
  "description": "A modal dialog that requires user confirmation before proceeding.",
  "dependencies": ["@base-ui/react"],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/alert-dialog/alert-dialog.test.tsx`
Expected: All 3 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/alert-dialog/
git commit -m "feat(registry): add alert-dialog component"
```

---

## Task 14: Sheet

**Files:**
- Create: `packages/registry/src/components/sheet/sheet.tsx`
- Create: `packages/registry/src/components/sheet/sheet.css`
- Create: `packages/registry/src/components/sheet/sheet.test.tsx`
- Create: `packages/registry/src/components/sheet/registry.meta.json`

Sheet uses Base UI Dialog parts (same as existing Dialog) with side-sliding CSS.

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/sheet/sheet.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./sheet";

describe("Sheet", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Open" }))
      .toBeInTheDocument();
  });

  it("sets data-slot on trigger", async () => {
    const screen = await render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Open" }))
      .toHaveAttribute("data-slot", "sheet-trigger");
  });

  it("opens sheet on trigger click", async () => {
    const screen = await render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await expect.element(screen.getByRole("dialog")).toBeInTheDocument();
    await expect
      .element(screen.getByText("Sheet Title"))
      .toBeInTheDocument();
  });

  it("defaults to right side", async () => {
    const screen = await render(
      <Sheet open>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    await expect
      .element(screen.getByRole("dialog"))
      .toHaveAttribute("data-side", "right");
  });

  it("supports left side", async () => {
    const screen = await render(
      <Sheet open>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    await expect
      .element(screen.getByRole("dialog"))
      .toHaveAttribute("data-side", "left");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/sheet/sheet.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/sheet/sheet.tsx`:

```tsx
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import "./sheet.css";

export const Sheet = BaseDialog.Root;
export type SheetProps = React.ComponentProps<typeof BaseDialog.Root>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SheetTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SheetTrigger({ ...props }: SheetTriggerProps) {
  return <BaseDialog.Trigger data-slot="sheet-trigger" {...props} />;
}

export interface SheetOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <BaseDialog.Backdrop
      data-slot="sheet-overlay"
      className={`sct-sheet-overlay${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SheetContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
}

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: SheetContentProps) {
  return (
    <BaseDialog.Portal>
      <SheetOverlay />
      <BaseDialog.Popup
        data-slot="sheet-content"
        data-side={side}
        className={`sct-sheet-content${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={`sct-sheet-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      data-slot="sheet-footer"
      className={`sct-sheet-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SheetTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <BaseDialog.Title
      data-slot="sheet-title"
      className={`sct-sheet-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SheetDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function SheetDescription({
  className,
  ...props
}: SheetDescriptionProps) {
  return (
    <BaseDialog.Description
      data-slot="sheet-description"
      className={`sct-sheet-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SheetCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SheetClose({ ...props }: SheetCloseProps) {
  return <BaseDialog.Close data-slot="sheet-close" {...props} />;
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/sheet/sheet.css`:

```css
@scope (.sct-sheet-overlay) {
  :scope {
    position: fixed;
    inset: 0;
    background-color: color-mix(
      in srgb,
      var(--sct-color-foreground) 50%,
      transparent
    );
    z-index: 50;
    transition: opacity 200ms;
  }

  :scope[data-starting-style],
  :scope[data-ending-style] {
    opacity: 0;
  }
}

@scope (.sct-sheet-content) {
  :scope {
    position: fixed;
    z-index: 50;
    background-color: var(--sct-color-background);
    box-shadow: var(--sct-shadow-lg);
    padding: 1.5rem;
    outline: none;
    transition: transform 300ms ease;
  }

  /* Right (default) */
  :scope[data-side="right"] {
    top: 0;
    right: 0;
    bottom: 0;
    width: 75vw;
    max-width: 24rem;
    border-left: 1px solid var(--sct-color-border);
  }

  :scope[data-side="right"][data-starting-style],
  :scope[data-side="right"][data-ending-style] {
    transform: translateX(100%);
  }

  /* Left */
  :scope[data-side="left"] {
    top: 0;
    left: 0;
    bottom: 0;
    width: 75vw;
    max-width: 24rem;
    border-right: 1px solid var(--sct-color-border);
  }

  :scope[data-side="left"][data-starting-style],
  :scope[data-side="left"][data-ending-style] {
    transform: translateX(-100%);
  }

  /* Top */
  :scope[data-side="top"] {
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid var(--sct-color-border);
  }

  :scope[data-side="top"][data-starting-style],
  :scope[data-side="top"][data-ending-style] {
    transform: translateY(-100%);
  }

  /* Bottom */
  :scope[data-side="bottom"] {
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid var(--sct-color-border);
  }

  :scope[data-side="bottom"][data-starting-style],
  :scope[data-side="bottom"][data-ending-style] {
    transform: translateY(100%);
  }

  .sct-sheet-header {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin-bottom: 1rem;
  }

  .sct-sheet-title {
    font-size: var(--sct-font-size-lg);
    font-weight: var(--sct-font-weight-semibold);
    color: var(--sct-color-foreground);
  }

  .sct-sheet-description {
    font-size: var(--sct-font-size-sm);
    color: var(--sct-color-muted-foreground);
  }

  .sct-sheet-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/sheet/registry.meta.json`:

```json
{
  "title": "Sheet",
  "description": "A side-sliding panel dialog.",
  "dependencies": ["@base-ui/react"],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/sheet/sheet.test.tsx`
Expected: All 5 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/sheet/
git commit -m "feat(registry): add sheet component"
```

---

## Task 15: Resizable

**Files:**
- Create: `packages/registry/src/components/resizable/resizable.tsx`
- Create: `packages/registry/src/components/resizable/resizable.css`
- Create: `packages/registry/src/components/resizable/resizable.test.tsx`
- Create: `packages/registry/src/components/resizable/registry.meta.json`

Wraps `react-resizable-panels`: `PanelGroup`, `Panel`, `PanelResizeHandle`.

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/resizable/resizable.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable";

describe("ResizablePanelGroup", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <ResizablePanelGroup direction="horizontal" data-testid="group">
        <ResizablePanel>Panel 1</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Panel 2</ResizablePanel>
      </ResizablePanelGroup>,
    );
    await expect.element(screen.getByTestId("group")).toBeInTheDocument();
  });

  it("sets data-slot on group", async () => {
    const screen = await render(
      <ResizablePanelGroup direction="horizontal" data-testid="group">
        <ResizablePanel>Panel 1</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Panel 2</ResizablePanel>
      </ResizablePanelGroup>,
    );
    await expect
      .element(screen.getByTestId("group"))
      .toHaveAttribute("data-slot", "resizable-panel-group");
  });

  it("renders panels with content", async () => {
    const screen = await render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    );
    await expect.element(screen.getByText("Left")).toBeInTheDocument();
    await expect.element(screen.getByText("Right")).toBeInTheDocument();
  });

  it("renders handle with separator role", async () => {
    const screen = await render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>A</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>B</ResizablePanel>
      </ResizablePanelGroup>,
    );
    await expect.element(screen.getByRole("separator")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/resizable/resizable.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/resizable/resizable.tsx`:

```tsx
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";
import type { ComponentProps } from "react";
import "./resizable.css";

export interface ResizablePanelGroupProps
  extends ComponentProps<typeof PanelGroup> {}

export function ResizablePanelGroup({
  className,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <PanelGroup
      data-slot="resizable-panel-group"
      className={`sct-resizable-panel-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ResizablePanelProps extends ComponentProps<typeof Panel> {}

export function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return (
    <Panel
      data-slot="resizable-panel"
      className={`sct-resizable-panel${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ResizableHandleProps
  extends ComponentProps<typeof PanelResizeHandle> {}

export function ResizableHandle({
  className,
  ...props
}: ResizableHandleProps) {
  return (
    <PanelResizeHandle
      data-slot="resizable-handle"
      className={`sct-resizable-handle${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/resizable/resizable.css`:

```css
@scope (.sct-resizable-panel-group) {
  :scope {
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .sct-resizable-handle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--sct-color-border);
    transition: background-color 150ms;
    outline: none;
  }

  .sct-resizable-handle:hover {
    background-color: var(--sct-color-primary);
  }

  .sct-resizable-handle:focus-visible {
    background-color: var(--sct-color-ring);
  }

  /* Horizontal layout: handle is a vertical bar */
  :scope[data-panel-group-direction="horizontal"] > .sct-resizable-handle {
    width: 3px;
    cursor: col-resize;
  }

  /* Vertical layout: handle is a horizontal bar */
  :scope[data-panel-group-direction="vertical"] > .sct-resizable-handle {
    height: 3px;
    cursor: row-resize;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/resizable/registry.meta.json`:

```json
{
  "title": "Resizable",
  "description": "Resizable panel groups with draggable handles.",
  "dependencies": ["react-resizable-panels"],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/resizable/resizable.test.tsx`
Expected: All 4 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/resizable/
git commit -m "feat(registry): add resizable component"
```

---

## Task 16: Toast

**Files:**
- Create: `packages/registry/src/components/toast/toast.tsx`
- Create: `packages/registry/src/components/toast/toast.css`
- Create: `packages/registry/src/components/toast/toast.test.tsx`
- Create: `packages/registry/src/components/toast/registry.meta.json`

Base UI Toast parts: `Provider`, `Viewport`, `Root`, `Content`, `Title`, `Description`, `Close`, `Action`, `Portal`, `Positioner`. Also exports `useToastManager` and `createToastManager`.

The `Toast` component wraps `Toast.Root` (takes a `toast` object prop) and applies variant styling via `data-variant` based on `toast.type`. `ToastViewport` renders Base UI's `Toast.Viewport`.

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/toast/toast.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Toast as BaseToast } from "@base-ui/react/toast";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./toast";

// Helper: wrap in provider with a fake toast object
function renderToast(
  ui: React.ReactNode,
  type?: string,
) {
  const toast = {
    id: "test-toast",
    title: "Test",
    type,
  };
  return render(
    <ToastProvider>
      <ToastViewport data-testid="viewport">
        <BaseToast.Root toast={toast}>
          {ui}
        </BaseToast.Root>
      </ToastViewport>
    </ToastProvider>,
  );
}

describe("ToastProvider", () => {
  it("renders children", async () => {
    const screen = await render(
      <ToastProvider>
        <div data-testid="child">Hello</div>
      </ToastProvider>,
    );
    await expect.element(screen.getByTestId("child")).toBeInTheDocument();
  });
});

describe("ToastViewport", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <ToastProvider>
        <ToastViewport data-testid="viewport" />
      </ToastProvider>,
    );
    await expect.element(screen.getByTestId("viewport")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <ToastProvider>
        <ToastViewport data-testid="viewport" />
      </ToastProvider>,
    );
    await expect
      .element(screen.getByTestId("viewport"))
      .toHaveAttribute("data-slot", "toast-viewport");
  });
});

describe("Toast sub-components", () => {
  it("renders ToastTitle", async () => {
    const screen = await renderToast(
      <BaseToast.Content>
        <ToastTitle>Success!</ToastTitle>
      </BaseToast.Content>,
    );
    await expect.element(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("renders ToastDescription", async () => {
    const screen = await renderToast(
      <BaseToast.Content>
        <ToastDescription>Details here</ToastDescription>
      </BaseToast.Content>,
    );
    await expect.element(screen.getByText("Details here")).toBeInTheDocument();
  });

  it("renders ToastClose", async () => {
    const screen = await renderToast(
      <BaseToast.Content>
        <ToastClose>Dismiss</ToastClose>
      </BaseToast.Content>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Dismiss" }))
      .toBeInTheDocument();
  });

  it("renders ToastAction", async () => {
    const screen = await renderToast(
      <BaseToast.Content>
        <ToastAction>Undo</ToastAction>
      </BaseToast.Content>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Undo" }))
      .toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/toast/toast.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/toast/toast.tsx`:

```tsx
import { Toast as BaseToast } from "@base-ui/react/toast";
import "./toast.css";

export { useToastManager } from "@base-ui/react/toast";
export { createToastManager } from "@base-ui/react/toast";

export const ToastProvider = BaseToast.Provider;
export type ToastProviderProps = React.ComponentProps<typeof BaseToast.Provider>;

export interface ToastViewportProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ToastViewport({ className, ...props }: ToastViewportProps) {
  return (
    <BaseToast.Viewport
      data-slot="toast-viewport"
      className={`sct-toast-viewport${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ToastProps
  extends React.ComponentProps<typeof BaseToast.Root> {}

export function Toast({ className, ...props }: ToastProps) {
  const variant = props.toast?.type ?? "default";
  return (
    <BaseToast.Root
      data-slot="toast"
      data-variant={variant}
      className={`sct-toast${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ToastContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ToastContent({ className, ...props }: ToastContentProps) {
  return (
    <BaseToast.Content
      data-slot="toast-content"
      className={`sct-toast-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ToastTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <BaseToast.Title
      data-slot="toast-title"
      className={`sct-toast-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ToastDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return (
    <BaseToast.Description
      data-slot="toast-description"
      className={`sct-toast-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToastCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ToastClose({ ...props }: ToastCloseProps) {
  return <BaseToast.Close data-slot="toast-close" {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToastActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ToastAction({ ...props }: ToastActionProps) {
  return <BaseToast.Action data-slot="toast-action" {...props} />;
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/toast/toast.css`:

```css
@scope (.sct-toast-viewport) {
  :scope {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 100vh;
    width: 100%;
    max-width: 26rem;
    padding: 1rem;
    outline: none;
  }
}

@scope (.sct-toast) {
  :scope {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem;
    border-radius: var(--sct-radius-lg);
    border: 1px solid var(--sct-color-border);
    background-color: var(--sct-color-background);
    box-shadow: var(--sct-shadow-lg);
    transition:
      opacity 200ms,
      transform 200ms;
  }

  @starting-style {
    :scope {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  :scope[data-ending-style] {
    opacity: 0;
    transform: translateY(100%);
  }

  :scope[data-variant="success"] {
    border-color: var(--sct-color-success);
  }

  :scope[data-variant="destructive"] {
    border-color: var(--sct-color-destructive);
    color: var(--sct-color-destructive);
  }

  :scope[data-variant="warning"] {
    border-color: var(--sct-color-warning);
  }

  :scope[data-variant="info"] {
    border-color: var(--sct-color-info);
  }

  .sct-toast-content {
    flex: 1;
  }

  .sct-toast-title {
    font-size: var(--sct-font-size-sm);
    font-weight: var(--sct-font-weight-semibold);
  }

  .sct-toast-description {
    font-size: var(--sct-font-size-sm);
    color: var(--sct-color-muted-foreground);
    margin-top: 0.25rem;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/toast/registry.meta.json`:

```json
{
  "title": "Toast",
  "description": "Dismissable notification messages built on Base UI Toast.",
  "dependencies": ["@base-ui/react"],
  "devDependencies": [],
  "registryDependencies": []
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/toast/toast.test.tsx`
Expected: All 6 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/toast/
git commit -m "feat(registry): add toast component"
```

---

## Task 17: Field (Layer 1)

**Files:**
- Create: `packages/registry/src/components/field/field.tsx`
- Create: `packages/registry/src/components/field/field.css`
- Create: `packages/registry/src/components/field/field.test.tsx`
- Create: `packages/registry/src/components/field/registry.meta.json`

Base UI Field parts: `Root`, `Label`, `Description`, `Error`, `Control`, `Validity`.
Base UI Fieldset parts: `Root`, `Legend`.

This component depends on the `separator` component (Task 3) for `FieldSeparator`.

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/field/field.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldSeparator,
} from "./field";

describe("Field", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <Field data-testid="field">
        <FieldLabel>Name</FieldLabel>
        <input />
      </Field>,
    );
    await expect.element(screen.getByTestId("field")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <Field data-testid="field">
        <FieldLabel>Name</FieldLabel>
      </Field>,
    );
    await expect
      .element(screen.getByTestId("field"))
      .toHaveAttribute("data-slot", "field");
  });

  it("renders label", async () => {
    const screen = await render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <input type="email" />
      </Field>,
    );
    await expect.element(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders description", async () => {
    const screen = await render(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <FieldDescription>Enter your full name</FieldDescription>
        <input />
      </Field>,
    );
    await expect
      .element(screen.getByText("Enter your full name"))
      .toBeInTheDocument();
  });

  it("renders error message", async () => {
    const screen = await render(
      <Field invalid>
        <FieldLabel>Name</FieldLabel>
        <input />
        <FieldError>This field is required</FieldError>
      </Field>,
    );
    await expect
      .element(screen.getByText("This field is required"))
      .toBeInTheDocument();
  });
});

describe("FieldSet", () => {
  it("renders fieldset with legend", async () => {
    const screen = await render(
      <FieldSet>
        <FieldLegend>Contact Info</FieldLegend>
      </FieldSet>,
    );
    await expect.element(screen.getByRole("group")).toBeInTheDocument();
    await expect
      .element(screen.getByText("Contact Info"))
      .toBeInTheDocument();
  });
});

describe("FieldGroup", () => {
  it("renders with data-slot", async () => {
    const screen = await render(<FieldGroup data-testid="fg" />);
    await expect
      .element(screen.getByTestId("fg"))
      .toHaveAttribute("data-slot", "field-group");
  });
});

describe("FieldContent", () => {
  it("renders with data-slot", async () => {
    const screen = await render(<FieldContent data-testid="fc" />);
    await expect
      .element(screen.getByTestId("fc"))
      .toHaveAttribute("data-slot", "field-content");
  });
});

describe("FieldSeparator", () => {
  it("renders separator", async () => {
    const screen = await render(<FieldSeparator />);
    await expect.element(screen.getByRole("none")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/field/field.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/field/field.tsx`:

```tsx
import { Field as BaseField } from "@base-ui/react/field";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { Separator } from "../separator/separator";
import "./field.css";

// --- Field (single field) ---

export interface FieldProps
  extends React.ComponentProps<typeof BaseField.Root> {
  className?: string;
}

export function Field({ className, ...props }: FieldProps) {
  return (
    <BaseField.Root
      data-slot="field"
      className={`sct-field${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface FieldLabelProps
  extends React.ComponentProps<typeof BaseField.Label> {
  className?: string;
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      data-slot="field-label"
      className={`sct-field-label${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface FieldDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function FieldDescription({
  className,
  ...props
}: FieldDescriptionProps) {
  return (
    <BaseField.Description
      data-slot="field-description"
      className={`sct-field-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <BaseField.Error
      data-slot="field-error"
      className={`sct-field-error${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export const FieldValidity = BaseField.Validity;
export type FieldValidityProps = React.ComponentProps<typeof BaseField.Validity>;

// --- Fieldset ---

export interface FieldSetProps
  extends React.ComponentProps<typeof BaseFieldset.Root> {
  className?: string;
}

export function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <BaseFieldset.Root
      data-slot="fieldset"
      className={`sct-fieldset${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface FieldLegendProps
  extends React.HTMLAttributes<HTMLLegendElement> {}

export function FieldLegend({ className, ...props }: FieldLegendProps) {
  return (
    <BaseFieldset.Legend
      data-slot="field-legend"
      className={`sct-field-legend${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// --- Layout helpers ---

export type FieldGroupProps = React.HTMLAttributes<HTMLDivElement>;

export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={`sct-field-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type FieldContentProps = React.HTMLAttributes<HTMLDivElement>;

export function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      data-slot="field-content"
      className={`sct-field-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type FieldSeparatorProps = React.ComponentProps<typeof Separator>;

export function FieldSeparator(props: FieldSeparatorProps) {
  return <Separator data-slot="field-separator" {...props} />;
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/field/field.css`:

```css
@scope (.sct-field) {
  :scope {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .sct-field-label {
    font-size: var(--sct-font-size-sm);
    font-weight: var(--sct-font-weight-medium);
    color: var(--sct-color-foreground);
  }

  :scope[data-invalid] .sct-field-label {
    color: var(--sct-color-destructive);
  }

  .sct-field-description {
    font-size: var(--sct-font-size-xs);
    color: var(--sct-color-muted-foreground);
  }

  .sct-field-error {
    font-size: var(--sct-font-size-xs);
    color: var(--sct-color-destructive);
    font-weight: var(--sct-font-weight-medium);
  }
}

@scope (.sct-fieldset) {
  :scope {
    border: 1px solid var(--sct-color-border);
    border-radius: var(--sct-radius-lg);
    padding: 1rem;
  }

  .sct-field-legend {
    font-size: var(--sct-font-size-sm);
    font-weight: var(--sct-font-weight-semibold);
    padding-inline: 0.25rem;
  }
}

@scope (.sct-field-group) {
  :scope {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

@scope (.sct-field-content) {
  :scope {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/field/registry.meta.json`:

```json
{
  "title": "Field",
  "description": "Accessible form field with label, description, and error messaging.",
  "dependencies": ["@base-ui/react"],
  "devDependencies": [],
  "registryDependencies": ["separator", "label"]
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/field/field.test.tsx`
Expected: All 9 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/field/
git commit -m "feat(registry): add field component"
```

---

## Task 18: Sidebar — Context and State

**Files:**
- Create: `packages/registry/src/components/sidebar/sidebar.tsx`
- Create: `packages/registry/src/components/sidebar/sidebar.css`
- Create: `packages/registry/src/components/sidebar/sidebar.test.tsx`
- Create: `packages/registry/src/components/sidebar/registry.meta.json`

The Sidebar is the most complex component. This task creates the full file with all sub-components. The sidebar depends on: `button`, `collapsible`, `sheet`, `separator`, `skeleton`, `scroll-area`, `tooltip`, `input` (all must be implemented first).

- [ ] **Step 1: Write the test**

Create `packages/registry/src/components/sidebar/sidebar.test.tsx`:

```tsx
import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInset,
} from "./sidebar";

describe("SidebarProvider", () => {
  it("renders children", async () => {
    const screen = await render(
      <SidebarProvider>
        <div data-testid="child">Hello</div>
      </SidebarProvider>,
    );
    await expect.element(screen.getByTestId("child")).toBeInTheDocument();
  });
});

describe("Sidebar", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar data-testid="sidebar">
          <SidebarContent>Nav content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect.element(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar data-testid="sidebar">
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect
      .element(screen.getByTestId("sidebar"))
      .toHaveAttribute("data-slot", "sidebar");
  });

  it("defaults to left side", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar data-testid="sidebar">
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect
      .element(screen.getByTestId("sidebar"))
      .toHaveAttribute("data-side", "left");
  });
});

describe("SidebarTrigger", () => {
  it("renders a button", async () => {
    const screen = await render(
      <SidebarProvider>
        <SidebarTrigger>Toggle</SidebarTrigger>
        <Sidebar>
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Toggle" }))
      .toBeInTheDocument();
  });
});

describe("Sidebar sections", () => {
  it("renders header, content, footer", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader data-testid="header">Header</SidebarHeader>
          <SidebarContent data-testid="content">Content</SidebarContent>
          <SidebarFooter data-testid="footer">Footer</SidebarFooter>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect.element(screen.getByTestId("header")).toBeInTheDocument();
    await expect.element(screen.getByTestId("content")).toBeInTheDocument();
    await expect.element(screen.getByTestId("footer")).toBeInTheDocument();
  });
});

describe("SidebarMenu", () => {
  it("renders menu items", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Home</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect
      .element(screen.getByText("Home"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("Navigation"))
      .toBeInTheDocument();
  });
});

describe("SidebarInset", () => {
  it("renders with data-slot", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
        <SidebarInset data-testid="inset">Main content</SidebarInset>
      </SidebarProvider>,
    );
    await expect
      .element(screen.getByTestId("inset"))
      .toHaveAttribute("data-slot", "sidebar-inset");
  });
});

describe("SidebarSeparator", () => {
  it("renders separator", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarSeparator />
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect.element(screen.getByRole("none")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/registry && npx vitest run src/components/sidebar/sidebar.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write the component**

Create `packages/registry/src/components/sidebar/sidebar.tsx`:

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Separator } from "../separator/separator";
import { Skeleton } from "../skeleton/skeleton";
import { Sheet, SheetContent } from "../sheet/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip/tooltip";
import "./sidebar.css";

// ---- Context ----

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  state: "expanded" | "collapsed";
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return ctx;
}

// ---- Provider ----

export interface SidebarProviderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SidebarProvider({
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = useCallback(
    (value: boolean) => {
      onOpenChange?.(value);
      if (controlledOpen === undefined) {
        setUncontrolledOpen(value);
      }
    },
    [controlledOpen, onOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const value = useMemo(
    () => ({ open, setOpen, toggleSidebar, isMobile, state }),
    [open, setOpen, toggleSidebar, isMobile, state],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-provider"
        data-sidebar-state={state}
        className={`sct-sidebar-provider${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

// ---- Main Sidebar ----

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: SidebarProps) {
  const { open, setOpen, isMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <aside
        data-slot="sidebar"
        data-side={side}
        data-variant={variant}
        data-collapsible="none"
        className={`sct-sidebar${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
      </aside>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={side}
          data-slot="sidebar"
          data-mobile="true"
          className={`sct-sidebar sct-sidebar-mobile${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      data-slot="sidebar"
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      data-state={open ? "expanded" : "collapsed"}
      className={`sct-sidebar${className ? ` ${className}` : ""}`}
      {...props}
    >
      <div className="sct-sidebar-inner">{children}</div>
    </aside>
  );
}

// ---- Trigger ----

export interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      data-slot="sidebar-trigger"
      className={`sct-sidebar-trigger${className ? ` ${className}` : ""}`}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    />
  );
}

// ---- Rail ----

export type SidebarRailProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SidebarRail({
  className,
  onClick,
  ...props
}: SidebarRailProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      data-slot="sidebar-rail"
      className={`sct-sidebar-rail${className ? ` ${className}` : ""}`}
      tabIndex={-1}
      aria-label="Toggle sidebar"
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    />
  );
}

// ---- Inset ----

export type SidebarInsetProps = React.HTMLAttributes<HTMLElement>;

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return (
    <main
      data-slot="sidebar-inset"
      className={`sct-sidebar-inset${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// ---- Sections ----

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      data-slot="sidebar-header"
      className={`sct-sidebar-section-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      data-slot="sidebar-content"
      className={`sct-sidebar-section-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      data-slot="sidebar-footer"
      className={`sct-sidebar-section-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;

export function SidebarSeparator(props: SidebarSeparatorProps) {
  return <Separator data-slot="sidebar-separator" {...props} />;
}

// ---- Group ----

export type SidebarGroupProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div
      data-slot="sidebar-group"
      className={`sct-sidebar-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarGroupLabelProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarGroupLabel({
  className,
  ...props
}: SidebarGroupLabelProps) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={`sct-sidebar-group-label${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarGroupActionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SidebarGroupAction({
  className,
  ...props
}: SidebarGroupActionProps) {
  return (
    <button
      data-slot="sidebar-group-action"
      className={`sct-sidebar-group-action${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarGroupContentProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarGroupContent({
  className,
  ...props
}: SidebarGroupContentProps) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={`sct-sidebar-group-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// ---- Menu ----

export type SidebarMenuProps = React.HTMLAttributes<HTMLUListElement>;

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={`sct-sidebar-menu${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarMenuItemProps = React.LiHTMLAttributes<HTMLLIElement>;

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={`sct-sidebar-menu-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  tooltip?: string;
}

export function SidebarMenuButton({
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const button = (
    <button
      data-slot="sidebar-menu-button"
      data-active={isActive ? "" : undefined}
      data-variant={variant}
      data-size={size}
      className={`sct-sidebar-menu-button${className ? ` ${className}` : ""}`}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={button} />
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export type SidebarMenuActionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SidebarMenuAction({
  className,
  ...props
}: SidebarMenuActionProps) {
  return (
    <button
      data-slot="sidebar-menu-action"
      className={`sct-sidebar-menu-action${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarMenuBadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function SidebarMenuBadge({
  className,
  ...props
}: SidebarMenuBadgeProps) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className={`sct-sidebar-menu-badge${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SidebarMenuSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean;
}

export function SidebarMenuSkeleton({
  showIcon = false,
  className,
  ...props
}: SidebarMenuSkeletonProps) {
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      className={`sct-sidebar-menu-skeleton${className ? ` ${className}` : ""}`}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="sct-sidebar-menu-skeleton-icon"
          style={{ width: "1rem", height: "1rem" }}
        />
      )}
      <Skeleton
        className="sct-sidebar-menu-skeleton-text"
        style={{ height: "0.75rem", flex: 1 }}
      />
    </div>
  );
}

export type SidebarMenuSubProps = React.HTMLAttributes<HTMLUListElement>;

export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={`sct-sidebar-menu-sub${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarMenuSubItemProps = React.LiHTMLAttributes<HTMLLIElement>;

export function SidebarMenuSubItem({
  className,
  ...props
}: SidebarMenuSubItemProps) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={`sct-sidebar-menu-sub-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SidebarMenuSubButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function SidebarMenuSubButton({
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  return (
    <button
      data-slot="sidebar-menu-sub-button"
      data-active={isActive ? "" : undefined}
      className={`sct-sidebar-menu-sub-button${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Write the CSS**

Create `packages/registry/src/components/sidebar/sidebar.css`:

```css
@scope (.sct-sidebar-provider) {
  :scope {
    display: flex;
    min-height: 100%;
    width: 100%;
  }
}

@scope (.sct-sidebar) {
  :scope {
    display: flex;
    flex-direction: column;
    width: var(--sct-sidebar-width);
    min-height: 100%;
    background-color: var(--sct-color-background);
    border-right: 1px solid var(--sct-color-border);
    transition: width 200ms ease;
    flex-shrink: 0;
    overflow: hidden;
  }

  :scope[data-side="right"] {
    border-right: none;
    border-left: 1px solid var(--sct-color-border);
  }

  :scope[data-variant="floating"] {
    border: 1px solid var(--sct-color-border);
    border-radius: var(--sct-radius-lg);
    margin: 0.5rem;
    box-shadow: var(--sct-shadow-sm);
  }

  :scope[data-variant="inset"] {
    border: none;
  }

  :scope[data-collapsible="icon"][data-state="collapsed"] {
    width: var(--sct-sidebar-width-collapsed);
  }

  :scope[data-collapsible="offcanvas"][data-state="collapsed"] {
    width: 0;
    overflow: hidden;
  }

  .sct-sidebar-inner {
    display: flex;
    flex-direction: column;
    width: var(--sct-sidebar-width);
    min-height: 100%;
    overflow: hidden;
  }

  /* Sections */
  .sct-sidebar-section-header {
    padding: 0.75rem 1rem;
  }

  .sct-sidebar-section-content {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
  }

  .sct-sidebar-section-footer {
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--sct-color-border);
  }

  /* Group */
  .sct-sidebar-group {
    padding: 0.5rem 0;
  }

  .sct-sidebar-group-label {
    padding: 0.25rem 0.75rem;
    font-size: var(--sct-font-size-xs);
    font-weight: var(--sct-font-weight-semibold);
    color: var(--sct-color-muted-foreground);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .sct-sidebar-group-action {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--sct-color-muted-foreground);
    padding: 0.25rem;
    border-radius: var(--sct-radius-sm);
  }

  .sct-sidebar-group-action:hover {
    color: var(--sct-color-foreground);
  }

  /* Menu */
  .sct-sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .sct-sidebar-menu-item {
    position: relative;
  }

  .sct-sidebar-menu-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: var(--sct-font-size-sm);
    background: none;
    border: none;
    border-radius: var(--sct-radius-md);
    cursor: pointer;
    color: var(--sct-color-foreground);
    text-align: left;
    outline: none;
    transition: background-color 150ms;
  }

  .sct-sidebar-menu-button:hover {
    background-color: var(--sct-color-accent);
  }

  .sct-sidebar-menu-button:focus-visible {
    box-shadow: 0 0 0 2px var(--sct-color-ring);
  }

  .sct-sidebar-menu-button[data-active] {
    background-color: var(--sct-color-accent);
    font-weight: var(--sct-font-weight-medium);
  }

  .sct-sidebar-menu-button[data-variant="outline"] {
    border: 1px solid var(--sct-color-border);
  }

  .sct-sidebar-menu-button[data-size="sm"] {
    padding: 0.25rem 0.5rem;
    font-size: var(--sct-font-size-xs);
  }

  .sct-sidebar-menu-button[data-size="lg"] {
    padding: 0.75rem 1rem;
  }

  .sct-sidebar-menu-button svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  .sct-sidebar-menu-action {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: var(--sct-radius-sm);
    color: var(--sct-color-muted-foreground);
    opacity: 0;
  }

  .sct-sidebar-menu-item:hover .sct-sidebar-menu-action {
    opacity: 1;
  }

  .sct-sidebar-menu-badge {
    margin-left: auto;
    font-size: var(--sct-font-size-xs);
    color: var(--sct-color-muted-foreground);
  }

  .sct-sidebar-menu-skeleton {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
  }

  /* Sub menu */
  .sct-sidebar-menu-sub {
    list-style: none;
    padding: 0;
    margin: 0;
    padding-left: 1.5rem;
    border-left: 1px solid var(--sct-color-border);
    margin-left: 0.75rem;
  }

  .sct-sidebar-menu-sub-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: var(--sct-font-size-xs);
    background: none;
    border: none;
    border-radius: var(--sct-radius-md);
    cursor: pointer;
    color: var(--sct-color-muted-foreground);
    text-align: left;
    outline: none;
    transition: background-color 150ms;
  }

  .sct-sidebar-menu-sub-button:hover {
    background-color: var(--sct-color-accent);
    color: var(--sct-color-foreground);
  }

  .sct-sidebar-menu-sub-button[data-active] {
    color: var(--sct-color-foreground);
    font-weight: var(--sct-font-weight-medium);
  }
}

/* Trigger */
@scope (.sct-sidebar-trigger) {
  :scope {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    border-radius: var(--sct-radius-md);
    cursor: pointer;
    color: var(--sct-color-foreground);
    outline: none;
  }

  :scope:hover {
    background-color: var(--sct-color-accent);
  }

  :scope:focus-visible {
    box-shadow: 0 0 0 2px var(--sct-color-ring);
  }
}

/* Rail */
@scope (.sct-sidebar-rail) {
  :scope {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
    background: transparent;
    border: none;
    cursor: col-resize;
    outline: none;
    z-index: 1;
  }

  :scope:hover {
    background-color: var(--sct-color-primary);
  }
}

/* Inset */
@scope (.sct-sidebar-inset) {
  :scope {
    flex: 1;
    min-width: 0;
  }
}

/* Mobile sheet override */
.sct-sidebar-mobile {
  width: var(--sct-sidebar-width) !important;
  max-width: var(--sct-sidebar-width) !important;
}
```

- [ ] **Step 5: Write registry metadata**

Create `packages/registry/src/components/sidebar/registry.meta.json`:

```json
{
  "title": "Sidebar",
  "description": "A responsive sidebar navigation with collapsible, mobile, and icon-only modes.",
  "dependencies": ["@base-ui/react"],
  "devDependencies": [],
  "registryDependencies": [
    "button",
    "collapsible",
    "sheet",
    "separator",
    "skeleton",
    "scroll-area",
    "tooltip",
    "input"
  ]
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/registry && npx vitest run src/components/sidebar/sidebar.test.tsx`
Expected: All 8 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/registry/src/components/sidebar/
git commit -m "feat(registry): add sidebar component"
```

---

## Task 19: Index Exports

**Files:**
- Modify: `packages/registry/src/index.ts`

- [ ] **Step 1: Add all new component exports to index.ts**

Append the following to the end of `packages/registry/src/index.ts` (before the `cx` export):

```tsx
export { Separator } from "./components/separator/separator";
export type { SeparatorProps } from "./components/separator/separator";

export { Skeleton } from "./components/skeleton/skeleton";
export type { SkeletonProps } from "./components/skeleton/skeleton";

export { ScrollArea, ScrollBar } from "./components/scroll-area/scroll-area";
export type {
  ScrollAreaProps,
  ScrollBarProps,
} from "./components/scroll-area/scroll-area";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./components/table/table";
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from "./components/table/table";

export { ButtonGroup } from "./components/button-group/button-group";
export type { ButtonGroupProps } from "./components/button-group/button-group";

export {
  InputGroup,
  InputGroupAddon,
} from "./components/input-group/input-group";
export type {
  InputGroupProps,
  InputGroupAddonProps,
} from "./components/input-group/input-group";

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "./components/popover/popover";
export type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverCloseProps,
} from "./components/popover/popover";

export { Slider } from "./components/slider/slider";
export type { SliderProps } from "./components/slider/slider";

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/collapsible/collapsible";
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from "./components/collapsible/collapsible";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/accordion/accordion";
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./components/accordion/accordion";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./components/alert-dialog/alert-dialog";
export type {
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from "./components/alert-dialog/alert-dialog";

export {
  Sheet,
  SheetTrigger,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./components/sheet/sheet";
export type {
  SheetProps,
  SheetTriggerProps,
  SheetOverlayProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetCloseProps,
} from "./components/sheet/sheet";

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./components/resizable/resizable";
export type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from "./components/resizable/resizable";

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  useToastManager,
  createToastManager,
} from "./components/toast/toast";
export type {
  ToastProviderProps,
  ToastViewportProps,
  ToastProps,
  ToastContentProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastCloseProps,
  ToastActionProps,
} from "./components/toast/toast";

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldValidity,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldSeparator,
} from "./components/field/field";
export type {
  FieldProps,
  FieldLabelProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldValidityProps,
  FieldSetProps,
  FieldLegendProps,
  FieldGroupProps,
  FieldContentProps,
  FieldSeparatorProps,
} from "./components/field/field";

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "./components/sidebar/sidebar";
export type {
  SidebarProviderProps,
  SidebarProps,
  SidebarTriggerProps,
  SidebarRailProps,
  SidebarInsetProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarFooterProps,
  SidebarSeparatorProps,
  SidebarGroupProps,
  SidebarGroupLabelProps,
  SidebarGroupActionProps,
  SidebarGroupContentProps,
  SidebarMenuProps,
  SidebarMenuItemProps,
  SidebarMenuButtonProps,
  SidebarMenuActionProps,
  SidebarMenuBadgeProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubButtonProps,
} from "./components/sidebar/sidebar";
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npm run typecheck -w packages/registry`
Expected: No errors

- [ ] **Step 3: Verify full build**

Run: `npm run build -w packages/registry`
Expected: Build completes successfully, `registry/registry.json` includes all 33 components (17 existing + 16 new)

- [ ] **Step 4: Run all tests**

Run: `npm run test -w packages/registry`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/registry/src/index.ts
git commit -m "feat(registry): export all new components from index"
```

---

## Task 20: Stories — Simple Components

**Files:**
- Create: `apps/docs/src/stories/Separator.stories.tsx`
- Create: `apps/docs/src/stories/Skeleton.stories.tsx`
- Create: `apps/docs/src/stories/ScrollArea.stories.tsx`
- Create: `apps/docs/src/stories/Table.stories.tsx`
- Create: `apps/docs/src/stories/ButtonGroup.stories.tsx`
- Create: `apps/docs/src/stories/InputGroup.stories.tsx`

- [ ] **Step 1: Write Separator story**

Create `apps/docs/src/stories/Separator.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@webscit/registry";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: { control: "boolean" },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", height: "24px" }}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};

export const Playground: Story = {
  args: { orientation: "horizontal", decorative: true },
};
```

- [ ] **Step 2: Write Skeleton story**

Create `apps/docs/src/stories/Skeleton.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@webscit/registry";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "300px" }}>
      <Skeleton style={{ height: "1rem", width: "80%" }} />
      <Skeleton style={{ height: "1rem", width: "60%" }} />
      <Skeleton style={{ height: "1rem", width: "70%" }} />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Skeleton style={{ width: "48px", height: "48px", borderRadius: "50%" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton style={{ height: "1rem", width: "200px" }} />
        <Skeleton style={{ height: "0.75rem", width: "150px" }} />
      </div>
    </div>
  ),
};
```

- [ ] **Step 3: Write ScrollArea story**

Create `apps/docs/src/stories/ScrollArea.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "@webscit/registry";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: "200px", width: "300px", border: "1px solid var(--sct-color-border)", borderRadius: "var(--sct-radius-md)" }}>
      <div style={{ padding: "16px" }}>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} style={{ margin: "8px 0" }}>Item {i + 1}</p>
        ))}
      </div>
    </ScrollArea>
  ),
};
```

- [ ] **Step 4: Write Table story**

Create `apps/docs/src/stories/Table.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@webscit/registry";

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.invoice}>
            <TableCell>{inv.invoice}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell style={{ textAlign: "right" }}>{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell style={{ textAlign: "right" }}>$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
```

- [ ] **Step 5: Write ButtonGroup story**

Create `apps/docs/src/stories/ButtonGroup.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup, Button } from "@webscit/registry";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const Playground: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">A</Button>
      <Button variant="outline">B</Button>
      <Button variant="outline">C</Button>
    </ButtonGroup>
  ),
};
```

- [ ] **Step 6: Write InputGroup story**

Create `apps/docs/src/stories/InputGroup.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { InputGroup, InputGroupAddon, Input } from "@webscit/registry";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputGroup style={{ width: "300px" }}>
      <InputGroupAddon>$</InputGroupAddon>
      <Input placeholder="0.00" />
    </InputGroup>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <InputGroup style={{ width: "300px" }}>
      <Input placeholder="username" />
      <InputGroupAddon>@example.com</InputGroupAddon>
    </InputGroup>
  ),
};

export const BothSides: Story = {
  render: () => (
    <InputGroup style={{ width: "300px" }}>
      <InputGroupAddon>https://</InputGroupAddon>
      <Input placeholder="example.com" />
      <InputGroupAddon>/path</InputGroupAddon>
    </InputGroup>
  ),
};
```

- [ ] **Step 7: Commit**

```bash
git add apps/docs/src/stories/Separator.stories.tsx apps/docs/src/stories/Skeleton.stories.tsx apps/docs/src/stories/ScrollArea.stories.tsx apps/docs/src/stories/Table.stories.tsx apps/docs/src/stories/ButtonGroup.stories.tsx apps/docs/src/stories/InputGroup.stories.tsx
git commit -m "docs: add stories for separator, skeleton, scroll-area, table, button-group, input-group"
```

---

## Task 21: Stories — Base UI Components

**Files:**
- Create: `apps/docs/src/stories/Popover.stories.tsx`
- Create: `apps/docs/src/stories/Slider.stories.tsx`
- Create: `apps/docs/src/stories/Collapsible.stories.tsx`
- Create: `apps/docs/src/stories/Accordion.stories.tsx`
- Create: `apps/docs/src/stories/AlertDialog.stories.tsx`
- Create: `apps/docs/src/stories/Sheet.stories.tsx`
- Create: `apps/docs/src/stories/Resizable.stories.tsx`
- Create: `apps/docs/src/stories/Toast.stories.tsx`

- [ ] **Step 1: Write Popover story**

Create `apps/docs/src/stories/Popover.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from "@webscit/registry";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p style={{ fontWeight: 600, marginBottom: "4px" }}>Dimensions</p>
        <p style={{ fontSize: "12px", color: "var(--sct-color-muted-foreground)" }}>
          Set the dimensions for the layer.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithClose: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button>Details</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Some detailed information here.</p>
        <PopoverClose>
          <Button variant="outline" size="sm">Close</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};
```

- [ ] **Step 2: Write Slider story**

Create `apps/docs/src/stories/Slider.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@webscit/registry";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Slider defaultValue={50} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Slider defaultValue={25} min={0} max={100} />
    </div>
  ),
};

export const Playground: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Slider defaultValue={75} min={0} max={100} step={5} />
    </div>
  ),
};
```

- [ ] **Step 3: Write Collapsible story**

Create `apps/docs/src/stories/Collapsible.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@webscit/registry";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible style={{ width: "350px" }}>
      <CollapsibleTrigger>
        <Button variant="ghost">Toggle content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div style={{ padding: "8px", border: "1px solid var(--sct-color-border)", borderRadius: "var(--sct-radius-md)", marginTop: "8px" }}>
          This content can be collapsed and expanded.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen style={{ width: "350px" }}>
      <CollapsibleTrigger>
        <Button variant="ghost">Toggle content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div style={{ padding: "8px", border: "1px solid var(--sct-color-border)", borderRadius: "var(--sct-radius-md)", marginTop: "8px" }}>
          This starts expanded.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
```

- [ ] **Step 4: Write Accordion story**

Create `apps/docs/src/stories/Accordion.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@webscit/registry";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion style={{ width: "400px" }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          <div>Yes. It adheres to the WAI-ARIA design pattern.</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          <div>Yes. It comes with default styles using CSS scoping.</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          <div>Yes. It uses CSS transitions for smooth expand/collapse.</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Playground: Story = {
  render: () => (
    <Accordion style={{ width: "400px" }}>
      <AccordionItem value="a">
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionContent>
          <div>Content for section A.</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Section B</AccordionTrigger>
        <AccordionContent>
          <div>Content for section B.</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
```

- [ ] **Step 5: Write AlertDialog story**

Create `apps/docs/src/stories/AlertDialog.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from "@webscit/registry";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button variant="destructive">Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
```

- [ ] **Step 6: Write Sheet story**

Create `apps/docs/src/stories/Sheet.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  Button,
} from "@webscit/registry";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <div style={{ padding: "16px 0" }}>
          <p>Sheet content goes here.</p>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Sheet</SheetTitle>
        </SheetHeader>
        <p>This sheet slides from the left.</p>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top Sheet</SheetTitle>
        </SheetHeader>
        <p>This sheet slides from the top.</p>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Sheet</SheetTitle>
        </SheetHeader>
        <p>This sheet slides from the bottom.</p>
      </SheetContent>
    </Sheet>
  ),
};
```

- [ ] **Step 7: Write Resizable story**

Create `apps/docs/src/stories/Resizable.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@webscit/registry";

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ height: "200px", border: "1px solid var(--sct-color-border)", borderRadius: "var(--sct-radius-lg)" }}
    >
      <ResizablePanel defaultSize={50}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          Panel One
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          Panel Two
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      style={{ height: "300px", border: "1px solid var(--sct-color-border)", borderRadius: "var(--sct-radius-lg)" }}
    >
      <ResizablePanel defaultSize={30}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          Top
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          Bottom
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ height: "200px", border: "1px solid var(--sct-color-border)", borderRadius: "var(--sct-radius-lg)" }}
    >
      <ResizablePanel defaultSize={25}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          Main
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          Details
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
```

- [ ] **Step 8: Write Toast story**

Create `apps/docs/src/stories/Toast.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  useToastManager,
  Button,
} from "@webscit/registry";

const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const toastManager = useToastManager();
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({ title: "Default toast", description: "This is a default notification." })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({ title: "Success!", description: "Operation completed.", type: "success" })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({ title: "Warning", description: "Please check your input.", type: "warning" })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({ title: "Info", description: "New updates available.", type: "info" })
        }
      >
        Info
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toastManager.add({ title: "Error", description: "Something went wrong.", type: "destructive" })
        }
      >
        Destructive
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};
```

- [ ] **Step 9: Commit**

```bash
git add apps/docs/src/stories/Popover.stories.tsx apps/docs/src/stories/Slider.stories.tsx apps/docs/src/stories/Collapsible.stories.tsx apps/docs/src/stories/Accordion.stories.tsx apps/docs/src/stories/AlertDialog.stories.tsx apps/docs/src/stories/Sheet.stories.tsx apps/docs/src/stories/Resizable.stories.tsx apps/docs/src/stories/Toast.stories.tsx
git commit -m "docs: add stories for popover, slider, collapsible, accordion, alert-dialog, sheet, resizable, toast"
```

---

## Task 22: Stories — Field and Sidebar

**Files:**
- Create: `apps/docs/src/stories/Field.stories.tsx`
- Create: `apps/docs/src/stories/Sidebar.stories.tsx`

- [ ] **Step 1: Write Field story**

Create `apps/docs/src/stories/Field.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldSeparator,
  Input,
} from "@webscit/registry";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field style={{ width: "350px" }}>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
      <FieldDescription>We will never share your email.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field invalid style={{ width: "350px" }}>
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="Enter username" />
      <FieldError>Username is required.</FieldError>
    </Field>
  ),
};

export const FieldSetExample: Story = {
  render: () => (
    <FieldSet style={{ width: "400px" }}>
      <FieldLegend>Contact Information</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <Input placeholder="John" />
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <Input placeholder="Doe" />
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="john@example.com" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
```

- [ ] **Step 2: Write Sidebar story**

Create `apps/docs/src/stories/Sidebar.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInset,
} from "@webscit/registry";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "500px", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h3 style={{ fontSize: "14px", fontWeight: 600 }}>My App</h3>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Home</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Dashboard</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Settings</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Project Alpha</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Project Beta</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p style={{ fontSize: "12px", color: "var(--sct-color-muted-foreground)" }}>v1.0.0</p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div style={{ padding: "16px" }}>
          <SidebarTrigger>Toggle</SidebarTrigger>
          <h2 style={{ marginTop: "16px" }}>Main Content</h2>
          <p>This is the main content area next to the sidebar.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const CollapsedByDefault: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Home</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div style={{ padding: "16px" }}>
          <SidebarTrigger>Open</SidebarTrigger>
          <p>Sidebar starts collapsed.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const RightSide: Story = {
  render: () => (
    <SidebarProvider>
      <SidebarInset>
        <div style={{ padding: "16px" }}>
          <SidebarTrigger>Toggle</SidebarTrigger>
          <h2>Main Content</h2>
        </div>
      </SidebarInset>
      <Sidebar side="right">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Details</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Properties</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>History</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};
```

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/stories/Field.stories.tsx apps/docs/src/stories/Sidebar.stories.tsx
git commit -m "docs: add stories for field and sidebar"
```

---

## Task 23: Final Verification

- [ ] **Step 1: Run full lint**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 2: Run full typecheck**

Run: `npm run typecheck`
Expected: No errors across all packages

- [ ] **Step 3: Run full test suite**

Run: `npm run test`
Expected: All tests pass

- [ ] **Step 4: Run full build**

Run: `npm run build`
Expected: All packages build successfully

- [ ] **Step 5: Verify registry output**

Run: `cat packages/registry/registry/registry.json | node -e "const j=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(j.items.length + ' components'); console.log(j.items.map(i=>i.name).sort().join(', '))"`
Expected: `33 components` listing all 17 existing + 16 new component names

- [ ] **Step 6: Commit any final fixes**

If lint/typecheck/test revealed issues, fix them and commit:

```bash
git add -A
git commit -m "fix: address lint/type issues in new components"
```
