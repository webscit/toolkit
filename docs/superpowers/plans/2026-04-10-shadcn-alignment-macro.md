# Shadcn Alignment — Macro Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align `packages/registry/` with the shadcn v4 base UI component set by adding 19 missing components and auditing all existing components for API parity.

**Architecture:** New components follow the `@scope (.sct-<name>)` CSS convention, using `@base-ui/react` primitives where available and native HTML for layout/display-only components. Each component ships with `.tsx`, `.css`, `registry.meta.json`, and a Vitest browser-mode test.

**Tech Stack:** React 19, `@base-ui/react` (v1 RC), Vitest browser-mode via Playwright Chromium, W3C DTCG design tokens → Style Dictionary v4 → CSS custom properties.

---

## Sub-plans

| Plan file | Contents | Components |
|---|---|---|
| `2026-04-10-shadcn-alignment-p1-group1.md` | Phase 1 — Group 1 | `aspect-ratio`, `breadcrumb`, `direction`, `empty`, `item`, `kbd`, `native-select`, `pagination`, `spinner` |
| `2026-04-10-shadcn-alignment-p1-group2.md` | Phase 1 — Group 2 | `progress`, `navigation-menu`, `command` |
| `2026-04-10-shadcn-alignment-p1-group3.md` | Phase 1 — Group 3 | `toggle`, `toggle-group`, `context-menu`, `hover-card`, `menubar`, `drawer`, `combobox` |
| `2026-04-10-shadcn-alignment-p2-audit.md` | Phase 2 — Alignment Audit | All existing components vs. shadcn v4 |

---

## Execution

### Task 1: Phase 1 Group 1

**Files:** `docs/superpowers/plans/2026-04-10-shadcn-alignment-p1-group1.md`

- [ ] **Step 1: Execute Group 1 plan**

  Open `docs/superpowers/plans/2026-04-10-shadcn-alignment-p1-group1.md` and execute each task in order using superpowers:executing-plans or superpowers:subagent-driven-development.

- [ ] **Step 2: Verify all Group 1 tests pass**

  ```bash
  cd packages/registry && npx vitest run src/components/aspect-ratio src/components/breadcrumb src/components/direction src/components/empty src/components/item src/components/kbd src/components/native-select src/components/pagination src/components/spinner
  ```
  Expected: 9 test suites, all PASS.

---

### Task 2: Phase 1 Group 2

**Files:** `docs/superpowers/plans/2026-04-10-shadcn-alignment-p1-group2.md`

- [ ] **Step 1: Execute Group 2 plan**

  Open `docs/superpowers/plans/2026-04-10-shadcn-alignment-p1-group2.md` and execute each task in order.

- [ ] **Step 2: Verify all Group 2 tests pass**

  ```bash
  cd packages/registry && npx vitest run src/components/progress src/components/navigation-menu src/components/command
  ```
  Expected: 3 test suites, all PASS.

---

### Task 3: Phase 1 Group 3

**Files:** `docs/superpowers/plans/2026-04-10-shadcn-alignment-p1-group3.md`

- [ ] **Step 1: Execute Group 3 plan**

  Open `docs/superpowers/plans/2026-04-10-shadcn-alignment-p1-group3.md` and execute each task in order.

- [ ] **Step 2: Verify all Group 3 tests pass**

  ```bash
  cd packages/registry && npx vitest run src/components/toggle src/components/toggle-group src/components/context-menu src/components/hover-card src/components/menubar src/components/drawer src/components/combobox
  ```
  Expected: 7 test suites, all PASS.

---

### Task 4: Full Build Verification

- [ ] **Step 1: Build tokens**

  ```bash
  npm run build -w packages/tokens
  ```
  Expected: `packages/tokens/dist/tokens.css` and `packages/tokens/dist/tokens-dark.css` generated without errors.

- [ ] **Step 2: Build registry**

  ```bash
  npm run build -w packages/registry
  ```
  Expected: TypeScript compilation and registry manifest generation succeed.

- [ ] **Step 3: Type-check all packages**

  ```bash
  npm run typecheck
  ```
  Expected: Zero type errors across all packages.

- [ ] **Step 4: Run full test suite**

  ```bash
  npm run test -w packages/registry
  ```
  Expected: All component tests pass (including new and existing).

---

### Task 5: Phase 2 Alignment Audit

**Files:** `docs/superpowers/plans/2026-04-10-shadcn-alignment-p2-audit.md`

- [ ] **Step 1: Execute Phase 2 plan**

  Open `docs/superpowers/plans/2026-04-10-shadcn-alignment-p2-audit.md` and execute each audit task in order.

- [ ] **Step 2: Final full test run**

  ```bash
  npm run test -w packages/registry
  ```
  Expected: All tests pass after any API fixes applied during audit.

- [ ] **Step 3: Commit audit results**

  ```bash
  git add docs/
  git commit -m "docs: add shadcn v4 alignment audit results"
  ```
