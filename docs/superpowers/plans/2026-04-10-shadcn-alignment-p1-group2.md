# Shadcn Alignment — Phase 1 Group 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 3 moderate-complexity components: `progress` (Base UI primitive), `navigation-menu` (Base UI primitive), and `command` (native HTML searchable list). Add design tokens to `packages/tokens/` as needed.

**Architecture:** `progress` and `navigation-menu` wrap `@base-ui/react` primitives. `command` is a fully native-HTML component using React context for client-side search filtering. New tokens are added to `semantic.tokens.json`.

**Tech Stack:** React 19, `@base-ui/react` (progress, navigation-menu), Vitest browser-mode, plain CSS with `--sct-*` tokens.

---

## Task 1: `progress` (with token additions)

**Files:**
- Modify: `packages/tokens/src/semantic.tokens.json`
- Create: `packages/registry/src/components/progress/progress.tsx`
- Create: `packages/registry/src/components/progress/progress.css`
- Create: `packages/registry/src/components/progress/registry.meta.json`
- Create: `packages/registry/src/components/progress/progress.test.tsx`

- [ ] **Step 1: Add token for progress height**

  Open `packages/tokens/src/semantic.tokens.json`. It currently ends with:

  ```json
    "sidebar": {
      "width": { "$type": "dimension", "$value": "256px" },
      "width-collapsed": { "$type": "dimension", "$value": "48px" }
    }
  ```

  Replace that `"sidebar"` block and its closing `}` with:

  ```json
    "sidebar": {
      "width": { "$type": "dimension", "$value": "256px" },
      "width-collapsed": { "$type": "dimension", "$value": "48px" }
    },
    "progress": {
      "height": { "$type": "dimension", "$value": "0.5rem" }
    }
  ```

  Rebuild tokens to confirm no errors:

  ```bash
  npm run build -w packages/tokens
  ```
  Expected: `dist/tokens.css` now includes `--sct-progress-height: 0.5rem`.

- [ ] **Step 2: Write the failing test**

  Create `packages/registry/src/components/progress/progress.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import { Progress } from "./progress";

  describe("Progress", () => {
    it("renders with progressbar role", async () => {
      const screen = await render(<Progress value={50} max={100} />);
      await expect.element(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("renders with scope class", async () => {
      const screen = await render(<Progress value={30} max={100} />);
      await expect.element(screen.getByRole("progressbar")).toHaveClass("sct-progress");
    });

    it("forwards className", async () => {
      const screen = await render(<Progress value={30} max={100} className="custom" />);
      await expect.element(screen.getByRole("progressbar")).toHaveClass("sct-progress custom");
    });

    it("renders track and indicator sub-elements", async () => {
      await render(<Progress value={60} max={100} />);
      expect(document.querySelector("[data-slot='progress-track']")).not.toBeNull();
      expect(document.querySelector("[data-slot='progress-indicator']")).not.toBeNull();
    });

    it("renders indeterminate state when value is null", async () => {
      await render(<Progress value={null} max={100} />);
      const root = document.querySelector("[data-slot='progress']");
      expect(root?.getAttribute("data-status")).toBe("indeterminate");
    });
  });
  ```

- [ ] **Step 3: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/progress/progress.test.tsx
  ```
  Expected: FAIL — `Cannot find module './progress'`.

- [ ] **Step 4: Implement the component**

  Create `packages/registry/src/components/progress/progress.tsx`:

  ```tsx
  import { Progress as BaseProgress } from "@base-ui/react/progress";
  import "./progress.css";

  export type ProgressProps = React.ComponentProps<typeof BaseProgress.Root>;

  export function Progress({ className, ...props }: ProgressProps) {
    return (
      <BaseProgress.Root
        data-slot="progress"
        className={`sct-progress${className ? ` ${className}` : ""}`}
        {...props}
      >
        <BaseProgress.Track
          data-slot="progress-track"
          className="sct-progress-track"
        >
          <BaseProgress.Indicator
            data-slot="progress-indicator"
            className="sct-progress-indicator"
          />
        </BaseProgress.Track>
      </BaseProgress.Root>
    );
  }
  ```

  Create `packages/registry/src/components/progress/progress.css`:

  ```css
  @scope (.sct-progress) {
    :scope {
      display: block;
      width: 100%;
    }

    .sct-progress-track {
      position: relative;
      width: 100%;
      height: var(--sct-progress-height, 0.5rem);
      background-color: var(--sct-color-muted);
      border-radius: var(--sct-radius-full);
      overflow: hidden;
    }

    .sct-progress-indicator {
      height: 100%;
      background-color: var(--sct-color-primary);
      border-radius: var(--sct-radius-full);
      transition: width 300ms ease;
      width: calc(var(--progress-percent, 0) * 1%);
    }

    :scope[data-status="indeterminate"] .sct-progress-indicator {
      width: 40%;
      animation: sct-progress-indeterminate 1.5s ease-in-out infinite;
    }
  }

  @keyframes sct-progress-indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(350%);
    }
  }
  ```

  Create `packages/registry/src/components/progress/registry.meta.json`:

  ```json
  {
    "title": "Progress",
    "description": "Progress bar built on Base UI Progress. Supports determinate and indeterminate states.",
    "dependencies": ["@base-ui/react"],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 5: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/progress/progress.test.tsx
  ```
  Expected: 5 tests PASS.

- [ ] **Step 6: Commit**

  ```bash
  git add packages/tokens/src/semantic.tokens.json packages/registry/src/components/progress
  git commit -m "feat(registry): add progress component and progress-height token"
  ```

---

## Task 2: `navigation-menu`

**Files:**
- Create: `packages/registry/src/components/navigation-menu/navigation-menu.tsx`
- Create: `packages/registry/src/components/navigation-menu/navigation-menu.css`
- Create: `packages/registry/src/components/navigation-menu/registry.meta.json`
- Create: `packages/registry/src/components/navigation-menu/navigation-menu.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/navigation-menu/navigation-menu.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
  } from "./navigation-menu";

  describe("NavigationMenu", () => {
    it("renders root with navigation role", async () => {
      const screen = await render(
        <NavigationMenu>
          <NavigationMenuList />
        </NavigationMenu>
      );
      await expect.element(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders root with scope class", async () => {
      const screen = await render(
        <NavigationMenu>
          <NavigationMenuList />
        </NavigationMenu>
      );
      await expect.element(screen.getByRole("navigation")).toHaveClass("sct-navigation-menu");
    });

    it("forwards className on root", async () => {
      const screen = await render(
        <NavigationMenu className="custom">
          <NavigationMenuList />
        </NavigationMenu>
      );
      await expect.element(screen.getByRole("navigation")).toHaveClass("sct-navigation-menu custom");
    });

    it("renders a NavigationMenuLink as an anchor", async () => {
      const screen = await render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
      await expect.element(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
    });

    it("renders NavigationMenuTrigger as a button", async () => {
      const screen = await render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent><p>Content</p></NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
      await expect.element(screen.getByRole("button", { name: /products/i })).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/navigation-menu/navigation-menu.test.tsx
  ```
  Expected: FAIL — `Cannot find module './navigation-menu'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/navigation-menu/navigation-menu.tsx`:

  ```tsx
  import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
  import "./navigation-menu.css";

  export type NavigationMenuProps = React.ComponentProps<typeof BaseNav.Root>;

  export function NavigationMenu({ className, ...props }: NavigationMenuProps) {
    return (
      <BaseNav.Root
        data-slot="navigation-menu"
        className={`sct-navigation-menu${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export type NavigationMenuListProps = React.ComponentProps<typeof BaseNav.List>;

  export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
    return (
      <BaseNav.List
        data-slot="navigation-menu-list"
        className={`sct-navigation-menu-list${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export type NavigationMenuItemProps = React.ComponentProps<typeof BaseNav.Item>;

  export function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) {
    return (
      <BaseNav.Item
        data-slot="navigation-menu-item"
        className={`sct-navigation-menu-item${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export type NavigationMenuTriggerProps = React.ComponentProps<typeof BaseNav.Trigger>;

  export function NavigationMenuTrigger({ className, ...props }: NavigationMenuTriggerProps) {
    return (
      <BaseNav.Trigger
        data-slot="navigation-menu-trigger"
        className={`sct-navigation-menu-trigger${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export interface NavigationMenuContentProps extends React.ComponentProps<typeof BaseNav.Content> {
    positionerProps?: React.ComponentProps<typeof BaseNav.Positioner>;
  }

  export function NavigationMenuContent({
    className,
    children,
    positionerProps,
    ...props
  }: NavigationMenuContentProps) {
    return (
      <BaseNav.Portal>
        <BaseNav.Positioner sideOffset={4} {...positionerProps}>
          <BaseNav.Popup>
            <BaseNav.Content
              data-slot="navigation-menu-content"
              className={`sct-navigation-menu-content${className ? ` ${className}` : ""}`}
              {...props}
            >
              {children}
            </BaseNav.Content>
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    );
  }

  export type NavigationMenuLinkProps = React.ComponentProps<typeof BaseNav.Link>;

  export function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
    return (
      <BaseNav.Link
        data-slot="navigation-menu-link"
        className={`sct-navigation-menu-link${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export type NavigationMenuViewportProps = React.ComponentProps<typeof BaseNav.Viewport>;

  export function NavigationMenuViewport({ className, ...props }: NavigationMenuViewportProps) {
    return (
      <BaseNav.Viewport
        data-slot="navigation-menu-viewport"
        className={`sct-navigation-menu-viewport${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

  Create `packages/registry/src/components/navigation-menu/navigation-menu.css`:

  ```css
  @scope (.sct-navigation-menu) {
    :scope {
      position: relative;
      display: flex;
      align-items: center;
    }

    .sct-navigation-menu-list {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .sct-navigation-menu-item {
      position: relative;
    }

    .sct-navigation-menu-trigger {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      height: 2.25rem;
      padding-inline: 0.75rem;
      border-radius: var(--sct-radius-md);
      font-size: var(--sct-font-size-sm);
      font-weight: var(--sct-font-weight-medium);
      color: var(--sct-color-foreground);
      background: transparent;
      border: none;
      cursor: pointer;
      outline: none;
      transition: background-color 150ms;
    }

    .sct-navigation-menu-trigger:hover,
    .sct-navigation-menu-trigger[data-popup-open] {
      background-color: var(--sct-color-accent);
      color: var(--sct-color-accent-foreground);
    }

    .sct-navigation-menu-trigger:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
    }

    .sct-navigation-menu-content {
      min-width: 12rem;
      padding: 0.5rem;
      background-color: var(--sct-color-background);
      border: 1px solid var(--sct-color-border);
      border-radius: var(--sct-radius-lg);
      box-shadow: var(--sct-shadow-lg);
    }

    .sct-navigation-menu-link {
      display: block;
      padding: 0.5rem 0.75rem;
      border-radius: var(--sct-radius-md);
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-foreground);
      text-decoration: none;
      transition: background-color 100ms;
    }

    .sct-navigation-menu-link:hover {
      background-color: var(--sct-color-accent);
      color: var(--sct-color-accent-foreground);
    }

    .sct-navigation-menu-viewport {
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
  ```

  Create `packages/registry/src/components/navigation-menu/registry.meta.json`:

  ```json
  {
    "title": "Navigation Menu",
    "description": "Horizontal navigation with dropdown sub-menus, built on Base UI NavigationMenu.",
    "dependencies": ["@base-ui/react"],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/navigation-menu/navigation-menu.test.tsx
  ```
  Expected: 5 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/navigation-menu
  git commit -m "feat(registry): add navigation-menu component"
  ```

---

## Task 3: `command`

**Files:**
- Create: `packages/registry/src/components/command/command.tsx`
- Create: `packages/registry/src/components/command/command.css`
- Create: `packages/registry/src/components/command/registry.meta.json`
- Create: `packages/registry/src/components/command/command.test.tsx`

- [ ] **Step 1: Write the failing test**

  Create `packages/registry/src/components/command/command.test.tsx`:

  ```tsx
  import { render } from "vitest-browser-react";
  import { describe, it, expect } from "vitest";
  import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
    CommandShortcut,
  } from "./command";

  describe("Command", () => {
    it("renders root with scope class", async () => {
      await render(<Command data-testid="cmd" />);
      expect(document.querySelector("[data-testid='cmd']")?.className).toBe("sct-command");
    });

    it("CommandInput renders an input", async () => {
      const screen = await render(
        <Command>
          <CommandInput placeholder="Search…" />
        </Command>
      );
      await expect.element(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
    });

    it("CommandList renders with listbox role", async () => {
      await render(
        <Command>
          <CommandList data-testid="list" />
        </Command>
      );
      expect(document.querySelector("[data-testid='list']")?.getAttribute("role")).toBe("listbox");
    });

    it("CommandItem renders with option role", async () => {
      const screen = await render(
        <Command>
          <CommandList>
            <CommandItem value="copy">Copy</CommandItem>
          </CommandList>
        </Command>
      );
      await expect.element(screen.getByRole("option", { name: "Copy" })).toBeInTheDocument();
    });

    it("CommandItem is hidden when search does not match its value", async () => {
      const screen = await render(
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandItem value="copy">Copy</CommandItem>
            <CommandItem value="paste">Paste</CommandItem>
          </CommandList>
        </Command>
      );
      const input = screen.getByPlaceholderText("Search");
      await input.fill("copy");
      // 'paste' item should no longer be in the DOM
      const pasteEl = document.querySelector("[data-value='paste']");
      expect(pasteEl).toBeNull();
    });

    it("CommandItem is visible when search matches its value", async () => {
      const screen = await render(
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandItem value="copy">Copy</CommandItem>
          </CommandList>
        </Command>
      );
      const input = screen.getByPlaceholderText("Search");
      await input.fill("cop");
      const copyEl = document.querySelector("[data-value='copy']");
      expect(copyEl).not.toBeNull();
    });

    it("CommandGroup renders heading", async () => {
      const screen = await render(
        <Command>
          <CommandList>
            <CommandGroup heading="Actions">
              <CommandItem value="cut">Cut</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      await expect.element(screen.getByText("Actions")).toBeInTheDocument();
    });

    it("CommandShortcut renders with slot", async () => {
      await render(<Command><CommandList><CommandItem value="x"><span>Cut</span><CommandShortcut data-testid="sc">⌘X</CommandShortcut></CommandItem></CommandList></Command>);
      expect(document.querySelector("[data-testid='sc']")?.getAttribute("data-slot")).toBe("command-shortcut");
    });
  });
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  cd packages/registry && npx vitest run src/components/command/command.test.tsx
  ```
  Expected: FAIL — `Cannot find module './command'`.

- [ ] **Step 3: Implement the component**

  Create `packages/registry/src/components/command/command.tsx`:

  ```tsx
  import { createContext, useContext, useState } from "react";
  import "./command.css";

  interface CommandContextValue {
    search: string;
    setSearch: (v: string) => void;
  }

  const CommandContext = createContext<CommandContextValue>({
    search: "",
    setSearch: () => undefined,
  });

  export function Command({ className, ...props }: React.ComponentProps<"div">) {
    const [search, setSearch] = useState("");
    return (
      <CommandContext.Provider value={{ search, setSearch }}>
        <div
          data-slot="command"
          className={`sct-command${className ? ` ${className}` : ""}`}
          {...props}
        />
      </CommandContext.Provider>
    );
  }

  export function CommandInput({
    className,
    onChange,
    ...props
  }: React.ComponentProps<"input">) {
    const { setSearch } = useContext(CommandContext);
    return (
      <div data-slot="command-input-wrapper" className="sct-command-input-wrapper">
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="sct-command-search-icon"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          data-slot="command-input"
          className={`sct-command-input${className ? ` ${className}` : ""}`}
          onChange={(e) => {
            setSearch(e.target.value);
            onChange?.(e);
          }}
          {...props}
        />
      </div>
    );
  }

  export function CommandList({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        role="listbox"
        data-slot="command-list"
        className={`sct-command-list${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function CommandEmpty({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="command-empty"
        className={`sct-command-empty${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export interface CommandGroupProps extends React.ComponentProps<"div"> {
    heading?: string;
  }

  export function CommandGroup({ heading, className, children, ...props }: CommandGroupProps) {
    return (
      <div
        role="group"
        data-slot="command-group"
        className={`sct-command-group${className ? ` ${className}` : ""}`}
        {...props}
      >
        {heading && (
          <div data-slot="command-group-heading" className="sct-command-group-heading">
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }

  export interface CommandItemProps extends React.ComponentProps<"div"> {
    value?: string;
    onSelect?: (value: string) => void;
  }

  export function CommandItem({
    value = "",
    onSelect,
    className,
    ...props
  }: CommandItemProps) {
    const { search } = useContext(CommandContext);
    const visible =
      !search || value.toLowerCase().includes(search.toLowerCase());

    if (!visible) return null;

    return (
      <div
        role="option"
        data-slot="command-item"
        data-value={value}
        className={`sct-command-item${className ? ` ${className}` : ""}`}
        onClick={() => onSelect?.(value)}
        {...props}
      />
    );
  }

  export function CommandSeparator({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        role="separator"
        data-slot="command-separator"
        className={`sct-command-separator${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }

  export function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
    return (
      <span
        data-slot="command-shortcut"
        className={`sct-command-shortcut${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

  Create `packages/registry/src/components/command/command.css`:

  ```css
  @scope (.sct-command) {
    :scope {
      display: flex;
      flex-direction: column;
      background-color: var(--sct-color-background);
      border: 1px solid var(--sct-color-border);
      border-radius: var(--sct-radius-lg);
      box-shadow: var(--sct-shadow-lg);
      overflow: hidden;
    }

    .sct-command-input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-bottom: 1px solid var(--sct-color-border);
    }

    .sct-command-search-icon {
      flex-shrink: 0;
      color: var(--sct-color-muted-foreground);
    }

    .sct-command-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-foreground);
      outline: none;
    }

    .sct-command-input::placeholder {
      color: var(--sct-color-muted-foreground);
    }

    .sct-command-list {
      overflow-y: auto;
      max-height: 20rem;
      padding: 0.25rem;
    }

    .sct-command-empty {
      padding: 1.5rem;
      text-align: center;
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-muted-foreground);
    }

    .sct-command-group {
      padding: 0.25rem 0;
    }

    .sct-command-group-heading {
      padding: 0.375rem 0.5rem;
      font-size: var(--sct-font-size-xs);
      font-weight: var(--sct-font-weight-medium);
      color: var(--sct-color-muted-foreground);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sct-command-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.5rem;
      border-radius: var(--sct-radius-md);
      font-size: var(--sct-font-size-sm);
      color: var(--sct-color-foreground);
      cursor: pointer;
      outline: none;
      user-select: none;
      transition: background-color 100ms;
    }

    .sct-command-item:hover,
    .sct-command-item:focus {
      background-color: var(--sct-color-accent);
      color: var(--sct-color-accent-foreground);
    }

    .sct-command-separator {
      height: 1px;
      background-color: var(--sct-color-border);
      margin: 0.25rem 0;
    }

    .sct-command-shortcut {
      margin-left: auto;
      font-size: var(--sct-font-size-xs);
      color: var(--sct-color-muted-foreground);
      font-family: var(--sct-font-family-mono);
    }
  }
  ```

  Create `packages/registry/src/components/command/registry.meta.json`:

  ```json
  {
    "title": "Command",
    "description": "Searchable command palette with groups, items, keyboard shortcuts, and empty state.",
    "dependencies": [],
    "devDependencies": [],
    "registryDependencies": []
  }
  ```

- [ ] **Step 4: Run test — confirm it passes**

  ```bash
  cd packages/registry && npx vitest run src/components/command/command.test.tsx
  ```
  Expected: 8 tests PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/registry/src/components/command
  git commit -m "feat(registry): add command palette component"
  ```

---

## Final Group 2 Check

- [ ] **Run full registry test suite**

  ```bash
  npm run test -w packages/registry
  ```
  Expected: All tests pass.

- [ ] **Type-check**

  ```bash
  npm run typecheck
  ```
  Expected: No errors.
