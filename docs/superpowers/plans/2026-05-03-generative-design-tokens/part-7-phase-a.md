# Part 7 — Phase A verification

Phase A is "generator + alias compatibility" — components are not modified. Before opening the PR, verify the generator-produced CSS is shape-compatible with what the registry components expect, that Storybook still renders, and that all workspace tests pass.

**Files modified in this part:**
- `packages/registry/src/components/button/button.test.tsx` — add a single token-resolution smoke test (new test, existing tests untouched).
- (Possibly) generator compatibility shims — only if a registry component uses a token the generator does not yet emit.

---

## Task 7.1 — Audit which tokens registry components consume

The goal is to confirm every `--sct-*` token referenced anywhere in `packages/registry/src/components/**/*.css` is emitted by `generateTheme(defaultThemeConfig())`.

- [ ] **Step 1: List every token referenced by components**

```bash
grep -rhoE "var\(--sct-[a-z0-9-]+" packages/registry/src/components/ \
  | sed -E 's/var\(//' \
  | sort -u > /tmp/registry-tokens.txt
wc -l /tmp/registry-tokens.txt
cat /tmp/registry-tokens.txt
```

Expected: a list of unique token names. Note any unfamiliar ones (e.g. `--sct-font-weight-medium`, `--sct-shadow-xs`, `--sct-line-height-*`) — these were emitted by the legacy build and may not be covered by the generator yet.

- [ ] **Step 2: List every token emitted by the generator**

```bash
grep -oE "^\s*--sct-[a-z0-9-]+" packages/tokens/dist/tokens.css \
  | sed -E 's/^\s+//' \
  | sort -u > /tmp/generated-tokens.txt
wc -l /tmp/generated-tokens.txt
```

- [ ] **Step 3: Diff the two**

```bash
comm -23 /tmp/registry-tokens.txt /tmp/generated-tokens.txt
```

This prints token names referenced by components but not emitted. Each line is a Phase A bug.

Expected (likely) gaps based on the legacy `base.tokens.json`:
- `--sct-font-weight-normal`, `--sct-font-weight-medium`, `--sct-font-weight-semibold`
- `--sct-line-height-tight`, `--sct-line-height-normal`, `--sct-line-height-relaxed`
- `--sct-shadow-xs`, `--sct-shadow-sm`, `--sct-shadow-lg`
- `--sct-color-blue-*`, `--sct-color-red-*`, `--sct-color-green-*`, `--sct-color-amber-*` (palette-named scale not present in new generator — components likely don't reference these directly, verify)
- `--sct-color-neutral-*` numeric steps (now emitted at the new step keys 50/100/200/300/400/500/600/700/800/900/950 — the legacy keys were 0/50/100/200/400/500/600/700/800/900/950; the numeric `0` is gone, `300` is new)
- `--sct-progress-height`, `--sct-sidebar-width`, `--sct-sidebar-width-collapsed`, `--sct-drawer-width`

- [ ] **Step 4: No commit yet**

The diff drives Task 7.2.

---

## Task 7.2 — Add compatibility shims for missing tokens

For every gap surfaced in Task 7.1, the cleanest fix is to add the token to the generator (Part 3, `tokens.ts`) so the legacy name continues to resolve. Only add tokens that the components actually reference.

**Files:**
- Modify: `packages/tokens/src/generate/tokens.ts`
- Update tests in: `packages/tokens/src/generate/tokens.test.ts` (verify each new token's emission)

- [ ] **Step 1: For each missing token, decide its source**

| Missing token | Strategy |
|---|---|
| `--sct-font-weight-normal` (400), `-medium` (500), `-semibold` (600) | Add a `font.weight.*` group: `{ $type: "dimension", $value: "400" }` etc. Type technically `number` per DTCG, but the format ignores type — using `"dimension"` keeps the format simple. (Verify CSS output is just the bare number, which is valid for `font-weight`.) |
| `--sct-line-height-tight` (1.2), `-normal` (1.4), `-relaxed` (1.6) | Add a `font.line-height.*` group — same trick as font-weight. |
| `--sct-shadow-xs/sm/lg` | Add `shadow.{xs,sm,lg}` as `$type: "dimension"` (format ignores `$type`) with the literal CSS value: `"0 1px 2px 0 rgba(0,0,0,0.1)"`, etc. — copy the values from the deleted `base.tokens.json`. |
| `--sct-progress-height` (`0.5rem`), `--sct-sidebar-width` (`256px`), `--sct-sidebar-width-collapsed` (`48px`), `--sct-drawer-width` (`320px`) | Component-specific dimensions. Sidebar/drawer keep `px` (they're not "spacing" — they're container widths, where the spec's rem rule does not strictly apply). Add a top-level `sct.component.{progress.height, sidebar.width, sidebar.width-collapsed, drawer.width}` group. |
| Any palette-named scale (`--sct-color-blue-base` etc.) | Components should not reference these in the new vocabulary — confirm by re-running the diff after the above shims. If anything remains, decide per-token whether to alias it to a new-vocabulary token (e.g. `--sct-color-blue-base` → `var(--sct-color-primary)` when primary is blue is too coupled — better: leave the gap, fail Phase A's "no component change" rule for that one component, and queue it as a Phase B fix). |

- [ ] **Step 2: Add a `componentDimensionsGroup()` and `effectsGroup()` helper to `tokens.ts`**

Insert in `packages/tokens/src/generate/tokens.ts` (above `generateTokenDocuments`):

```ts
function fontWeightGroup(): DtcgGroup {
  return {
    weight: {
      normal: { $type: "dimension", $value: "400" },
      medium: { $type: "dimension", $value: "500" },
      semibold: { $type: "dimension", $value: "600" },
    },
  };
}

function lineHeightGroup(): DtcgGroup {
  return {
    "line-height": {
      tight: { $type: "dimension", $value: "1.2" },
      normal: { $type: "dimension", $value: "1.4" },
      relaxed: { $type: "dimension", $value: "1.6" },
    },
  };
}

function shadowGroup(): DtcgGroup {
  return {
    shadow: {
      xs: { $type: "dimension", $value: "0 1px 2px 0 rgba(0,0,0,0.1)" },
      sm: { $type: "dimension", $value: "0 2px 4px 0 rgba(0,0,0,0.15)" },
      lg: { $type: "dimension", $value: "0 8px 24px 0 rgba(0,0,0,0.2)" },
    },
  };
}

function componentDimensionsGroup(): DtcgGroup {
  return {
    progress: { height: { $type: "dimension", $value: "0.5rem" } },
    sidebar: {
      width: { $type: "dimension", $value: "256px" },
      "width-collapsed": { $type: "dimension", $value: "48px" },
    },
    drawer: { width: { $type: "dimension", $value: "320px" } },
  };
}
```

Update the `font` group to merge in font-weight + line-height:

```ts
function fontGroup(config: ThemeConfig): DtcgGroup {
  const textStack = FONT_FAMILY_STACKS[config.font.text];
  const headingStack =
    config.font.heading === "inherit"
      ? "var(--sct-font-family-text)"
      : FONT_FAMILY_STACKS[config.font.heading];

  const family: DtcgGroup = {
    text: { $type: "fontFamily", $value: textStack },
    heading: { $type: "fontFamily", $value: headingStack },
    mono: { $type: "fontFamily", $value: MONO_FAMILY_STACK },
    sans: { $type: "fontFamily", $value: "var(--sct-font-family-text)" },
  };

  const size: DtcgGroup = {
    base: { $type: "dimension", $value: FONT_SIZE_BASE[config.sizing] },
  };
  for (const [name, mul] of FONT_SIZE_MULTIPLIERS) {
    size[name] = {
      $type: "dimension",
      $value: `calc(var(--sct-font-size-base) * ${mul})`,
    };
  }

  return {
    family,
    size,
    ...fontWeightGroup(),
    ...lineHeightGroup(),
  };
}
```

And update `generateTokenDocuments` to spread the new groups into `lightSct`:

```ts
  const lightSct: DtcgGroup = {
    color: colorGroup(palettes.light),
    spacing: sizing.spacing,
    space: sizing.space,
    radius: radius.radius,
    "radius-scale": radius["radius-scale"],
    font,
    ...border,
    ...shadowGroup(),
    ...componentDimensionsGroup(),
  };
```

- [ ] **Step 3: Add tests for the new tokens**

Append to `packages/tokens/src/generate/tokens.test.ts`:

```ts
describe("generateTokenDocuments — compatibility shims", () => {
  it("emits font weights", () => {
    const w = get(docs.light, "sct.font.weight.medium") as { $value: string };
    expect(w.$value).toBe("500");
  });

  it("emits line heights", () => {
    const lh = get(docs.light, "sct.font.line-height.normal") as {
      $value: string;
    };
    expect(lh.$value).toBe("1.4");
  });

  it("emits shadows", () => {
    const xs = get(docs.light, "sct.shadow.xs") as { $value: string };
    expect(xs.$value).toContain("rgba(");
  });

  it("emits component dimensions", () => {
    const sidebar = get(docs.light, "sct.sidebar.width") as { $value: string };
    expect(sidebar.$value).toBe("256px");
    const progress = get(docs.light, "sct.progress.height") as {
      $value: string;
    };
    expect(progress.$value).toBe("0.5rem");
  });
});
```

- [ ] **Step 4: Rebuild and re-diff**

```bash
npm run build -w packages/tokens
grep -oE "^\s*--sct-[a-z0-9-]+" packages/tokens/dist/tokens.css \
  | sed -E 's/^\s+//' \
  | sort -u > /tmp/generated-tokens.txt
comm -23 /tmp/registry-tokens.txt /tmp/generated-tokens.txt
```

Expected: an empty result. If anything remains, repeat Step 1 of this task with the leftover tokens.

The CSS snapshot (`packages/tokens/src/generate/__snapshots__/css.test.ts.snap`) is now stale — update it intentionally:

```bash
npm test -w packages/tokens -- -u
```

- [ ] **Step 5: Run all tokens tests**

```bash
npm test -w packages/tokens
```

Expected: all green.

- [ ] **Step 6: Commit**

```bash
git add packages/tokens/src/generate/tokens.ts \
        packages/tokens/src/generate/tokens.test.ts \
        packages/tokens/src/generate/__snapshots__/
git commit -m "feat(tokens): emit font-weight, line-height, shadow, and component-dimension shims for Phase A"
```

---

## Task 7.3 — Add a registry-side smoke test

A single browser-mode test asserts that critical tokens resolve to non-empty values when the generator-produced CSS is loaded. This guards against future regressions in the generator that would silently break consumers.

**Files:**
- Modify: `packages/registry/src/components/button/button.test.tsx` (append one test; do not modify existing ones)

- [ ] **Step 1: Append the test**

Find the last `});` of the existing `describe("Button", ...)` block in `button.test.tsx` and insert the following test inside it:

```tsx
  it("resolves the core --sct-* tokens used by Button", async () => {
    const screen = await render(<Button>resolves</Button>);
    const el = screen.container.querySelector(".sct-button") as HTMLElement;
    const styles = window.getComputedStyle(el);
    // Token names referenced in button.css; these must resolve to non-empty values.
    for (const name of [
      "--sct-color-primary",
      "--sct-color-primary-foreground",
      "--sct-color-ring",
      "--sct-radius-md",
      "--sct-font-size-sm",
      "--sct-font-weight-medium",
    ]) {
      expect(styles.getPropertyValue(name).trim()).not.toBe("");
    }
  });
```

If the existing imports do not already include `render` from `vitest-browser-react` and `expect` from vitest, the test file will already have them — every other test uses the same harness. Don't duplicate imports.

- [ ] **Step 2: Run the test**

```bash
npm test -w packages/registry -- button
```

Expected: all button tests pass, including the new one.

If the new test fails because the generator-produced CSS isn't loaded into the browser test environment, the registry's vitest setup loads the legacy bundled CSS. Confirm via:

```bash
grep -rn "tokens.css" packages/registry/
```

If the test setup imports `@webscit/tokens/tokens.css` (or similar), no change is needed — the package exports map already points to the regenerated `dist/tokens.css`. If it imports a stale path, update the setup file rather than weakening the test.

- [ ] **Step 3: Commit**

```bash
git add packages/registry/src/components/button/button.test.tsx
git commit -m "test(registry): assert core sct tokens resolve in Button"
```

---

## Task 7.4 — Run the full workspace verification

- [ ] **Step 1: Build everything**

```bash
npm run build
```

Expected: every workspace builds. If `apps/docs` fails because Storybook config is missing (per the project memory's Phase 1 note: docs build is currently a no-op), that's pre-existing behavior — not a regression introduced by this work.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: clean.

- [ ] **Step 3: Typecheck**

```bash
npm run typecheck
```

Expected: clean across all workspaces (the CLI break introduced in Part 5 is fixed by Part 6).

- [ ] **Step 4: Tests**

```bash
npm test
```

Expected: all green.

- [ ] **Step 5: Manual Storybook check**

```bash
npm run dev -w apps/docs
```

Open `http://localhost:6006`. Verify:
- The button renders with primary background, white text, rounded corners — the new tokens are in effect.
- Toggle dark mode (set `data-theme="dark"` on `<html>` via the toolbar or browser devtools); colors invert correctly.
- Spot-check a few components: input, dialog, sidebar, table.

If any component looks visually broken (collapsed padding, wrong color contrast, missing border), capture the issue in a follow-up task — but only fix in Phase A if the cause is a missing token (more shims). If the cause is a structural change in the alias map (e.g. `--sct-color-muted-foreground` now points to `neutral.600` whereas the old static value pointed to `neutral.500`), the generator's choice is the new contract; Phase B will adjust component CSS if the visual result is undesirable.

Stop the dev server with Ctrl-C.

- [ ] **Step 6: No commit (verification only)**

---

## Task 7.5 — Update CLAUDE.md and project memory

The project memory references behaviors that have changed (`base.tokens.json` is gone, `init.ts` accepts overwrite, etc.).

**Files:**
- Modify: `CLAUDE.md`
- Modify: `~/.claude/projects/-home-fcollonval-projects-sci-ui-toolkit/memory/MEMORY.md` (and any linked memory files)

- [ ] **Step 1: Update CLAUDE.md**

In `CLAUDE.md`, replace the "Design Token System" section with a description of the generator. The relevant edits:

- Tokens no longer live in `*.tokens.json` files; they're produced by `generateTheme(config)` in `packages/tokens/src/generate/`.
- Default theme is `defaultThemeConfig()`; consumers configure via the `theme` section of `components.json`.
- `npx @webscit/toolkit theme` regenerates after edits.

Keep the "CSS layer contract" subsection as-is — the contract is preserved.

- [ ] **Step 2: Update memory**

Add a note to `MEMORY.md`:

```
- Tokens are generated, not static: `packages/tokens/src/generate/` owns the pipeline. `theme` section in `components.json` is the source of truth for consumer themes.
```

Remove any memory that's now stale (e.g. references to `base.tokens.json`, the original `generateTokens()` signature).

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for the generative token system"
```

(MEMORY.md is outside the repo — update it but don't commit.)

---

## End of Part 7

Phase A is complete. The branch can be merged. From this point onward, no component CSS has been modified, but every consumer can pick a theme and have it generated. Part 8 covers the per-component audit.
