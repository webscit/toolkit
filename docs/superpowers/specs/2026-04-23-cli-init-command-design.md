# CLI `init` command — design

**Status:** design approved, pending implementation
**Date:** 2026-04-23
**Branch:** `ft/cli-user-story`

## Problem

The current CLI exposes only `add`. The Installation docs tell users to `npm install @webscit/tokens` and import CSS from that package. This contradicts the shadcn-style "user owns the code" model the project explicitly adopts: users own their components but not their design tokens — the tokens remain a versioned npm dependency.

The fix is an `init` command that sets up a project the same way shadcn's `init` does, and additionally copies the compiled token CSS into the user's project so they own it too.

## Goals

- Provide `npx @webscit/toolkit init` to bootstrap toolkit usage in an existing React project.
- Copy the three compiled token CSS files (`tokens.css`, `tokens-dark.css`, `theme.css`) into the user's project.
- Wire imports into the user's CSS entry automatically, so `npx @webscit/toolkit add <component>` works after `init` with no further manual steps.
- Set up `components.json` so `add` continues to work unchanged.
- Keep the door open for future generative tokens (user inputs → synthesized CSS) without breaking the CLI contract.

## Non-goals

- No project scaffolding (no `create-react-app` replacement). `init` operates on an existing project.
- No `webscit update` command for refreshing copied tokens. Users own the files.
- No copying of token JSON source or Style Dictionary build config into the user's project. CSS only.
- No toolkit-specific additions to `components.json`.
- No interactive prompts in this iteration.

## Design

### Command surface

```
npx @webscit/toolkit init
```

No flags. `add` is unchanged. The top-level usage text gains `init` as the first listed command.

### `init` flow

1. **Delegate to shadcn.** Run `npx shadcn@latest init --defaults --yes --registry https://webscit.github.io/toolkit/r` via `execSync` with inherited stdio. shadcn detects the framework, writes `components.json`, and creates the CSS entry file if needed. `--defaults --yes` suppresses prompts.
2. **Re-run tolerance.** If `components.json` already exists before step 1, skip the shadcn invocation (it would error on an existing file) and proceed to step 3. This covers users who ran `shadcn init` directly before adopting the toolkit CLI.
3. **Read `components.json`** from the cwd and extract the `tailwind.css` field — shadcn's path to the CSS entry (e.g., `src/app/globals.css` for Next, `src/index.css` for Vite).
4. **Generate tokens.** Import `generateTokens` from `@webscit/tokens` and call it. Returns `{ tokensCss, tokensDarkCss, themeCss }` as strings.
5. **Write three files** next to the CSS entry: `<dir>/tokens.css`, `<dir>/tokens-dark.css`, `<dir>/theme.css`. If any target already exists, leave it alone and warn — the user may have customized it.
6. **Inject imports.** Read the CSS entry file. For each of the three `@import "./tokens.css";` / `tokens-dark.css` / `theme.css` lines, check whether it is already present. Prepend any missing line at the top of the file. Deduplication makes `init` re-runnable.
7. **Report.** Print the files written and the exact `@import` lines injected, with their destination path.

Layer-ordering note: the token CSS must be imported before any other layered stylesheet (CLAUDE.md documents this contract). Prepending at the top of the CSS entry satisfies it.

### Tokens package API

The `@webscit/tokens` package grows a programmatic surface so the CLI has a stable interface that survives the future move to generative tokens.

New exports from `packages/tokens/src/index.ts`:

```ts
export interface TokenBundle {
  tokensCss: string;      // light theme + @layer order declaration
  tokensDarkCss: string;  // dark overrides
  themeCss: string;       // base element styles
}

export interface TokenOptions {}  // empty today; placeholder for future inputs

export function generateTokens(options?: TokenOptions): TokenBundle;
```

**Today:** `generateTokens()` ignores `options` and returns the three CSS strings read from its own `dist/` directory at runtime, resolved relative to `import.meta.url`. The existing Style Dictionary build (`build.mjs`) is unchanged — it still produces the `dist/*.css` files that `generateTokens` reads.

**Tomorrow:** `TokenOptions` grows fields (`brandColor`, `density`, …); the function runs theme-design rules and Style Dictionary programmatically against those inputs. The CLI does not change — it always calls `generateTokens(options)` and writes the result.

Package shape:
- `packages/tokens/src/index.ts` — new TS entry point.
- `packages/tokens/package.json` gains `"main": "./dist/index.js"`, `"types": "./dist/index.d.ts"`, and an `"exports"` map. A TS compile step is added to the build pipeline alongside Style Dictionary.
- Existing `dist/*.css` exports remain. The docs app continues to consume them as it does today.

### CLI package changes

The CLI transitions from a bare `.ts` file with only `execSync` to a real compiled package.

- `packages/cli/package.json` gains `"dependencies": { "@webscit/tokens": "^0.1.0" }` — matches the tokens package's published name and current version. Inside the monorepo it resolves via npm workspaces; on npm, it resolves to the published `@webscit/tokens` tarball.
- `packages/cli/src/index.ts` grows `fs` / `path` / `url` / `child_process` usage. Still small — under ~150 lines.
- Build already exists (`tsc`); no change there.

`@webscit/tokens` must be published to npm so the CLI's transitive dependency resolves when a user runs `npx @webscit/toolkit init`. It remains internal infrastructure of the CLI — users never `npm install` it directly, and the docs must stop recommending that.

### Documentation updates

Bundled with the code change so the story stays coherent.

**`apps/docs/src/docs/Installation.mdx`** — replace the current three-step flow:
1. **Step 1 — Initialize:** `npx @webscit/toolkit init`. Creates `components.json`, copies `tokens.css`/`tokens-dark.css`/`theme.css` into the project, injects the three `@import` lines at the top of the CSS entry.
2. **Step 2 — Add components:** unchanged `add` flow.
3. **Step 3 — Use a component:** unchanged.

Drop the `npm install @webscit/tokens` note. Dark mode and layer-ordering sections stay.

**`apps/docs/src/docs/Introduction.mdx`** — in the "What's included" list, replace the CLI bullet to mention both `init` (scaffolds tokens + components.json) and `add` (copies components). Update the "Distribution" row of the Technology Choices table to note that tokens are also copied-into-project, not installed.

## Risks and open items

- **shadcn flag behavior.** `--defaults --yes` is expected to suppress all prompts on the current shadcn CLI. If a prompt leaks through during implementation, fall back to piping fixed responses on stdin. Verification item during implementation, not a design gap.
- **`components.json` schema.** shadcn stores the CSS entry path under `tailwind.css` even when Tailwind is not in use. `init` depends on that field name. If a future shadcn major renames it, our `init` breaks. Low probability, trivial fix.
- **Missing CSS entry file.** shadcn normally creates it during `init`. If it does not for some reason, we create an empty file before injecting imports.
- **Existing target files.** If `tokens.css`, `tokens-dark.css`, or `theme.css` already exists in the destination, we skip and warn. Users who want a fresh copy can delete and re-run.

## Verification

- Unit: `generateTokens()` returns three non-empty strings containing the expected `@layer` and `:root` / `[data-theme="dark"]` markers.
- Integration: in a fresh Vite-React project, `npx @webscit/toolkit init` followed by `add button` produces a working app in which a `<Button>` renders with correct typography and colors in both light and dark modes.
- Re-run safety: running `init` twice in the same project does not duplicate the three `@import` lines in the CSS entry and does not overwrite existing token files.
