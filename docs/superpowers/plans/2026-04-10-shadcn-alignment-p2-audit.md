# Shadcn Alignment — Phase 2 Alignment Audit Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit all existing components in `packages/registry/src/components/` against their shadcn v4 counterparts. Document accepted deviations. Fix any unintentional deviations (prop names, variant values, missing sub-components).

**Architecture:** Each task produces an audit table in `docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md` under a new "## Audit Results" section. Code fixes go directly in the component source files and are committed per component (or per batch for trivial fixes).

**Tech Stack:** shadcn v4 source reference (GitHub: `shadcn-ui/ui`, path `apps/v4/registry/bases/base/ui/`), existing component source in `packages/registry/src/components/`.

---

## Audit table format

Add this table in the component's audit section:

```markdown
### `<name>`

| Prop / slot | Our value | Shadcn v4 value | Status |
|---|---|---|---|
| `variant` | `"default" \| ...` | `"default" \| ...` | ✅ match |
| `size` | `"default" \| "sm" \| "lg"` | adds `"icon-xs"` | ⚠️ accepted deviation |
| `asChild` | not present | present | ❌ intentional skip (Radix only) |
```

Status legend:
- ✅ — exact match
- ⚠️ — deviation, acceptable (document why)
- ❌ — intentional skip (document why)
- 🔧 — deviation fixed in this PR

---

## Acceptable deviations (never flag)

- `asChild` prop — Radix pattern, not applicable with Base UI
- Tailwind utility class props (e.g., `unstyled`) — no CSS equivalent
- Styling implementation differences (CVA vs data-attributes)
- Props backed by Base UI internals that differ from Radix internals

---

## Where to find shadcn v4 source

Each component file lives at:
```
https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/bases/base/ui/<name>.tsx
```

Use the `mcp__shadcn-studio-mcp__get-component-content` tool (if available) or fetch the raw GitHub URL directly.

---

## Task 1: Audit high-priority components — `menu`, `select`, `dialog`, `alert-dialog`

These are flagged in the spec as requiring the most careful review.

**Files:**
- Modify: `docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md` (add audit tables)
- Possibly modify: `packages/registry/src/components/menu/menu.tsx`
- Possibly modify: `packages/registry/src/components/select/select.tsx`
- Possibly modify: `packages/registry/src/components/dialog/dialog.tsx`
- Possibly modify: `packages/registry/src/components/alert-dialog/alert-dialog.tsx`

### Audit process (repeat for each component)

- [ ] **Step 1: Read our component source**

  Read the component file(s) and list all exported names, prop interfaces, and variant/size values.

  ```bash
  # Read menu
  cat packages/registry/src/components/menu/menu.tsx
  # Read select
  cat packages/registry/src/components/select/select.tsx
  # Read dialog
  cat packages/registry/src/components/dialog/dialog.tsx
  # Read alert-dialog
  cat packages/registry/src/components/alert-dialog/alert-dialog.tsx
  ```

- [ ] **Step 2: Fetch shadcn v4 source for each**

  Use the MCP tool if available:
  ```
  mcp__shadcn-studio-mcp__get-component-content("dropdown-menu")
  mcp__shadcn-studio-mcp__get-component-content("select")
  mcp__shadcn-studio-mcp__get-component-content("dialog")
  mcp__shadcn-studio-mcp__get-component-content("alert-dialog")
  ```

  If MCP is unavailable, fetch raw:
  ```
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/dropdown-menu.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/select.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/dialog.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/alert-dialog.tsx
  ```

- [ ] **Step 3: Compare `menu` vs `dropdown-menu`**

  Check these dimensions for `menu.tsx` vs shadcn's `dropdown-menu.tsx`:

  | Dimension | What to check |
  |---|---|
  | Root export name | Our `Menu` vs shadcn's `DropdownMenu` — our name is intentionally `Menu` per the spec |
  | Sub-component exports | `MenuTrigger`, `MenuContent`, `MenuItem`, `MenuSeparator`, `MenuLabel`, `MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem` — verify all present |
  | `MenuGroup` | shadcn exports a `DropdownMenuGroup` wrapping `Menu.Group` — add `MenuGroup` if missing |
  | `MenuSubTrigger` / `MenuSubContent` | shadcn exposes these — verify present or add via `BaseMenu.SubmenuRoot` / `BaseMenu.SubmenuTrigger` |
  | `MenuShortcut` | shadcn exports a `DropdownMenuShortcut` span — add `MenuShortcut` if missing |
  | `inset` prop on `MenuItem` | shadcn has `inset?: boolean` for left-padded items — add if missing |

  **Fix**: For any missing export (e.g. `MenuGroup`, `MenuSubTrigger`, `MenuSubContent`, `MenuShortcut`), add it to `menu.tsx` following the existing pattern. Example for `MenuShortcut`:

  ```tsx
  export function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
    return (
      <span
        data-slot="menu-shortcut"
        className={`sct-menu-shortcut${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

  And add CSS to `menu.css`:
  ```css
  .sct-menu-shortcut {
    margin-left: auto;
    font-size: var(--sct-font-size-xs);
    color: var(--sct-color-muted-foreground);
    font-family: var(--sct-font-family-mono);
  }
  ```

  For `MenuGroup`:
  ```tsx
  export function MenuGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <BaseMenu.Group
        data-slot="menu-group"
        className={`sct-menu-group${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

  For `MenuSub` / `MenuSubTrigger` / `MenuSubContent`:
  ```tsx
  export const MenuSub = BaseMenu.SubmenuRoot;
  export type MenuSubProps = React.ComponentProps<typeof BaseMenu.SubmenuRoot>;

  export function MenuSubTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <BaseMenu.SubmenuTrigger
        data-slot="menu-sub-trigger"
        className={`sct-menu-item sct-menu-sub-trigger${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14" className="sct-menu-chevron">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseMenu.SubmenuTrigger>
    );
  }

  export interface MenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {
    positionerProps?: React.ComponentProps<typeof BaseMenu.Positioner>;
  }

  export function MenuSubContent({ className, children, positionerProps, ...props }: MenuSubContentProps) {
    return (
      <BaseMenu.Portal>
        <BaseMenu.Positioner side="right" {...positionerProps}>
          <BaseMenu.Popup
            data-slot="menu-sub-content"
            className={`sct-menu-content${className ? ` ${className}` : ""}`}
            {...props}
          >
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    );
  }
  ```

- [ ] **Step 4: Compare `select` vs shadcn `select`**

  Shadcn v4 `select` is also based on Base UI. Compare:

  | Dimension | What to check |
  |---|---|
  | Sub-components | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectLabel`, `SelectSeparator`, `SelectGroup` — verify all present |
  | `SelectGroup` | shadcn exports a `SelectGroup` wrapping `BaseSelect.Group` — add if missing |
  | `SelectScrollUpButton` / `SelectScrollDownButton` | shadcn has these for long lists — add if missing using `BaseSelect.ScrollUpArrow` / `BaseSelect.ScrollDownArrow` |
  | `SelectItemText` | shadcn wraps `Select.ItemText` — our implementation inlines it inside `SelectItem`; note as ⚠️ deviation |

  **Fix for `SelectGroup`** (add to `select.tsx` if missing):
  ```tsx
  export function SelectGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <BaseSelect.Group
        data-slot="select-group"
        className={`sct-select-group${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```

- [ ] **Step 5: Compare `dialog` vs shadcn `dialog`**

  | Dimension | What to check |
  |---|---|
  | Sub-components | `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` — verify all present |
  | `DialogContent` structure | shadcn includes `DialogClose` icon button inside `DialogContent` — our implementation does not; note as ⚠️ deviation (consumer adds their own close button) |

- [ ] **Step 6: Compare `alert-dialog` vs shadcn `alert-dialog`**

  Read `packages/registry/src/components/alert-dialog/alert-dialog.tsx` and compare vs shadcn:

  | Dimension | What to check |
  |---|---|
  | Sub-components | `AlertDialog`, `AlertDialogTrigger`, `AlertDialogPortal`, `AlertDialogOverlay`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel` |
  | `AlertDialogAction` / `AlertDialogCancel` | These are styled buttons with role semantics — verify exported |

- [ ] **Step 7: Run tests after any fixes**

  ```bash
  npm run test -w packages/registry
  ```
  Expected: All tests pass.

- [ ] **Step 8: Write audit tables in spec doc**

  Append a `## Audit Results` section to `docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md` with tables for `menu`, `select`, `dialog`, `alert-dialog`.

- [ ] **Step 9: Commit**

  ```bash
  git add packages/registry/src/components/menu \
          packages/registry/src/components/select \
          packages/registry/src/components/dialog \
          packages/registry/src/components/alert-dialog \
          docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md
  git commit -m "fix(registry): align menu/select/dialog/alert-dialog APIs with shadcn v4"
  ```

---

## Task 2: Audit form-input components — `input`, `textarea`, `checkbox`, `radio`, `radio-group`, `switch`, `slider`, `field`

**Files:**
- Read each component source in `packages/registry/src/components/<name>/`
- Modify where fixes are needed
- Modify: `docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md`

- [ ] **Step 1: Fetch shadcn v4 counterparts**

  ```
  # Use MCP tool or fetch raw URLs:
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/input.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/textarea.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/checkbox.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/radio-group.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/switch.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/slider.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/label.tsx
  ```

  Note: shadcn v4 does not have a `field` component (they use `Form` instead). Our `field` has no counterpart — no audit needed.

- [ ] **Step 2: Audit each component**

  For each component, check:

  **`input`**: shadcn v4 `input` is a plain `<input>` wrapper. Verify our prop interface matches (no unexpected additions or missing ones).

  **`textarea`**: same approach as input.

  **`checkbox`**: shadcn v4 uses Base UI Checkbox. Check if shadcn exports `CheckboxIndicator` separately. Our component likely inlines the indicator.

  **`radio-group`**: shadcn exports `RadioGroup` + `RadioGroupItem`. Verify sub-component names match. Our `radio-group.tsx` should export both.

  **`switch`**: shadcn uses Base UI Switch. Check sub-component structure.

  **`slider`**: shadcn uses Base UI Slider. Check if shadcn exports `SliderTrack`, `SliderRange`, `SliderThumb` separately — verify our exports match.

  **`label`**: shadcn exports a plain styled `<label>`. Verify our `Label` is a styled label.

- [ ] **Step 3: Fix any non-intentional deviations**

  For each deviation found that is not in the "acceptable" list, apply the fix. Common fixes:
  - Missing sub-component export → add it following existing patterns
  - Prop renamed → update prop name and update any tests that use the old name

- [ ] **Step 4: Run tests**

  ```bash
  npm run test -w packages/registry
  ```
  Expected: All tests pass.

- [ ] **Step 5: Write audit tables in spec doc**

  Append audit tables for all 7 components to `docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md`.

- [ ] **Step 6: Commit**

  ```bash
  git add packages/registry/src/components/input \
          packages/registry/src/components/textarea \
          packages/registry/src/components/checkbox \
          packages/registry/src/components/radio-group \
          packages/registry/src/components/switch \
          packages/registry/src/components/slider \
          packages/registry/src/components/label \
          docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md
  git commit -m "fix(registry): align form-input component APIs with shadcn v4"
  ```

---

## Task 3: Audit display components — `badge`, `card`, `separator`, `skeleton`, `alert`, `toast`

**Files:**
- Read each component source in `packages/registry/src/components/<name>/`
- Modify where fixes are needed
- Modify: `docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md`

Note: `toast` is kept as a custom extension (shadcn v4 dropped it); no shadcn counterpart to compare against.

- [ ] **Step 1: Fetch shadcn v4 counterparts**

  ```
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/badge.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/card.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/separator.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/skeleton.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/alert.tsx
  ```

- [ ] **Step 2: Audit each component**

  **`badge`**: shadcn v4 Badge has `variant` prop. Verify our `variant` values match (`"default" | "secondary" | "destructive" | "outline"`). Note: shadcn renders as `<span>` or polymorphic — verify we use `<span>`.

  **`card`**: shadcn v4 exports `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`, and also `CardAction` (a right-aligned slot for actions in the header). Check if our `card.tsx` is missing `CardAction`.

  Fix for missing `CardAction` (add to `card.tsx`):
  ```tsx
  export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-action"
        className={`sct-card-action${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  }
  ```
  Add CSS to `card.css`:
  ```css
  .sct-card-action {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  ```

  **`separator`**: shadcn exports a `Separator` with `orientation` and `decorative` props. Verify our `Separator` has both.

  **`skeleton`**: shadcn exports a single `Skeleton` component. Verify ours does the same.

  **`alert`**: shadcn exports `Alert`, `AlertTitle`, `AlertDescription`. Verify all three are exported and that `Alert` has a `variant` prop (`"default" | "destructive"`).

- [ ] **Step 3: Fix any non-intentional deviations**

- [ ] **Step 4: Run tests**

  ```bash
  npm run test -w packages/registry
  ```

- [ ] **Step 5: Write audit tables and commit**

  ```bash
  git add packages/registry/src/components/badge \
          packages/registry/src/components/card \
          packages/registry/src/components/separator \
          packages/registry/src/components/skeleton \
          packages/registry/src/components/alert \
          docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md
  git commit -m "fix(registry): align display component APIs with shadcn v4"
  ```

---

## Task 4: Audit overlay/navigation components — `tooltip`, `popover`, `collapsible`, `accordion`, `tabs`, `sheet`, `scroll-area`, `resizable`, `sidebar`

**Files:**
- Read each component source
- Modify where fixes needed
- Modify: `docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md`

- [ ] **Step 1: Fetch shadcn v4 counterparts**

  ```
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/tooltip.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/popover.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/collapsible.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/accordion.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/tabs.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/sheet.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/scroll-area.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/resizable.tsx
  ```

  Note: shadcn v4 does not have a `sidebar` component. Our `sidebar` is a custom extension — skip audit.

- [ ] **Step 2: Audit each component**

  **`tooltip`**: shadcn exports `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`. Verify all four are exported. Note: our `tooltip.tsx` uses `BaseTooltip.Provider` vs shadcn using a different name — align export names.

  **`popover`**: shadcn exports `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`. Check if we export `PopoverAnchor` — if not, note as ⚠️ or add:
  ```tsx
  export function PopoverAnchor({ ...props }: React.ComponentProps<typeof BasePopover.Anchor>) {
    return <BasePopover.Anchor data-slot="popover-anchor" {...props} />;
  }
  ```

  **`collapsible`**: shadcn exports `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`. Verify all three match.

  **`accordion`**: shadcn exports `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`. Verify all four.

  **`tabs`**: shadcn exports `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`. Verify all four. Note: shadcn `TabsTrigger` uses `BaseTabs.Tab` which is what we use.

  **`sheet`**: shadcn exports `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`. Compare with our implementation. Note: our `sheet` is likely similar to `dialog` with a slide animation.

  **`scroll-area`**: shadcn exports `ScrollArea`, `ScrollBar`. Verify both are exported.

  **`resizable`**: shadcn exports `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`. Verify all three.

- [ ] **Step 3: Fix any non-intentional deviations**

- [ ] **Step 4: Run tests**

  ```bash
  npm run test -w packages/registry
  ```

- [ ] **Step 5: Write audit tables and commit**

  ```bash
  git add packages/registry/src/components/tooltip \
          packages/registry/src/components/popover \
          packages/registry/src/components/collapsible \
          packages/registry/src/components/accordion \
          packages/registry/src/components/tabs \
          packages/registry/src/components/sheet \
          packages/registry/src/components/scroll-area \
          packages/registry/src/components/resizable \
          docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md
  git commit -m "fix(registry): align overlay/navigation component APIs with shadcn v4"
  ```

---

## Task 5: Audit form/layout components — `button`, `button-group`, `table`, `input-group`, `checkbox-group`, `radio`

**Files:**
- Read each component source
- Modify where fixes needed
- Modify: `docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md`

Note: `button-group`, `checkbox-group`, and `radio` are custom extensions (no shadcn equivalent). Document them as intentional-keep and do a minimal structural check.

- [ ] **Step 1: Fetch shadcn v4 counterparts**

  ```
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/button.tsx
  https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/base/ui/table.tsx
  ```

  For `input-group`, `button-group`, `checkbox-group`, `radio` — no shadcn counterpart.

- [ ] **Step 2: Audit `button`**

  | Dimension | Check |
  |---|---|
  | `variant` values | Our: `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` — verify matches shadcn exactly |
  | `size` values | Our: `"default" \| "xs" \| "sm" \| "lg" \| "icon"` — shadcn v4 may add `"icon-xs"` — note as ⚠️ deviation if different, do not add to avoid API churn |
  | `data-slot` | shadcn uses `data-slot="button"` — verify we have it |

- [ ] **Step 3: Audit `table`**

  shadcn exports: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`. Verify all are present in our `table.tsx`.

- [ ] **Step 4: Document custom extensions**

  In the audit doc, add a section:

  ```markdown
  ### Custom extensions (no shadcn counterpart)

  | Component | Notes |
  |---|---|
  | `button-group` | Groups buttons with shared border radius treatment |
  | `checkbox-group` | Multi-checkbox with shared label and error state |
  | `radio` | Standalone radio item (shadcn only ships `radio-group`) |
  | `input-group` | Input with prefix/suffix slots |
  | `toast` | Kept because we drop `sonner` (not relevant to scientific UIs) |
  | `sidebar` | Custom complex navigation component |
  | `field` | Form field with label, description, error slot |
  ```

- [ ] **Step 5: Run tests**

  ```bash
  npm run test -w packages/registry
  ```

- [ ] **Step 6: Write audit tables and commit**

  ```bash
  git add packages/registry/src/components/button \
          packages/registry/src/components/table \
          docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md
  git commit -m "fix(registry): align button/table APIs with shadcn v4; document custom extensions"
  ```

---

## Final Phase 2 Check

- [ ] **Run full test suite one last time**

  ```bash
  npm run test -w packages/registry
  ```
  Expected: All tests pass.

- [ ] **Type-check**

  ```bash
  npm run typecheck
  ```
  Expected: No errors.

- [ ] **Verify audit doc is complete**

  Open `docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md` and confirm the `## Audit Results` section has a table for every existing component (or a note for custom extensions with no counterpart).

- [ ] **Final commit**

  ```bash
  git add docs/superpowers/specs/2026-04-10-shadcn-alignment-design.md
  git commit -m "docs: complete shadcn v4 alignment audit"
  ```
