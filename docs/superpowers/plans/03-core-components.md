# Phase 3 — Core Components

## Goal

Implement all 17 core components in `packages/registry/src/components/`. Each component consists of a `.tsx` file and a `.css` file (`@scope` rules). CSS rules are translated directly from shadcn v4 Tailwind classes into equivalent plain CSS properties using `--sct-*` tokens.

---

## General CSS translation rules

| Tailwind class         | Plain CSS                                    |
| ---------------------- | -------------------------------------------- |
| `inline-flex`          | `display: inline-flex`                       |
| `items-center`         | `align-items: center`                        |
| `justify-center`       | `justify-content: center`                    |
| `gap-2`                | `gap: 0.5rem`                                |
| `rounded-md`           | `border-radius: var(--sct-radius-md)`        |
| `text-sm`              | `font-size: var(--sct-font-size-sm)`         |
| `font-medium`          | `font-weight: var(--sct-font-weight-medium)` |
| `whitespace-nowrap`    | `white-space: nowrap`                        |
| `transition-all`       | `transition: all 150ms`                      |
| `shadow-xs`            | `box-shadow: var(--sct-shadow-xs)`           |
| `h-9`                  | `height: 2.25rem`                            |
| `px-4`                 | `padding-inline: 1rem`                       |
| `py-2`                 | `padding-block: 0.5rem`                      |
| `w-full`               | `width: 100%`                                |
| `min-w-0`              | `min-width: 0`                               |
| `shrink-0`             | `flex-shrink: 0`                             |
| `opacity-50`           | `opacity: 0.5`                               |
| `pointer-events-none`  | `pointer-events: none`                       |
| `select-none`          | `user-select: none`                          |
| `field-sizing-content` | `field-sizing: content`                      |

**Alpha colors** — `bg-primary/90` → `color-mix(in srgb, var(--sct-color-primary) 90%, transparent)`

**Focus ring** — shadcn's `focus-visible:ring-[3px] focus-visible:ring-ring/50`:

```css
:scope:focus-visible {
  outline: none;
  border-color: var(--sct-color-ring);
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
}
```

**Base UI data attributes** — Base UI uses `data-disabled`, `data-checked`, `data-open`, `data-selected`, `data-highlighted` (not Radix's `data-[state=*]` syntax).

---

## General TSX pattern

```tsx
import "./component.css";

export interface ComponentProps extends React.ComponentProps<
  typeof BasePrimitive
> {
  variant?: "default" | "destructive";
}

export function Component({
  variant = "default",
  className,
  ...props
}: ComponentProps) {
  return (
    <BasePrimitive
      data-slot="component"
      data-variant={variant}
      className={`sct-component${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

---

## Shared utility

`packages/registry/src/lib/cx.ts`

```ts
/** Minimal className joiner. No tailwind-merge needed. */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
```

---

## Components

### 3.1 — Button

**Source reference:** shadcn v4 `button.tsx`
**Primitive:** Base UI `@base-ui-components/react/button`
**Variants:** `default | destructive | outline | secondary | ghost | link`
**Sizes:** `default | xs | sm | lg | icon`

```tsx
import { Button as BaseButton } from "@base-ui-components/react/button";
import "./button.css";

export interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon";
}

export function Button({
  variant = "default",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={`sct-button${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

```css
@scope (.sct-button) {
  :scope {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: var(--sct-radius-md);
    font-size: var(--sct-font-size-sm);
    font-weight: var(--sct-font-weight-medium);
    white-space: nowrap;
    border: none;
    cursor: pointer;
    transition:
      background-color 150ms,
      color 150ms,
      box-shadow 150ms,
      border-color 150ms;
    outline: none;
    text-decoration: none;

    /* default variant */
    background-color: var(--sct-color-primary);
    color: var(--sct-color-primary-foreground);

    /* default size */
    height: 2.25rem;
    padding-inline: 1rem;
    padding-block: 0.5rem;
  }

  /* Focus ring */
  :scope:focus-visible {
    border-color: var(--sct-color-ring);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
  }

  /* Disabled */
  :scope[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  /* Hover: default */
  :scope:not([data-disabled]):hover {
    background-color: color-mix(
      in srgb,
      var(--sct-color-primary) 90%,
      transparent
    );
  }

  /* Variants */
  :scope[data-variant="destructive"] {
    background-color: var(--sct-color-destructive);
    color: var(--sct-color-destructive-foreground);
  }
  :scope[data-variant="destructive"]:not([data-disabled]):hover {
    background-color: color-mix(
      in srgb,
      var(--sct-color-destructive) 90%,
      transparent
    );
  }
  :scope[data-variant="destructive"]:focus-visible {
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-destructive) 20%, transparent);
  }

  :scope[data-variant="outline"] {
    background-color: var(--sct-color-background);
    border: 1px solid var(--sct-color-input);
    color: var(--sct-color-foreground);
    box-shadow: var(--sct-shadow-xs);
  }
  :scope[data-variant="outline"]:not([data-disabled]):hover {
    background-color: var(--sct-color-accent);
    color: var(--sct-color-accent-foreground);
  }

  :scope[data-variant="secondary"] {
    background-color: var(--sct-color-secondary);
    color: var(--sct-color-secondary-foreground);
  }
  :scope[data-variant="secondary"]:not([data-disabled]):hover {
    background-color: color-mix(
      in srgb,
      var(--sct-color-secondary) 80%,
      transparent
    );
  }

  :scope[data-variant="ghost"] {
    background-color: transparent;
    color: var(--sct-color-foreground);
  }
  :scope[data-variant="ghost"]:not([data-disabled]):hover {
    background-color: var(--sct-color-accent);
    color: var(--sct-color-accent-foreground);
  }

  :scope[data-variant="link"] {
    background-color: transparent;
    color: var(--sct-color-primary);
    text-underline-offset: 4px;
  }
  :scope[data-variant="link"]:not([data-disabled]):hover {
    text-decoration: underline;
  }

  /* Sizes */
  :scope[data-size="xs"] {
    height: 1.5rem;
    gap: 0.25rem;
    border-radius: var(--sct-radius-md);
    padding-inline: 0.5rem;
    font-size: var(--sct-font-size-xs);
  }
  :scope[data-size="sm"] {
    height: 2rem;
    gap: 0.375rem;
    border-radius: var(--sct-radius-md);
    padding-inline: 0.75rem;
  }
  :scope[data-size="lg"] {
    height: 2.5rem;
    border-radius: var(--sct-radius-md);
    padding-inline: 1.5rem;
  }
  :scope[data-size="icon"] {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0;
  }

  /* SVG children */
  svg {
    pointer-events: none;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }
}
```

---

### 3.2 — Input

**Source reference:** shadcn v4 `input.tsx`
**Primitive:** Native `<input>` (no Base UI wrapper)

```tsx
import "./input.css";

export type InputProps = React.ComponentProps<"input">;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`sct-input${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

```css
@scope (.sct-input) {
  :scope {
    height: 2.25rem;
    width: 100%;
    min-width: 0;
    border-radius: var(--sct-radius-md);
    border: 1px solid var(--sct-color-input);
    background-color: transparent;
    padding-inline: 0.75rem;
    padding-block: 0.25rem;
    font-size: var(--sct-font-size-base);
    font-family: var(--sct-font-family-sans);
    color: var(--sct-color-foreground);
    box-shadow: var(--sct-shadow-xs);
    transition:
      color 150ms,
      box-shadow 150ms,
      border-color 150ms;
    outline: none;
  }

  :scope::placeholder {
    color: var(--sct-color-muted-foreground);
  }

  :scope:focus-visible {
    border-color: var(--sct-color-ring);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
  }

  :scope:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  :scope[aria-invalid="true"] {
    border-color: var(--sct-color-destructive);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-destructive) 20%, transparent);
  }

  :scope::file-selector-button {
    display: inline-flex;
    height: 1.75rem;
    border: 0;
    background-color: transparent;
    font-size: var(--sct-font-size-sm);
    font-weight: var(--sct-font-weight-medium);
    color: var(--sct-color-foreground);
  }
}
```

---

### 3.3 — Label

**Source reference:** shadcn v4 `label.tsx`
**Primitive:** Native `<label>` (not Radix/Base UI Label)

```tsx
import "./label.css";

export type LabelProps = React.ComponentProps<"label">;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={`sct-label${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

```css
@scope (.sct-label) {
  :scope {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--sct-font-size-sm);
    font-weight: var(--sct-font-weight-medium);
    line-height: 1;
    user-select: none;
    color: var(--sct-color-foreground);
  }

  /* Disabled state when paired with a disabled input via CSS :has() */
  :scope:has(+ input:disabled),
  :scope:has(+ [data-disabled]) {
    pointer-events: none;
    opacity: 0.5;
  }
}
```

---

### 3.4 — Textarea

**Source reference:** shadcn v4 `textarea.tsx`
**Primitive:** Native `<textarea>` (no Base UI wrapper)

```tsx
import "./textarea.css";

export type TextareaProps = React.ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={`sct-textarea${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

```css
@scope (.sct-textarea) {
  :scope {
    display: flex;
    field-sizing: content;
    min-height: 4rem;
    width: 100%;
    border-radius: var(--sct-radius-md);
    border: 1px solid var(--sct-color-input);
    background-color: transparent;
    padding-inline: 0.75rem;
    padding-block: 0.5rem;
    font-size: var(--sct-font-size-base);
    font-family: var(--sct-font-family-sans);
    color: var(--sct-color-foreground);
    box-shadow: var(--sct-shadow-xs);
    transition:
      color 150ms,
      box-shadow 150ms,
      border-color 150ms;
    outline: none;
    resize: vertical;
  }

  :scope::placeholder {
    color: var(--sct-color-muted-foreground);
  }

  :scope:focus-visible {
    border-color: var(--sct-color-ring);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
  }

  :scope:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :scope[aria-invalid="true"] {
    border-color: var(--sct-color-destructive);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-destructive) 20%, transparent);
  }
}
```

---

### 3.5 — Checkbox

**Source reference:** shadcn v4 `checkbox.tsx`
**Primitive:** Base UI `@base-ui-components/react/checkbox` (Checkbox.Root + Checkbox.Indicator)

```tsx
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import "./checkbox.css";

export type CheckboxProps = React.ComponentProps<typeof BaseCheckbox.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={`sct-checkbox${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseCheckbox.Indicator
        data-slot="checkbox-indicator"
        className="sct-checkbox-indicator"
      >
        {/* Checkmark SVG */}
        <svg viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M2 7l4 4 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
```

```css
@scope (.sct-checkbox) {
  :scope {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    border-radius: var(--sct-radius-sm);
    border: 1px solid var(--sct-color-input);
    background-color: transparent;
    box-shadow: var(--sct-shadow-xs);
    transition:
      box-shadow 150ms,
      background-color 150ms,
      border-color 150ms;
    outline: none;
    cursor: pointer;
    padding: 0;
    appearance: none;
  }

  :scope:focus-visible {
    border-color: var(--sct-color-ring);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
  }

  :scope[data-checked] {
    background-color: var(--sct-color-primary);
    border-color: var(--sct-color-primary);
    color: var(--sct-color-primary-foreground);
  }

  :scope[data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :scope[aria-invalid="true"] {
    border-color: var(--sct-color-destructive);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-destructive) 20%, transparent);
  }

  .sct-checkbox-indicator {
    display: grid;
    place-content: center;
    width: 100%;
    height: 100%;
    color: currentColor;
  }

  .sct-checkbox-indicator svg {
    width: 0.875rem;
    height: 0.875rem;
  }
}
```

---

### 3.6 — Checkbox Group

**Primitive:** No direct Base UI primitive — composition of native `<fieldset>` + `<legend>` + Checkbox items

```tsx
import "./checkbox-group.css";

export interface CheckboxGroupProps extends React.ComponentProps<"fieldset"> {
  legend?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

export function CheckboxGroup({
  legend,
  orientation = "vertical",
  className,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <fieldset
      data-slot="checkbox-group"
      data-orientation={orientation}
      className={`sct-checkbox-group${className ? ` ${className}` : ""}`}
      {...props}
    >
      {legend && (
        <legend className="sct-checkbox-group-legend">{legend}</legend>
      )}
      {children}
    </fieldset>
  );
}
```

```css
@scope (.sct-checkbox-group) {
  :scope {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: none;
    padding: 0;
    margin: 0;
  }

  :scope[data-orientation="horizontal"] {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sct-checkbox-group-legend {
    font-size: var(--sct-font-size-sm);
    font-weight: var(--sct-font-weight-medium);
    color: var(--sct-color-foreground);
    margin-bottom: 0.5rem;
    padding: 0;
  }
}
```

---

### 3.7 — Radio

**Primitive:** Base UI `@base-ui-components/react/radio-group` (RadioGroup.Item + RadioGroup.Indicator)
**Note:** Must be used inside a RadioGroup.

```tsx
import { RadioGroup } from "@base-ui-components/react/radio-group";
import "./radio.css";

export type RadioProps = React.ComponentProps<typeof RadioGroup.Item>;

export function Radio({ className, ...props }: RadioProps) {
  return (
    <RadioGroup.Item
      data-slot="radio"
      className={`sct-radio${className ? ` ${className}` : ""}`}
      {...props}
    >
      <RadioGroup.Indicator
        data-slot="radio-indicator"
        className="sct-radio-indicator"
      />
    </RadioGroup.Item>
  );
}
```

```css
@scope (.sct-radio) {
  :scope {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    border-radius: var(--sct-radius-full);
    border: 1px solid var(--sct-color-input);
    background-color: transparent;
    box-shadow: var(--sct-shadow-xs);
    transition:
      box-shadow 150ms,
      border-color 150ms;
    outline: none;
    cursor: pointer;
    padding: 0;
    appearance: none;
  }

  :scope:focus-visible {
    border-color: var(--sct-color-ring);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
  }

  :scope[data-checked] {
    border-color: var(--sct-color-primary);
  }

  :scope[data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .sct-radio-indicator {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: var(--sct-radius-full);
    background-color: var(--sct-color-primary);
    opacity: 0;
    transition: opacity 100ms;
  }

  :scope[data-checked] .sct-radio-indicator {
    opacity: 1;
  }
}
```

---

### 3.8 — Radio Group

**Primitive:** Base UI `@base-ui-components/react/radio-group` (RadioGroup.Root)
**Note:** Wraps Radio items; uses `<fieldset>` semantics.

```tsx
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import "./radio-group.css";

export interface RadioGroupProps extends React.ComponentProps<
  typeof BaseRadioGroup
> {
  legend?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

export function RadioGroup({
  legend,
  orientation = "vertical",
  className,
  ...props
}: RadioGroupProps) {
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      data-orientation={orientation}
      className={`sct-radio-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
```

```css
@scope (.sct-radio-group) {
  :scope {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  :scope[data-orientation="horizontal"] {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
```

---

### 3.9 — Switch

**Source reference:** shadcn v4 `switch.tsx`
**Primitive:** Base UI `@base-ui-components/react/switch` (Switch.Root + Switch.Thumb)

```tsx
import { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import "./switch.css";

export type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={`sct-switch${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseSwitch.Thumb data-slot="switch-thumb" className="sct-switch-thumb" />
    </BaseSwitch.Root>
  );
}
```

```css
@scope (.sct-switch) {
  :scope {
    display: inline-flex;
    align-items: center;
    width: 2.5rem;
    height: 1.25rem;
    flex-shrink: 0;
    border-radius: var(--sct-radius-full);
    border: 2px solid transparent;
    background-color: var(--sct-color-input);
    padding: 0;
    cursor: pointer;
    transition:
      background-color 150ms,
      box-shadow 150ms;
    outline: none;
    appearance: none;
  }

  :scope:focus-visible {
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--sct-color-ring) 50%, transparent);
  }

  :scope[data-checked] {
    background-color: var(--sct-color-primary);
  }

  :scope[data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .sct-switch-thumb {
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: var(--sct-radius-full);
    background-color: var(--sct-color-background);
    box-shadow: var(--sct-shadow-sm);
    pointer-events: none;
    translate: 1px;
    transition: translate 150ms;
  }

  :scope[data-checked] .sct-switch-thumb {
    translate: 1.125rem;
  }
}
```

---

### 3.10 — Select

**Source reference:** shadcn v4 `select.tsx`
**Primitive:** Base UI `@base-ui-components/react/select`

Sub-parts exported: `Select` (Root), `SelectTrigger`, `SelectValue`, `SelectContent` (Positioner + Popup), `SelectItem`, `SelectSeparator`, `SelectLabel`.

Each sub-part has its own `data-slot` attribute and participates in the parent `@scope (.sct-select)` or child scopes like `@scope (.sct-select-content)`.

---

### 3.11 — Dialog

**Source reference:** shadcn v4 `dialog.tsx`
**Primitive:** Base UI `@base-ui-components/react/dialog`

Sub-parts: `Dialog` (Root), `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`.

**Animations** use CSS `@starting-style` (no JS animation library):

```css
@scope (.sct-dialog-content) {
  :scope {
    transition:
      opacity 200ms,
      transform 200ms;
    @starting-style {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.95);
    }
  }
  :scope[data-ending-style] {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
}
```

---

### 3.12 — Menu

**Source reference:** shadcn v4 `dropdown-menu.tsx`
**Primitive:** Base UI `@base-ui-components/react/menu`

Sub-parts: `Menu` (Root), `MenuTrigger`, `MenuContent` (Positioner + Popup), `MenuItem`, `MenuSeparator`, `MenuLabel`, `MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem`.

`data-highlighted` (Base UI) replaces `data-[highlighted]` (Radix) in CSS selectors.

---

### 3.13 — Tabs

**Source reference:** shadcn v4 `tabs.tsx`
**Primitive:** Base UI `@base-ui-components/react/tabs`

Sub-parts: `Tabs` (Root), `TabsList`, `TabsTrigger`, `TabsContent`.

**Base UI uses `data-selected`** on the active tab (not `data-[state=active]`).

---

### 3.14 — Tooltip

**Source reference:** shadcn v4 `tooltip.tsx`
**Primitive:** Base UI `@base-ui-components/react/tooltip`

Sub-parts: `Tooltip` (Root), `TooltipTrigger`, `TooltipContent` (Positioner + Popup).

---

### 3.15 — Card

**Source reference:** shadcn v4 `card.tsx`
**Primitive:** Native HTML

Sub-parts: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` — all plain HTML `<div>` wrappers with `data-slot` and `sct-card-*` classes.

---

### 3.16 — Badge

**Source reference:** shadcn v4 `badge.tsx`
**Primitive:** Native `<span>`
**Variants:** `default | secondary | destructive | outline`

---

### 3.17 — Alert

**Primitive:** Native `<div role="alert">`
**Sub-parts:** `Alert`, `AlertTitle`, `AlertDescription`
**Variants:** `default | destructive`

---

## registry.meta.json pattern

Every component directory contains:

```json
{
  "title": "Button",
  "description": "Themable button built on Base UI.",
  "dependencies": ["@base-ui-components/react"],
  "devDependencies": [],
  "registryDependencies": []
}
```

`registryDependencies` lists other `@webscit/toolkit` components required. For example, Menu depends on Button for the close variant, so it would list `["button"]`.

---

## Tests (per component)

Each component gets `component.test.tsx` covering:

1. Renders without crashing
2. Forwards `className` correctly (appended after scope anchor)
3. Applies correct `data-variant` / `data-size` attributes
4. Disabled state: `data-disabled` present and `pointer-events: none` applied
5. Keyboard interaction (for interactive components)

---

## Acceptance Criteria

- [ ] All 17 components render without errors in Storybook
- [ ] All unit tests pass (`npm test` in `packages/registry`)
- [ ] No hardcoded color/spacing/radius values in any `.css` file — only `--sct-*` vars or `color-mix()` expressions
- [ ] Every interactive component passes keyboard-only navigation test
- [ ] `npm run typecheck` passes with all components exported from `src/index.ts`
- [ ] No `tailwind-merge` or `clsx` imports anywhere
