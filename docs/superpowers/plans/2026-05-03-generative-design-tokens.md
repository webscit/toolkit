# Generative Design Token System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static-JSON token pipeline in `@webscit/tokens` with a generator that turns a `ThemeConfig` (from `components.json`) into DTCG JSON, runs Style Dictionary v4 to emit `tokens.css` / `tokens-dark.css` / `theme.css`, and wires the new generator into `@webscit/cli init` (with interactive prompts) and a new `theme` subcommand.

**Architecture:** Generator lives in `packages/tokens/src/generate/`, exposed via `generateTheme(config)`. Color scales come from `@adobe/leonardo-contrast-colors` (light + dark themes against the chosen neutral). Spacing, font-size, and radius scales are `calc()`-derived from one base var per dimension. Two-phase migration: Phase A keeps component CSS unchanged (alias compatibility + shims); Phase B audits each component's CSS to consume the new vocabulary.

**Tech Stack:** TypeScript (ES2022), `@adobe/leonardo-contrast-colors`, Style Dictionary v4 (programmatic API), `@inquirer/prompts`, Vitest (node + browser).

**Spec:** `docs/superpowers/specs/2026-05-03-generative-design-tokens-design.md`

---

## Plan structure (read parts in order)

The plan is split across files in `docs/superpowers/plans/2026-05-03-generative-design-tokens/`:

1. [Part 1 — Foundations](./2026-05-03-generative-design-tokens/part-1-foundations.md): package deps, defaults (neutrals/primaries/fonts), `ThemeConfig` type, validator.
2. [Part 2 — Palette generation](./2026-05-03-generative-design-tokens/part-2-palettes.md): Leonardo wrapper producing 11-step scales for light + dark.
3. [Part 3 — DTCG token emission](./2026-05-03-generative-design-tokens/part-3-tokens.md): `ThemeConfig` → DTCG JSON document (color scales, semantic aliases, sizing/radius/font/border tokens).
4. [Part 4 — CSS emission](./2026-05-03-generative-design-tokens/part-4-css.md): DTCG JSON → CSS via Style Dictionary v4, programmatic; `tokens.css`, `tokens-dark.css`, `theme.css`.
5. [Part 5 — Public API & default build](./2026-05-03-generative-design-tokens/part-5-api-build.md): `generateTheme()`, `defaultThemeConfig()`, replace `build.mjs`, drop static `*.tokens.json`.
6. [Part 6 — CLI integration](./2026-05-03-generative-design-tokens/part-6-cli.md): `@inquirer/prompts` in `init`, write `theme` section in `components.json`, new `theme` subcommand, `--reconfigure` and `--yes` flags.
7. [Part 7 — Phase A verification](./2026-05-03-generative-design-tokens/part-7-phase-a.md): smoke test in registry, Storybook still renders, ship Phase A.
8. [Part 8 — Phase B component audit](./2026-05-03-generative-design-tokens/part-8-phase-b.md): per-component CSS migration to the new vocabulary.

Each part is self-contained: file paths, full code blocks, exact commands, expected output, commit message.

## Conventions used across all parts

- Working directory is the repo root (`/home/fcollonval/projects/sci-ui-toolkit`) unless noted.
- All TypeScript files end with `.ts` (or `.tsx` for React); strict mode and `noUncheckedIndexedAccess` are on.
- Test files live next to source as `*.test.ts` (vitest, node) for `tokens` and `cli`, and `*.test.tsx` (vitest browser) for `registry`.
- Commits use conventional-commit prefixes (`feat:`, `test:`, `refactor:`, `chore:`, `docs:`).
- One commit per task minimum; tests committed alongside the implementation that makes them pass (TDD: write failing test → run it → make it pass → commit together).
- `npm` workspaces; commands target a single workspace via `-w packages/<name>`.
