# Shadcn Alignment — Phase 1 Group 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 9 native-HTML trivial components to `packages/registry/`: `aspect-ratio`, `breadcrumb`, `direction`, `empty`, `item`, `kbd`, `native-select`, `pagination`, `spinner`.

**Architecture:** All components use native HTML elements (no Base UI primitives). `direction` re-exports `@base-ui/react/direction-provider` as a thin pass-through. CSS uses `@scope (.sct-<name>)` blocks. Tests use `vitest-browser-react` with the async `expect.element()` API.

**Tech Stack:** React 19, `@base-ui/react` (direction only), Vitest browser-mode, plain CSS with W3C design tokens (`--sct-*`).

---

## Shared conventions (apply to every component in this plan)

```
packages/registry/src/components/<name>/
  <name>.tsx
  <name>.css
  registry.meta.json
  <name>.test.tsx
```

**Class composition pattern:**
```tsx
className={`sct-<name>${className ? ` ${className}` : ""}`}
```

**Test run command:**
```bash
cd packages/registry && npx vitest run src/components/<name>/<name>.test.tsx
```

**Full-suite check (run once after all 9 components):**
```bash
npm run test -w packages/registry
```

---

## Task 1: `aspect-ratio`

**Files:**
- Create: `packages/registry/src/components/aspect-ratio/aspect-ratio.tsx`
- Create: `packages/registry/src/components/aspect-ratio/aspect-ratio.css`
- Create: `packages/registry/src/components/aspect-ratio/registry.meta.json`
- Create: `packages/registry/src/components/aspect-ratio/aspect-ratio.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/aspect-ratio/aspect-ratio.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import { AspectRatio } from "./aspect-ratio";

  describe("AspectRatio", () => {
    it("renders a div with scope class", async () => {
      const screen = await render(<AspectRatio><img alt="test" /></AspectRatio>);
      const el = screen.getByRole("img").element().parentElement!;
      expect(el.className).toBe("sct-aspect-ratio");
    });

    it("forwards className", async () => {
      const screen = await render(<AspectRatio className="my-class"><span /></AspectRatio>);
      const el = document.querySelector(".sct-aspect-ratio")!;
      expect(el.className).toBe("sct-aspect-ratio my-class");
    });

    it("sets --sct-aspect-ratio CSS variable from ratio prop", async () => {
      await render(<AspectRatio ratio={4 / 3} data-testid="ar"><span /></AspectRatio>);
      const el = document.querySelector("[data-testid='ar']") as HTMLElement;
      expect(el.style.getPropertyValue("--sct-aspect-ratio")).toBe("1.3333333333333333");
    });

    it("defaults ratio to 16/9", async () => {
      await render(<AspectRatio data-testid="ar2"><span /></AspectRatio>);
      const el = document.querySelector("[data-testid='ar2']") as HTMLElement;
      expect(el.style.getPropertyValue("--sct-aspect-ratio")).toBe("1.7777777777777777");
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/aspect-ratio/aspect-ratio.test.tsx
  ```
  Expected: FAIL — `Cannot find module './aspect-ratio'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/aspect-ratio/aspect-ratio.tsx`:

  ```tsx
  import "./aspect-ratio.css";

  export interface AspectRatioProps extends React.ComponentProps<"div"> {
    ratio?: number;
  }

  export function AspectRatio({
    ratio = 16 / 9,
    className,
    style,
    ...props
  }: AspectRatioProps) {
    return (
      <div
        data-slot="aspect-ratio"
        className={`sct-aspect-ratio${className ? ` ${className}` : ""}`}
        style={{ "--sct-aspect-ratio": String(ratio), ...style } as React.CSSProperties}
        {...props}
      />
    );
  }
  ```

  Create `packages/registry/src/components/aspect-ratio/aspect-ratio.css`:

  ```css
  @scope (.sct-aspect-ratio) {
    :scope {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding-bottom: calc(100% / var(--sct-aspect-ratio, 1.7778));
    }

    :scope > * {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  ```

  Create `packages/registry/src/components/aspect-ratio/registry.meta.json`:

  ```json
  {
    "title": "Aspect Ratio",
    "description": "Constrains content to a fixed aspect ratio using a CSS custom property.",
    "dependencies": [],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/aspect-ratio/aspect-ratio.test.tsx
  ```
  Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/aspect-ratio
  git commit -m "feat(registry): add aspect-ratio component"
  ```

---

## Task 2: `breadcrumb`

**Files:**
- Create: `packages/registry/src/components/breadcrumb/breadcrumb.tsx`
- Create: `packages/registry/src/components/breadcrumb/breadcrumb.css`
- Create: `packages/registry/src/components/breadcrumb/registry.meta.json`
- Create: `packages/registry/src/components/breadcrumb/breadcrumb.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/breadcrumb/breadcrumb.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
  } from "./breadcrumb";

  describe("Breadcrumb", () => {
    it("renders a nav landmark", async () => {
      const screen = await render(<Breadcrumb><BreadcrumbList /></Breadcrumb>);
      await expect.element(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("BreadcrumbList renders an ordered list", async () => {
      const screen = await render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      const list = document.querySelector("ol");
      expect(list).not.toBeNull();
    });

    it("BreadcrumbPage has aria-current=page", async () => {
      const screen = await render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      await expect.element(screen.getByText("Current")).toHaveAttribute("aria-current", "page");
    });

    it("BreadcrumbSeparator renders a default slash", async () => {
      await render(<Breadcrumb><BreadcrumbList><BreadcrumbSeparator /></BreadcrumbList></Breadcrumb>);
      const sep = document.querySelector("[data-slot='breadcrumb-separator']");
      expect(sep?.textContent).toBe("/");
    });

    it("BreadcrumbEllipsis renders ellipsis text", async () => {
      await render(<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem></BreadcrumbList></Breadcrumb>);
      const el = document.querySelector("[data-slot='breadcrumb-ellipsis']");
      expect(el?.textContent).toBe("…");
    });

    it("Breadcrumb forwards className", async () => {
      const screen = await render(<Breadcrumb className="custom"><BreadcrumbList /></Breadcrumb>);
      await expect.element(screen.getByRole("navigation")).toHaveClass("sct-breadcrumb custom");
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/breadcrumb/breadcrumb.test.tsx
  ```
  Expected: FAIL — `Cannot find module './breadcrumb'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/breadcrumb/breadcrumb.tsx`:

  ```tsx
  import "./breadcrumb.css";

  export function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
    return (
      <nav
        aria-label="breadcrumb"
        data-slot="breadcrumb"
        className={`sct-breadcrumb${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
    return (
      <ol
        data-slot="breadcrumb-list"
        className={`sct-breadcrumb-list${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
    return (
      <li
        data-slot="breadcrumb-item"
        className={`sct-breadcrumb-item${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
    return (
      <a
        data-slot="breadcrumb-link"
        className={`sct-breadcrumb-link${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
    return (
      <span
        role="link"
        aria-current="page"
        aria-disabled="true"
        data-slot="breadcrumb-page"
        className={`sct-breadcrumb-page${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function BreadcrumbSeparator({
    className,
    children,
    ...props
  }: React.ComponentProps<"li">) {
    return (
      <li
        role="presentation"
        aria-hidden="true"
        data-slot="breadcrumb-separator"
        className={`sct-breadcrumb-separator${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children ?? "/"}
      </li>
    );
  }

  export function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
    return (
      <span
        role="presentation"
        aria-hidden="true"
        data-slot="breadcrumb-ellipsis"
        className={`sct-breadcrumb-ellipsis${className ? ` ${className}` : ""}`}
        {...props}
      >
        …
      </span>
    );
  }
  ```

  Create `packages/registry/src/components/breadcrumb/breadcrumb.css`:

  ```css
  @scope (.sct-breadcrumb) {
    :scope {
      display: block;
    }

    .sct-breadcrumb-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.375rem;
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-muted-foreground);
    }

    .sct-breadcrumb-item {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
    }

    .sct-breadcrumb-link {
      color: var(--sct-color-muted-foreground);
      text-decoration: none;
      transition: color 150ms;
    }

    .sct-breadcrumb-link:hover {
      color: var(--sct-color-foreground);
    }

    .sct-breadcrumb-page {
      font-weight: var(--sct-font-weight-normal);
      color: var(--sct-color-foreground);
    }

    .sct-breadcrumb-separator {
      display: inline-flex;
      align-items: center;
      color: var(--sct-color-muted-foreground);
      user-select: none;
    }

    .sct-breadcrumb-ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
    }
  }
  ```

  Create `packages/registry/src/components/breadcrumb/registry.meta.json`:

  ```json
  {
    "title": "Breadcrumb",
    "description": "Navigation breadcrumb trail with nav, list, item, link, page, separator, and ellipsis sub-components.",
    "dependencies": [],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/breadcrumb/breadcrumb.test.tsx
  ```
  Expected: 6 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/breadcrumb
  git commit -m "feat(registry): add breadcrumb component"
  ```

---

## Task 3: `direction`

**Files:**
- Create: `packages/registry/src/components/direction/direction.tsx`
- Create: `packages/registry/src/components/direction/direction.css`
- Create: `packages/registry/src/components/direction/registry.meta.json`
- Create: `packages/registry/src/components/direction/direction.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/direction/direction.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import { DirectionProvider, useDirection } from "./direction";

  function DirectionConsumer() {
    const dir = useDirection();
    return <span data-testid="dir-value">{dir}</span>;
  }

  describe("DirectionProvider", () => {
    it("provides ltr direction by default", async () => {
      await render(
        <DirectionProvider direction="ltr">
          <DirectionConsumer />
        </DirectionProvider>
      );
      const el = document.querySelector("[data-testid='dir-value']");
      expect(el?.textContent).toBe("ltr");
    });

    it("provides rtl direction when set", async () => {
      await render(
        <DirectionProvider direction="rtl">
          <DirectionConsumer />
        </DirectionProvider>
      );
      const el = document.querySelector("[data-testid='dir-value']");
      expect(el?.textContent).toBe("rtl");
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/direction/direction.test.tsx
  ```
  Expected: FAIL — `Cannot find module './direction'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/direction/direction.tsx`:

  ```tsx
  export {
    Provider as DirectionProvider,
    useDirection,
  } from "@base-ui/react/direction-provider";
  export type { DirectionProviderProps } from "@base-ui/react/direction-provider";
  ```

  Create `packages/registry/src/components/direction/direction.css`:

  ```css
  /* Direction is a context provider — no visual styles. */
  ```

  Create `packages/registry/src/components/direction/registry.meta.json`:

  ```json
  {
    "title": "Direction",
    "description": "React context provider that sets the text direction (ltr/rtl) for all child components via Base UI DirectionProvider.",
    "dependencies": ["@base-ui/react"],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/direction/direction.test.tsx
  ```
  Expected: 2 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/direction
  git commit -m "feat(registry): add direction provider component"
  ```

---

## Task 4: `empty`

**Files:**
- Create: `packages/registry/src/components/empty/empty.tsx`
- Create: `packages/registry/src/components/empty/empty.css`
- Create: `packages/registry/src/components/empty/registry.meta.json`
- Create: `packages/registry/src/components/empty/empty.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/empty/empty.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction } from "./empty";

  describe("Empty", () => {
    it("renders root with scope class", async () => {
      await render(<Empty data-testid="e" />);
      const el = document.querySelector("[data-testid='e']");
      expect(el?.className).toBe("sct-empty");
    });

    it("forwards className on root", async () => {
      await render(<Empty className="custom" data-testid="e" />);
      expect(document.querySelector("[data-testid='e']")?.className).toBe("sct-empty custom");
    });

    it("renders full compound structure", async () => {
      await render(
        <Empty>
          <EmptyIcon data-testid="icon" />
          <EmptyTitle data-testid="title">No results</EmptyTitle>
          <EmptyDescription data-testid="desc">Try a different search.</EmptyDescription>
          <EmptyAction data-testid="action" />
        </Empty>
      );
      expect(document.querySelector("[data-testid='icon']")?.getAttribute("data-slot")).toBe("empty-icon");
      await expect.element(document.querySelector("[data-testid='title']") as Element).toHaveTextContent("No results");
      await expect.element(document.querySelector("[data-testid='desc']") as Element).toHaveTextContent("Try a different search.");
      expect(document.querySelector("[data-testid='action']")?.getAttribute("data-slot")).toBe("empty-action");
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/empty/empty.test.tsx
  ```
  Expected: FAIL — `Cannot find module './empty'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/empty/empty.tsx`:

  ```tsx
  import "./empty.css";

  export function Empty({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="empty"
        className={`sct-empty${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function EmptyIcon({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="empty-icon"
        className={`sct-empty-icon${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function EmptyTitle({ className, ...props }: React.ComponentProps<"h3">) {
    return (
      <h3
        data-slot="empty-title"
        className={`sct-empty-title${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
    return (
      <p
        data-slot="empty-description"
        className={`sct-empty-description${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function EmptyAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="empty-action"
        className={`sct-empty-action${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

  Create `packages/registry/src/components/empty/empty.css`:

  ```css
  @scope (.sct-empty) {
    :scope {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 2rem;
      text-align: center;
      color: var(--sct-color-muted-foreground);
    }

    .sct-empty-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      color: var(--sct-color-muted-foreground);
    }

    .sct-empty-title {
      font-size: var(--sct-font-size-lg);
      font-weight: var(--sct-font-weight-semibold);
      color: var(--sct-color-foreground);
      margin: 0;
    }

    .sct-empty-description {
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-muted-foreground);
      margin: 0;
      max-width: 24rem;
    }

    .sct-empty-action {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.25rem;
    }
  }
  ```

  Create `packages/registry/src/components/empty/registry.meta.json`:

  ```json
  {
    "title": "Empty",
    "description": "Empty state placeholder with slots for icon, title, description, and action.",
    "dependencies": [],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/empty/empty.test.tsx
  ```
  Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/empty
  git commit -m "feat(registry): add empty state component"
  ```

---

## Task 5: `item`

**Files:**
- Create: `packages/registry/src/components/item/item.tsx`
- Create: `packages/registry/src/components/item/item.css`
- Create: `packages/registry/src/components/item/registry.meta.json`
- Create: `packages/registry/src/components/item/item.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/item/item.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import { Item } from "./item";

  describe("Item", () => {
    it("renders with scope class", async () => {
      await render(<Item data-testid="it">Label</Item>);
      expect(document.querySelector("[data-testid='it']")?.className).toBe("sct-item");
    });

    it("forwards className", async () => {
      await render(<Item className="custom" data-testid="it">Label</Item>);
      expect(document.querySelector("[data-testid='it']")?.className).toBe("sct-item custom");
    });

    it("sets data-selected when selected=true", async () => {
      await render(<Item selected data-testid="it">Label</Item>);
      expect(document.querySelector("[data-testid='it']")?.hasAttribute("data-selected")).toBe(true);
    });

    it("does not set data-selected when selected=false", async () => {
      await render(<Item data-testid="it">Label</Item>);
      expect(document.querySelector("[data-testid='it']")?.hasAttribute("data-selected")).toBe(false);
    });

    it("sets data-disabled when disabled=true", async () => {
      await render(<Item disabled data-testid="it">Label</Item>);
      expect(document.querySelector("[data-testid='it']")?.hasAttribute("data-disabled")).toBe(true);
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/item/item.test.tsx
  ```
  Expected: FAIL — `Cannot find module './item'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/item/item.tsx`:

  ```tsx
  import "./item.css";

  export interface ItemProps extends React.ComponentProps<"div"> {
    selected?: boolean;
    disabled?: boolean;
  }

  export function Item({ selected, disabled, className, ...props }: ItemProps) {
    return (
      <div
        data-slot="item"
        data-selected={selected || undefined}
        data-disabled={disabled || undefined}
        aria-selected={selected}
        aria-disabled={disabled}
        className={`sct-item${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

  Create `packages/registry/src/components/item/item.css`:

  ```css
  @scope (.sct-item) {
    :scope {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-foreground);
      border-radius: var(--sct-radius-md);
      cursor: pointer;
      user-select: none;
      outline: none;
      transition: background-color 100ms;
    }

    :scope:hover:not([data-disabled]) {
      background-color: var(--sct-color-accent);
      color: var(--sct-color-accent-foreground);
    }

    :scope[data-selected] {
      background-color: var(--sct-color-accent);
      color: var(--sct-color-accent-foreground);
      font-weight: var(--sct-font-weight-medium);
    }

    :scope[data-disabled] {
      pointer-events: none;
      opacity: 0.5;
    }
  }
  ```

  Create `packages/registry/src/components/item/registry.meta.json`:

  ```json
  {
    "title": "Item",
    "description": "Generic styled list-row primitive supporting selected and disabled states.",
    "dependencies": [],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/item/item.test.tsx
  ```
  Expected: 5 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/item
  git commit -m "feat(registry): add item list-row primitive"
  ```

---

## Task 6: `kbd`

**Files:**
- Create: `packages/registry/src/components/kbd/kbd.tsx`
- Create: `packages/registry/src/components/kbd/kbd.css`
- Create: `packages/registry/src/components/kbd/registry.meta.json`
- Create: `packages/registry/src/components/kbd/kbd.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/kbd/kbd.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import { Kbd } from "./kbd";

  describe("Kbd", () => {
    it("renders a kbd element", async () => {
      await render(<Kbd>⌘K</Kbd>);
      const el = document.querySelector("kbd");
      expect(el).not.toBeNull();
    });

    it("renders with scope class", async () => {
      await render(<Kbd>Enter</Kbd>);
      expect(document.querySelector("kbd")?.className).toBe("sct-kbd");
    });

    it("forwards className", async () => {
      await render(<Kbd className="custom">Tab</Kbd>);
      expect(document.querySelector("kbd")?.className).toBe("sct-kbd custom");
    });

    it("renders children text", async () => {
      const screen = await render(<Kbd>Ctrl</Kbd>);
      await expect.element(screen.getByText("Ctrl")).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/kbd/kbd.test.tsx
  ```
  Expected: FAIL — `Cannot find module './kbd'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/kbd/kbd.tsx`:

  ```tsx
  import "./kbd.css";

  export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
    return (
      <kbd
        data-slot="kbd"
        className={`sct-kbd${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

  Create `packages/registry/src/components/kbd/kbd.css`:

  ```css
  @scope (.sct-kbd) {
    :scope {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 1.25rem;
      min-width: 1.25rem;
      padding-inline: 0.25rem;
      border: 1px solid var(--sct-color-border);
      border-bottom-width: 2px;
      border-radius: var(--sct-radius-md);
      background-color: var(--sct-color-muted);
      font-family: var(--sct-font-family-mono);
      font-size: var(--sct-font-size-xs);
      font-weight: var(--sct-font-weight-normal);
      color: var(--sct-color-foreground);
      line-height: 1;
    }
  }
  ```

  Create `packages/registry/src/components/kbd/registry.meta.json`:

  ```json
  {
    "title": "Kbd",
    "description": "Keyboard key display element styled as a physical key.",
    "dependencies": [],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/kbd/kbd.test.tsx
  ```
  Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/kbd
  git commit -m "feat(registry): add kbd keyboard key component"
  ```

---

## Task 7: `native-select`

**Files:**
- Create: `packages/registry/src/components/native-select/native-select.tsx`
- Create: `packages/registry/src/components/native-select/native-select.css`
- Create: `packages/registry/src/components/native-select/registry.meta.json`
- Create: `packages/registry/src/components/native-select/native-select.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/native-select/native-select.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import { NativeSelect } from "./native-select";

  describe("NativeSelect", () => {
    it("renders a select element", async () => {
      const screen = await render(
        <NativeSelect>
          <option value="a">Option A</option>
        </NativeSelect>
      );
      await expect.element(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders with scope class on select", async () => {
      const screen = await render(
        <NativeSelect>
          <option value="a">A</option>
        </NativeSelect>
      );
      await expect.element(screen.getByRole("combobox")).toHaveClass("sct-native-select");
    });

    it("forwards className", async () => {
      const screen = await render(
        <NativeSelect className="custom">
          <option value="a">A</option>
        </NativeSelect>
      );
      await expect.element(screen.getByRole("combobox")).toHaveClass("sct-native-select custom");
    });

    it("forwards disabled prop", async () => {
      const screen = await render(
        <NativeSelect disabled>
          <option value="a">A</option>
        </NativeSelect>
      );
      await expect.element(screen.getByRole("combobox")).toBeDisabled();
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/native-select/native-select.test.tsx
  ```
  Expected: FAIL — `Cannot find module './native-select'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/native-select/native-select.tsx`:

  ```tsx
  import "./native-select.css";

  export function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
    return (
      <select
        data-slot="native-select"
        className={`sct-native-select${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

  Create `packages/registry/src/components/native-select/native-select.css`:

  ```css
  @scope (.sct-native-select) {
    :scope {
      appearance: none;
      display: block;
      width: 100%;
      height: 2.25rem;
      padding-inline: 0.75rem 2rem;
      background-color: var(--sct-color-background);
      border: 1px solid var(--sct-color-input);
      border-radius: var(--sct-radius-md);
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-foreground);
      cursor: pointer;
      outline: none;
      /* chevron icon */
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23737373' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.625rem center;
      box-shadow: var(--sct-shadow-xs);
    }

    :scope:focus-visible {
      border-color: var(--sct-color-ring);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
    }

    :scope:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
  ```

  Create `packages/registry/src/components/native-select/registry.meta.json`:

  ```json
  {
    "title": "Native Select",
    "description": "Styled native <select> element — accessible on all platforms without JavaScript.",
    "dependencies": [],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/native-select/native-select.test.tsx
  ```
  Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/native-select
  git commit -m "feat(registry): add native-select component"
  ```

---

## Task 8: `pagination`

**Files:**
- Create: `packages/registry/src/components/pagination/pagination.tsx`
- Create: `packages/registry/src/components/pagination/pagination.css`
- Create: `packages/registry/src/components/pagination/registry.meta.json`
- Create: `packages/registry/src/components/pagination/pagination.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/pagination/pagination.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
  } from "./pagination";

  describe("Pagination", () => {
    it("renders a navigation landmark", async () => {
      const screen = await render(
        <Pagination><PaginationContent /></Pagination>
      );
      await expect.element(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("PaginationLink sets aria-current=page when isActive", async () => {
      const screen = await render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      await expect.element(screen.getByText("2")).toHaveAttribute("aria-current", "page");
    });

    it("PaginationLink does not set aria-current when not active", async () => {
      const screen = await render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const link = screen.getByText("1");
      await expect.element(link).not.toHaveAttribute("aria-current");
    });

    it("PaginationPrevious has accessible label", async () => {
      const screen = await render(
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      await expect.element(screen.getByRole("link", { name: /previous/i })).toBeInTheDocument();
    });

    it("PaginationNext has accessible label", async () => {
      const screen = await render(
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      await expect.element(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
    });

    it("PaginationEllipsis is aria-hidden", async () => {
      await render(
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const el = document.querySelector("[data-slot='pagination-ellipsis']");
      expect(el?.getAttribute("aria-hidden")).toBe("true");
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/pagination/pagination.test.tsx
  ```
  Expected: FAIL — `Cannot find module './pagination'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/pagination/pagination.tsx`:

  ```tsx
  import "./pagination.css";

  export function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
    return (
      <nav
        aria-label="pagination"
        data-slot="pagination"
        className={`sct-pagination${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
    return (
      <ul
        data-slot="pagination-content"
        className={`sct-pagination-content${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
    return (
      <li
        data-slot="pagination-item"
        className={`sct-pagination-item${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export interface PaginationLinkProps extends React.ComponentProps<"a"> {
    isActive?: boolean;
  }

  export function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
    return (
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive || undefined}
        className={`sct-pagination-link${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function PaginationPrevious({ className, children, ...props }: React.ComponentProps<"a">) {
    return (
      <a
        aria-label="Go to previous page"
        data-slot="pagination-previous"
        className={`sct-pagination-link sct-pagination-previous${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children ?? (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Previous</span>
          </>
        )}
      </a>
    );
  }

  export function PaginationNext({ className, children, ...props }: React.ComponentProps<"a">) {
    return (
      <a
        aria-label="Go to next page"
        data-slot="pagination-next"
        className={`sct-pagination-link sct-pagination-next${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children ?? (
          <>
            <span>Next</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </a>
    );
  }

  export function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
    return (
      <span
        aria-hidden="true"
        data-slot="pagination-ellipsis"
        className={`sct-pagination-ellipsis${className ? ` ${className}` : ""}`}
        {...props}
      >
        …
      </span>
    );
  }
  ```

  Create `packages/registry/src/components/pagination/pagination.css`:

  ```css
  @scope (.sct-pagination) {
    :scope {
      display: flex;
      justify-content: center;
    }

    .sct-pagination-content {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .sct-pagination-item {
      display: inline-flex;
    }

    .sct-pagination-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2.25rem;
      height: 2.25rem;
      padding-inline: 0.5rem;
      border-radius: var(--sct-radius-md);
      border: 1px solid transparent;
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-foreground);
      text-decoration: none;
      cursor: pointer;
      transition: background-color 100ms;
      gap: 0.375rem;
    }

    .sct-pagination-link:hover {
      background-color: var(--sct-color-accent);
      color: var(--sct-color-accent-foreground);
    }

    .sct-pagination-link[data-active] {
      border-color: var(--sct-color-border);
      background-color: var(--sct-color-background);
      font-weight: var(--sct-font-weight-medium);
    }

    .sct-pagination-previous,
    .sct-pagination-next {
      gap: 0.25rem;
      padding-inline: 0.75rem;
    }

    .sct-pagination-ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-muted-foreground);
    }
  }
  ```

  Create `packages/registry/src/components/pagination/registry.meta.json`:

  ```json
  {
    "title": "Pagination",
    "description": "Page navigation component with previous, next, numbered links, and ellipsis.",
    "dependencies": [],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/pagination/pagination.test.tsx
  ```
  Expected: 6 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/pagination
  git commit -m "feat(registry): add pagination component"
  ```

---

## Task 9: `spinner`

**Files:**
- Create: `packages/registry/src/components/spinner/spinner.tsx`
- Create: `packages/registry/src/components/spinner/spinner.css`
- Create: `packages/registry/src/components/spinner/registry.meta.json`
- Create: `packages/registry/src/components/spinner/spinner.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/spinner/spinner.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import { Spinner } from "./spinner";

  describe("Spinner", () => {
    it("renders with status role", async () => {
      const screen = await render(<Spinner />);
      await expect.element(screen.getByRole("status")).toBeInTheDocument();
    });

    it("has accessible label", async () => {
      const screen = await render(<Spinner />);
      await expect.element(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
    });

    it("renders with scope class", async () => {
      const screen = await render(<Spinner />);
      await expect.element(screen.getByRole("status")).toHaveClass("sct-spinner");
    });

    it("forwards className", async () => {
      const screen = await render(<Spinner className="custom" />);
      await expect.element(screen.getByRole("status")).toHaveClass("sct-spinner custom");
    });

    it("applies data-size attribute", async () => {
      const screen = await render(<Spinner size="lg" />);
      await expect.element(screen.getByRole("status")).toHaveAttribute("data-size", "lg");
    });

    it("defaults to size=default", async () => {
      const screen = await render(<Spinner />);
      await expect.element(screen.getByRole("status")).toHaveAttribute("data-size", "default");
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/spinner/spinner.test.tsx
  ```
  Expected: FAIL — `Cannot find module './spinner'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/spinner/spinner.tsx`:

  ```tsx
  import "./spinner.css";

  export interface SpinnerProps extends React.ComponentProps<"span"> {
    size?: "sm" | "default" | "lg";
  }

  export function Spinner({ size = "default", className, ...props }: SpinnerProps) {
    return (
      <span
        role="status"
        aria-label="Loading"
        data-slot="spinner"
        data-size={size}
        className={`sct-spinner${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

  Create `packages/registry/src/components/spinner/spinner.css`:

  ```css
  @keyframes sct-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @scope (.sct-spinner) {
    :scope {
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid var(--sct-color-muted);
      border-top-color: var(--sct-color-primary);
      border-radius: var(--sct-radius-full);
      animation: sct-spin 0.75s linear infinite;
      flex-shrink: 0;
    }

    :scope[data-size="sm"] {
      width: 1rem;
      height: 1rem;
      border-width: 1.5px;
    }

    :scope[data-size="lg"] {
      width: 1.75rem;
      height: 1.75rem;
      border-width: 2.5px;
    }
  }
  ```

  Create `packages/registry/src/components/spinner/registry.meta.json`:

  ```json
  {
    "title": "Spinner",
    "description": "Loading spinner with sm/default/lg sizes, animated via CSS.",
    "dependencies": [],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/spinner/spinner.test.tsx
  ```
  Expected: 6 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/spinner
  git commit -m "feat(registry): add spinner component"
  ```

---

## Final Group 1 Check

- [ ] **Run full registry test suite**

  ```bash
  npm run test -w packages/registry
  ```
  Expected: All existing tests plus the 9 new component suites pass.

- [ ] **Type-check**

  ```bash
  npm run typecheck
  ```
  Expected: No errors.
