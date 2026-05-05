# Part 8 — Phase B component audit

Phase B walks every component in `packages/registry/src/components/` and migrates its CSS to the new token vocabulary: rem-based lengths via tokens, no raw `px` outside border-width, drop the `--sct-font-family-sans` compatibility alias. Each component is its own task and its own commit.

This part is a **template + checklist**, not a sequence of bespoke tasks per component — the procedure is the same for every component and the diff per component is small. Working through the checklist for all ~50 components is mechanical.

---

## Task 8.1 — Establish the audit checklist

For each component directory under `packages/registry/src/components/<name>/`:

**The Phase B checklist:**

1. **Read** `<name>.css` end-to-end.
2. **Replace raw `px`** (except `border-width`) with the closest scale token:
   - `1px` / `2px` borders are fine — keep as-is or use `var(--sct-border-width-1)` / `-2`.
   - `4px` / `8px` / `12px` / `16px` / `24px` / `32px` etc. → `var(--sct-space-1)` / `-2` / `-3` / `-4` / `-6` / `-8`. (Sizing-medium default: `--sct-spacing` = `0.25rem`, so multipliers map 1:1 with the `*4 px` mental model.)
   - Container widths (sidebar, drawer, modal max-widths) — keep `px` and use a component-dimension token (`--sct-sidebar-width`, etc.); add a new token if the legacy CSS hard-codes a value.
   - Ad-hoc `px` (e.g. `padding: 6px 10px`) — pick the nearest scale token; if nothing fits, propose a new spacing multiplier (e.g. `--sct-space-1.5`) and add it to `tokens.ts`'s `SPACE_MULTIPLIERS`.
3. **Replace raw `rem`** with the closest existing scale token. Same rule: prefer existing token; only widen the scale if multiple components need a new entry.
4. **Replace raw `em` font-size** → `var(--sct-font-size-*)`.
5. **Drop `--sct-font-family-sans`** in favor of `--sct-font-family-text` (or `-heading` for headings).
6. **Verify scale-step references** match the new alias map. The biggest risk is the changed muted-foreground (now neutral.600 vs legacy 500 — visually slightly darker). If a component looks worse with the new value, override locally with `color-mix()` rather than reverting the alias map.
7. **Run the component's tests** — `npm test -w packages/registry -- <name>`.
8. **Visual check** in Storybook for the affected component.
9. **Commit** with `refactor(registry/<name>): use new token vocabulary`.

**Files modified per component:**
- `packages/registry/src/components/<name>/<name>.css` — the migration.
- `packages/tokens/src/generate/tokens.ts` — only if a new token is genuinely needed.
- `packages/tokens/src/generate/tokens.test.ts` — only if a token was added.

After every component is migrated, the compatibility shim `--sct-font-family-sans` is removed from the generator (Task 8.N at the end of Phase B).

---

## Task 8.2 — Generate the component work queue

- [ ] **Step 1: List every component CSS file with raw px or `font-family-sans` references**

```bash
{
  echo "Components with raw px (excluding border-width):"
  for f in packages/registry/src/components/*/*.css; do
    if grep -qE "\b[0-9]+px\b" "$f" && ! grep -qE "border-width" "$f"; then
      echo "  $f"
    fi
  done
  echo
  echo "Components referencing --sct-font-family-sans:"
  grep -lE "--sct-font-family-sans" packages/registry/src/components/*/*.css
} > /tmp/phase-b-queue.txt
cat /tmp/phase-b-queue.txt
```

- [ ] **Step 2: Save the queue alongside the plan**

```bash
cp /tmp/phase-b-queue.txt docs/superpowers/plans/2026-05-03-generative-design-tokens/phase-b-queue.txt
git add docs/superpowers/plans/2026-05-03-generative-design-tokens/phase-b-queue.txt
git commit -m "docs: snapshot Phase B component audit queue"
```

The queue file is the work backlog. Each line is one component task.

---

## Task 8.3 — Worked example: the `button` component

This task shows the procedure end-to-end so the rest of Phase B is mechanical.

**Files:**
- Modify: `packages/registry/src/components/button/button.css`

- [ ] **Step 1: Read the current CSS**

```bash
cat packages/registry/src/components/button/button.css
```

Identify each non-token length and decide its replacement. From the file at the time of writing:

| Current | Replacement | Notes |
|---|---|---|
| `gap: 0.5rem` | `gap: var(--sct-space-2)` | 2 × 0.25rem = 0.5rem (sizing-medium). |
| `height: 2.25rem` | `height: var(--sct-space-9)` | New token: 9 × 0.25rem = 2.25rem. Add `[9, 9]` to `SPACE_MULTIPLIERS`. |
| `padding-inline: 1rem` | `padding-inline: var(--sct-space-4)` | 4 × 0.25rem = 1rem. |
| `padding-block: 0.5rem` | `padding-block: var(--sct-space-2)` | 2 × 0.25rem = 0.5rem. |
| `border: 1px solid …` | unchanged | Border widths stay in `px` per spec. |
| `box-shadow: 0 0 0 3px …` | unchanged | 3px ring offset; intrinsic to focus styling. (Optionally hoist to `--sct-ring-offset` later.) |

The button does not reference `--sct-font-family-sans`, so step 5 is a no-op for this component.

- [ ] **Step 2: Add `[9, 9]` to `SPACE_MULTIPLIERS`**

Edit `packages/tokens/src/generate/tokens.ts`:

```ts
export const SPACE_MULTIPLIERS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [8, 8],
  [9, 9],   // <- new
  [10, 10],
  [12, 12],
  [16, 16],
  [20, 20],
  [24, 24],
] as const;
```

Add a test to `tokens.test.ts`:

```ts
it("emits --sct-space-9 (button height)", () => {
  const space9 = get(docs.light, "sct.space.9") as { $value: string };
  expect(space9.$value).toBe("calc(var(--sct-spacing) * 9)");
});
```

Run:

```bash
npm test -w packages/tokens -- tokens.test
npm run build -w packages/tokens
```

Update the css.test snapshot intentionally:

```bash
npm test -w packages/tokens -- -u
```

Expected: tests pass.

- [ ] **Step 3: Apply the migration to `button.css`**

In the `:scope` block:

```css
:scope {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: var(--sct-space-2);
  border-radius: var(--sct-radius-md);
  font-size: var(--sct-font-size-sm);
  font-weight: var(--sct-font-weight-medium);
  /* ... unchanged: white-space, border, cursor, transition, outline, text-decoration ... */

  background-color: var(--sct-color-primary);
  color: var(--sct-color-primary-foreground);

  height: var(--sct-space-9);
  padding-inline: var(--sct-space-4);
  padding-block: var(--sct-space-2);
}
```

- [ ] **Step 4: Run button tests**

```bash
npm test -w packages/registry -- button
```

Expected: all green (the smoke test from Task 7.3 still passes).

- [ ] **Step 5: Visual check**

```bash
npm run dev -w apps/docs
```

Open the Button stories. Verify default, destructive, outline, secondary, ghost, link variants render unchanged. Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add packages/tokens/src/generate/tokens.ts \
        packages/tokens/src/generate/tokens.test.ts \
        packages/tokens/src/generate/__snapshots__/ \
        packages/registry/src/components/button/button.css
git commit -m "refactor(registry/button): use new spacing token vocabulary"
```

---

## Task 8.4 — Apply the checklist to remaining components

For every entry in `phase-b-queue.txt`, repeat the procedure from Task 8.3:

1. Read CSS.
2. Compute replacements.
3. If a token is missing, add it to `tokens.ts` + a test, commit alongside the component change.
4. Edit CSS.
5. Run that component's tests.
6. Visual-check in Storybook.
7. Commit per component.

**Suggested ordering** (smallest blast radius first; widely-used components last):

1. Layout-only / trivial: `aspect-ratio`, `separator`, `skeleton`, `spinner`, `card`, `direction`, `kbd`, `label`.
2. Atomic: `badge`, `progress`, `toggle`, `switch`, `checkbox`, `radio`.
3. Inputs: `input`, `textarea`, `field`, `native-select`.
4. Compound: `button-group`, `radio-group`, `checkbox-group`, `toggle-group`, `input-group`.
5. Composed widgets: `select`, `combobox`, `command`, `pagination`.
6. Surfaces: `popover`, `tooltip`, `hover-card`, `sheet`, `dialog`, `alert-dialog`, `drawer`, `toast`.
7. Navigation: `menu`, `menubar`, `context-menu`, `navigation-menu`, `tabs`, `breadcrumb`, `accordion`, `collapsible`.
8. Layout/shell: `sidebar`, `resizable`, `scroll-area`, `table`.
9. Misc: `alert`, `empty`, `item`, `slider`.
10. The `button` component is already done in Task 8.3.

**Per-component task template** (copy into each component's commit message body):

```
refactor(registry/<name>): use new token vocabulary

- Replaced raw px/rem with --sct-space-* / --sct-font-size-*
- Tokens added: <list, or "none">
- Visual check: passed in Storybook
```

**Stopping rule:** if a component requires more than two new tokens or a new alias-map entry, stop and discuss with the maintainer before proceeding. The two-new-tokens threshold catches cases where a component encodes a design decision the spec didn't anticipate.

- [ ] **Step 1: Work through the queue**

Each component is one task. Plan-runners (subagent-driven or inline) should treat each component as a separate task with its own commit. The repetition is intentional — every commit is reviewable, revertible, and small.

---

## Task 8.5 — Drop the `--sct-font-family-sans` compatibility shim

After every component CSS file is migrated and grep returns no remaining references:

- [ ] **Step 1: Verify no references remain**

```bash
grep -rE "--sct-font-family-sans" packages/registry/src/components/
```

Expected: empty output. If anything remains, finish migrating that component first.

- [ ] **Step 2: Remove the shim from `tokens.ts`**

In `packages/tokens/src/generate/tokens.ts`, delete the `sans` entry from the `family` group inside `fontGroup`:

```ts
const family: DtcgGroup = {
  text: { $type: "fontFamily", $value: textStack },
  heading: { $type: "fontFamily", $value: headingStack },
  mono: { $type: "fontFamily", $value: MONO_FAMILY_STACK },
  // sans: removed — Phase B complete.
};
```

Update the corresponding test in `tokens.test.ts` — delete the assertion that expected `sans` and add an assertion that `family.sans` is `undefined`.

- [ ] **Step 3: Update the css snapshot**

```bash
npm run build -w packages/tokens
npm test -w packages/tokens -- -u
```

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: all green.

- [ ] **Step 5: Commit**

```bash
git add packages/tokens/src/generate/tokens.ts \
        packages/tokens/src/generate/tokens.test.ts \
        packages/tokens/src/generate/__snapshots__/
git commit -m "refactor(tokens): drop --sct-font-family-sans compatibility shim"
```

---

## Task 8.6 — Final verification

- [ ] **Step 1: Workspace-wide smoke**

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Expected: all green.

- [ ] **Step 2: Manual Storybook walk-through**

```bash
npm run dev -w apps/docs
```

Walk every component's stories. Note any visual regression vs. the pre-Phase-B baseline; file follow-up issues for anything you intentionally don't fix here. Stop the dev server.

- [ ] **Step 3: Confirm no raw px/rem outside the allowed cases**

```bash
grep -rEn "\b[0-9]+px\b" packages/registry/src/components/*/*.css \
  | grep -v "border-width" \
  | grep -v "9999px" \
  | grep -v "/\*"
```

Expected: ideally empty. Anything left should be a deliberate, commented exception (e.g. a hairline `box-shadow` offset).

- [ ] **Step 4: No commit**

Phase B is complete.

---

## End of Part 8

After Part 8, the registry consumes the new token vocabulary throughout. The compatibility shims are gone. The branch is ready to merge to `main`. The whole feature ships in two reviewable phases:

- **Phase A** (Parts 1–7): generator + alias compatibility + Phase A verification. Mergeable independently.
- **Phase B** (Part 8): per-component audit. Mergeable on its own once Phase A is in.
