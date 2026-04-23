# CLI `init` Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `npx @webscit/toolkit init` — delegates to `shadcn init --defaults --yes`, copies the three compiled token CSS files into the user's project, and injects the corresponding `@import` lines at the top of the user's CSS entry.

**Architecture:** A new `generateTokens()` function in `@webscit/tokens` returns the three CSS strings (read from the package's own `dist/`). The CLI gains a thin `init` subcommand wired to a testable `runToolkitInit(cwd, tokenBundle)` function. Delegation to `shadcn init` stays in the top-level CLI entry as a thin `execSync` call, outside the unit-tested surface.

**Tech Stack:** Node ≥ 18, TypeScript, Vitest (node env — new to CLI), Style Dictionary (unchanged), npm workspaces.

**Spec:** `docs/superpowers/specs/2026-04-23-cli-init-command-design.md`

**Deviation from spec — filename alignment:** Spec and consumer imports say `theme.css`, but `packages/tokens/build.mjs` currently writes to `dist/base.css`. Task 1 fixes the build output filename to `theme.css`, aligning with the spec, `packages/tokens/package.json` exports, `apps/example/src/main.tsx`, and the `@layer theme` contents the file contains.

---

## File Structure

**`packages/tokens/`**
- `build.mjs` — modify: write `dist/theme.css` instead of `dist/base.css`.
- `src/index.ts` — create: exports `generateTokens`, `TokenBundle`, `TokenOptions`.
- `package.json` — modify: add `main`, `types`, and `.` entry in `exports`; add `tsc -p tsconfig.build.json` to the build script; add `files` whitelist so `dist/` + package.json ship.
- `tsconfig.json` — modify: replace `"files": []` with `"include": ["src/**/*"]` so `tsc --noEmit` type-checks the new source.
- `tsconfig.build.json` — already has `"include": ["src/**/*"]` and `declaration`; no change.

**`packages/cli/`**
- `src/init.ts` — create: `runToolkitInit(cwd, tokenBundle)` does the file copy + import injection. Pure w.r.t. network; reads and writes under `cwd`.
- `src/init.test.ts` — create: vitest tests for `runToolkitInit` covering copy, skip-existing, dedup-imports, missing-CSS-entry cases.
- `src/index.ts` — rewrite: handles `init` and `add` subcommands; `init` shells out to `shadcn init`, reads `components.json`, calls `generateTokens()` + `runToolkitInit()`, prints report.
- `package.json` — modify: add `@webscit/tokens` dep, `vitest` devDep, `test` script.
- `vitest.config.ts` — create: node environment.

**`apps/docs/src/docs/`**
- `Installation.mdx` — rewrite step flow around `init`; drop `npm install @webscit/tokens`.
- `Introduction.mdx` — update "What's included" CLI bullet and "Distribution" table row.

---

## Task 1: Rename token build output `base.css` → `theme.css`

**Files:**
- Modify: `packages/tokens/build.mjs` (line 144)

- [ ] **Step 1: Edit `build.mjs`**

Replace the `writeFileSync("dist/base.css", ...)` call with `writeFileSync("dist/theme.css", ...)`. Only the string literal for the destination changes; the CSS content is unchanged.

Locate this line in `packages/tokens/build.mjs`:

```js
writeFileSync(
  "dist/base.css",
```

Change to:

```js
writeFileSync(
  "dist/theme.css",
```

- [ ] **Step 2: Rebuild tokens**

Run: `npm run build -w packages/tokens`
Expected: output includes "✓ tokens built"; `packages/tokens/dist/theme.css` now contains the full base reset (≈7 KB, the content currently written under `base.css`). Stale 149-byte `dist/theme.css` is overwritten.

- [ ] **Step 3: Verify the rebuilt file**

Run: `head -6 packages/tokens/dist/theme.css`
Expected output (exactly):

```
/**
 * Do not edit directly, this file was auto-generated.
 */

@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
```

- [ ] **Step 4: Commit**

```bash
git add packages/tokens/build.mjs packages/tokens/dist/theme.css
git commit -m "Align token build output filename to theme.css"
```

---

## Task 2: Add `generateTokens()` programmatic API to `@webscit/tokens`

**Files:**
- Create: `packages/tokens/src/index.ts`
- Modify: `packages/tokens/tsconfig.json`
- Modify: `packages/tokens/package.json`

- [ ] **Step 1: Create the TS entry point**

Create `packages/tokens/src/index.ts`:

```ts
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export interface TokenBundle {
  tokensCss: string;
  tokensDarkCss: string;
  themeCss: string;
}

// Placeholder for future generative inputs (brand color, density, …).
// Empty today — callers should pass {} or omit.
export type TokenOptions = Record<string, never>;

const here = dirname(fileURLToPath(import.meta.url));

function read(file: string): string {
  // After tsc compilation, this file lives at dist/index.js; the CSS files
  // live alongside it at dist/*.css. Resolve relative to the compiled output.
  return readFileSync(join(here, file), "utf8");
}

export function generateTokens(_options?: TokenOptions): TokenBundle {
  return {
    tokensCss: read("tokens.css"),
    tokensDarkCss: read("tokens-dark.css"),
    themeCss: read("theme.css"),
  };
}
```

- [ ] **Step 2: Allow `tsconfig.json` to include `src/**/*`**

The existing `packages/tokens/tsconfig.json` uses `"files": []`. That was a scaffold-phase workaround for "no input files". Now that `src/index.ts` exists, switch to `include`:

Edit `packages/tokens/tsconfig.json` — replace the whole file with:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "module": "node16",
    "moduleResolution": "node16",
    "rootDir": "src",
    "types": ["node"]
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 3: Run type-check**

Run: `npm run typecheck -w packages/tokens`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add packages/tokens/src/index.ts packages/tokens/tsconfig.json
git commit -m "Add generateTokens() programmatic API to @webscit/tokens"
```

---

## Task 3: Wire `@webscit/tokens` to ship the JS entry point

**Files:**
- Modify: `packages/tokens/package.json`

- [ ] **Step 1: Update `package.json`**

Replace `packages/tokens/package.json` with:

```json
{
  "name": "@webscit/tokens",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "node build.mjs && tsc -p tsconfig.build.json",
    "typecheck": "tsc --noEmit"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./tokens.css": "./dist/tokens.css",
    "./tokens-dark.css": "./dist/tokens-dark.css",
    "./theme.css": "./dist/theme.css"
  },
  "files": [
    "dist"
  ],
  "devDependencies": {
    "@tokens-studio/sd-transforms": "^2.0.3",
    "style-dictionary": "^5.4.0",
    "typescript": "^6.0.2"
  }
}
```

Notable changes:
- `main` / `types` added (for consumers using legacy resolution).
- `exports["."]` points to the compiled `dist/index.js` + `.d.ts`.
- `scripts.build` now also runs `tsc -p tsconfig.build.json` after Style Dictionary, to emit `dist/index.js` + `dist/index.d.ts`.
- `files: ["dist"]` ensures the package ships only the built output (and implicitly `package.json`).

- [ ] **Step 2: Rebuild tokens**

Run: `npm run build -w packages/tokens`
Expected: `tokens built` log line, then TS compile. Afterwards:
- `packages/tokens/dist/index.js` exists.
- `packages/tokens/dist/index.d.ts` exists.
- The three `dist/*.css` files from Task 1 are still present.

- [ ] **Step 3: Verify the compiled entry**

Run: `node --input-type=module -e 'import("./packages/tokens/dist/index.js").then(m => console.log(Object.keys(m.generateTokens()).sort().join(",")))'`
Expected output: `themeCss,tokensCss,tokensDarkCss`

- [ ] **Step 4: Commit**

```bash
git add packages/tokens/package.json
git commit -m "Expose @webscit/tokens JS entry so CLI can consume generateTokens"
```

---

## Task 4: Add vitest + `@webscit/tokens` to CLI package

**Files:**
- Modify: `packages/cli/package.json`
- Modify: `packages/cli/tsconfig.json`
- Create: `packages/cli/vitest.config.ts`

- [ ] **Step 1: Update `package.json`**

Replace `packages/cli/package.json` with:

```json
{
  "name": "@webscit/toolkit",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "webscit": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@webscit/tokens": "^0.1.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^6.0.2",
    "vitest": "^3.0.0"
  },
  "files": [
    "dist"
  ]
}
```

- [ ] **Step 2: Exclude test files from the tsc build**

Edit `packages/cli/tsconfig.json` — replace the whole file with:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "moduleResolution": "node16",
    "module": "node16",
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["src/**/*.test.ts"]
}
```

- [ ] **Step 3: Create `vitest.config.ts`**

Create `packages/cli/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Install new deps**

Run: `npm install` (from repo root)
Expected: `@webscit/tokens` appears symlinked in `packages/cli/node_modules/@webscit/tokens`; `vitest` installs in the workspace.

- [ ] **Step 5: Verify vitest runs (with no tests yet)**

Run: `npm run test -w packages/cli`
Expected: vitest reports "No test files found" or exits 0 with 0 tests. Either is fine at this point.

- [ ] **Step 6: Commit**

```bash
git add packages/cli/package.json packages/cli/tsconfig.json packages/cli/vitest.config.ts package-lock.json
git commit -m "Add vitest and @webscit/tokens dep to CLI package"
```

---

## Task 5: TDD — `runToolkitInit()` copies CSS files next to the CSS entry

**Files:**
- Create: `packages/cli/src/init.test.ts`
- Create: `packages/cli/src/init.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/cli/src/init.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runToolkitInit } from "./init.js";

function makeFixture(): { cwd: string; cssPath: string } {
  const cwd = mkdtempSync(join(tmpdir(), "webscit-init-"));
  const cssDir = join(cwd, "src", "app");
  mkdirSync(cssDir, { recursive: true });
  const cssPath = join(cssDir, "globals.css");
  writeFileSync(cssPath, "body { color: red; }\n");
  writeFileSync(
    join(cwd, "components.json"),
    JSON.stringify({ tailwind: { css: "src/app/globals.css" } }),
  );
  return { cwd, cssPath };
}

const tokenBundle = {
  tokensCss: "/* light */",
  tokensDarkCss: "/* dark */",
  themeCss: "/* base */",
};

describe("runToolkitInit", () => {
  it("copies the three token CSS files next to the CSS entry", () => {
    const { cwd } = makeFixture();

    runToolkitInit(cwd, tokenBundle);

    expect(readFileSync(join(cwd, "src/app/tokens.css"), "utf8")).toBe("/* light */");
    expect(readFileSync(join(cwd, "src/app/tokens-dark.css"), "utf8")).toBe("/* dark */");
    expect(readFileSync(join(cwd, "src/app/theme.css"), "utf8")).toBe("/* base */");
  });
});
```

- [ ] **Step 2: Run the test — expect failure**

Run: `npm run test -w packages/cli`
Expected: FAIL. The failure message should cite `./init.js` not resolving (module doesn't exist yet).

- [ ] **Step 3: Write the minimal implementation**

Create `packages/cli/src/init.ts`:

```ts
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { TokenBundle } from "@webscit/tokens";

interface ComponentsJson {
  tailwind?: { css?: string };
}

interface InitResult {
  cssEntryPath: string;
  filesWritten: string[];
  filesSkipped: string[];
  importsInjected: string[];
}

const OUTPUTS: Array<{ key: keyof TokenBundle; filename: string }> = [
  { key: "tokensCss", filename: "tokens.css" },
  { key: "tokensDarkCss", filename: "tokens-dark.css" },
  { key: "themeCss", filename: "theme.css" },
];

export function runToolkitInit(cwd: string, bundle: TokenBundle): InitResult {
  const componentsJsonPath = join(cwd, "components.json");
  const cfg = JSON.parse(readFileSync(componentsJsonPath, "utf8")) as ComponentsJson;
  const cssRel = cfg.tailwind?.css;
  if (!cssRel) {
    throw new Error(
      `components.json at ${componentsJsonPath} does not have a tailwind.css entry`,
    );
  }
  const cssEntryPath = resolve(cwd, cssRel);
  const cssDir = dirname(cssEntryPath);

  const filesWritten: string[] = [];
  const filesSkipped: string[] = [];
  for (const { key, filename } of OUTPUTS) {
    const dest = join(cssDir, filename);
    if (existsSync(dest)) {
      filesSkipped.push(dest);
      continue;
    }
    writeFileSync(dest, bundle[key]);
    filesWritten.push(dest);
  }

  return { cssEntryPath, filesWritten, filesSkipped, importsInjected: [] };
}
```

- [ ] **Step 4: Run the test — expect pass**

Run: `npm run test -w packages/cli`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/init.ts packages/cli/src/init.test.ts
git commit -m "Add runToolkitInit with initial file-copy test"
```

---

## Task 6: TDD — skip and warn when target files already exist

**Files:**
- Modify: `packages/cli/src/init.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `packages/cli/src/init.test.ts`, inside the existing `describe` block:

```ts
  it("skips files that already exist without overwriting", () => {
    const { cwd } = makeFixture();
    const existing = join(cwd, "src/app/tokens.css");
    writeFileSync(existing, "/* user-customized */");

    const result = runToolkitInit(cwd, tokenBundle);

    expect(readFileSync(existing, "utf8")).toBe("/* user-customized */");
    expect(result.filesSkipped).toContain(existing);
    expect(result.filesWritten).not.toContain(existing);
    expect(result.filesWritten).toContain(join(cwd, "src/app/tokens-dark.css"));
    expect(result.filesWritten).toContain(join(cwd, "src/app/theme.css"));
  });
```

- [ ] **Step 2: Run the tests — expect pass**

Run: `npm run test -w packages/cli`
Expected: PASS (2 tests). (The existing implementation already supports this; the test validates it.)

- [ ] **Step 3: Commit**

```bash
git add packages/cli/src/init.test.ts
git commit -m "Test that runToolkitInit skips existing token files"
```

---

## Task 7: TDD — inject `@import` lines at the top of the CSS entry

**Files:**
- Modify: `packages/cli/src/init.test.ts`
- Modify: `packages/cli/src/init.ts`

- [ ] **Step 1: Write the failing test**

Append inside the `describe` block:

```ts
  it("prepends @import lines for the three token files to the CSS entry", () => {
    const { cwd, cssPath } = makeFixture();

    const result = runToolkitInit(cwd, tokenBundle);

    const content = readFileSync(cssPath, "utf8");
    expect(content.startsWith(
      '@import "./tokens.css";\n' +
      '@import "./tokens-dark.css";\n' +
      '@import "./theme.css";\n'
    )).toBe(true);
    expect(content).toContain("body { color: red; }");
    expect(result.importsInjected).toEqual([
      '@import "./tokens.css";',
      '@import "./tokens-dark.css";',
      '@import "./theme.css";',
    ]);
  });
```

- [ ] **Step 2: Run — expect failure**

Run: `npm run test -w packages/cli`
Expected: FAIL on the new test — `content.startsWith(...)` is false, `importsInjected` is empty.

- [ ] **Step 3: Add the injection logic**

Edit `packages/cli/src/init.ts`. Replace the `return { cssEntryPath, ... }` line and the code directly above it with:

```ts
  const importLines = OUTPUTS.map(({ filename }) => `@import "./${filename}";`);
  const original = readFileSync(cssEntryPath, "utf8");
  const missing = importLines.filter((line) => !original.includes(line));
  if (missing.length > 0) {
    const prefix = missing.join("\n") + "\n";
    writeFileSync(cssEntryPath, prefix + original);
  }

  return { cssEntryPath, filesWritten, filesSkipped, importsInjected: missing };
}
```

The full bottom half of `init.ts` now reads:

```ts
  const filesWritten: string[] = [];
  const filesSkipped: string[] = [];
  for (const { key, filename } of OUTPUTS) {
    const dest = join(cssDir, filename);
    if (existsSync(dest)) {
      filesSkipped.push(dest);
      continue;
    }
    writeFileSync(dest, bundle[key]);
    filesWritten.push(dest);
  }

  const importLines = OUTPUTS.map(({ filename }) => `@import "./${filename}";`);
  const original = readFileSync(cssEntryPath, "utf8");
  const missing = importLines.filter((line) => !original.includes(line));
  if (missing.length > 0) {
    const prefix = missing.join("\n") + "\n";
    writeFileSync(cssEntryPath, prefix + original);
  }

  return { cssEntryPath, filesWritten, filesSkipped, importsInjected: missing };
}
```

- [ ] **Step 4: Run — expect pass**

Run: `npm run test -w packages/cli`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/init.ts packages/cli/src/init.test.ts
git commit -m "Inject @import lines at top of CSS entry during init"
```

---

## Task 8: TDD — `init` is idempotent (dedups imports on re-run)

**Files:**
- Modify: `packages/cli/src/init.test.ts`

- [ ] **Step 1: Write the failing test**

Append inside the `describe` block:

```ts
  it("does not duplicate @import lines when run twice", () => {
    const { cwd, cssPath } = makeFixture();

    runToolkitInit(cwd, tokenBundle);
    const afterFirst = readFileSync(cssPath, "utf8");
    const secondResult = runToolkitInit(cwd, tokenBundle);
    const afterSecond = readFileSync(cssPath, "utf8");

    expect(afterSecond).toBe(afterFirst);
    expect(secondResult.importsInjected).toEqual([]);
  });
```

- [ ] **Step 2: Run — expect pass**

Run: `npm run test -w packages/cli`
Expected: PASS (4 tests). (The `missing` filter implemented in Task 7 already covers this; the test validates it.)

- [ ] **Step 3: Commit**

```bash
git add packages/cli/src/init.test.ts
git commit -m "Test that runToolkitInit is idempotent"
```

---

## Task 9: TDD — create CSS entry if it does not exist

**Files:**
- Modify: `packages/cli/src/init.test.ts`
- Modify: `packages/cli/src/init.ts`

- [ ] **Step 1: Write the failing test**

Append inside the `describe` block:

```ts
  it("creates the CSS entry file if it is missing", () => {
    const cwd = mkdtempSync(join(tmpdir(), "webscit-init-"));
    mkdirSync(join(cwd, "src", "app"), { recursive: true });
    writeFileSync(
      join(cwd, "components.json"),
      JSON.stringify({ tailwind: { css: "src/app/globals.css" } }),
    );
    // Note: globals.css intentionally NOT created.

    runToolkitInit(cwd, tokenBundle);

    const content = readFileSync(join(cwd, "src/app/globals.css"), "utf8");
    expect(content).toBe(
      '@import "./tokens.css";\n' +
      '@import "./tokens-dark.css";\n' +
      '@import "./theme.css";\n'
    );
  });
```

- [ ] **Step 2: Run — expect failure**

Run: `npm run test -w packages/cli`
Expected: FAIL on the new test with `ENOENT` from `readFileSync(cssEntryPath, "utf8")`.

- [ ] **Step 3: Guard the read**

In `packages/cli/src/init.ts`, change the `readFileSync` of the CSS entry to tolerate a missing file. Replace:

```ts
  const original = readFileSync(cssEntryPath, "utf8");
```

With:

```ts
  const original = existsSync(cssEntryPath) ? readFileSync(cssEntryPath, "utf8") : "";
```

- [ ] **Step 4: Run — expect pass**

Run: `npm run test -w packages/cli`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/init.ts packages/cli/src/init.test.ts
git commit -m "Create CSS entry file when missing during init"
```

---

## Task 10: Wire the `init` subcommand in the CLI entry

**Files:**
- Modify: `packages/cli/src/index.ts`

- [ ] **Step 1: Rewrite `src/index.ts`**

Replace `packages/cli/src/index.ts` with:

```ts
#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import { generateTokens } from "@webscit/tokens";
import { runToolkitInit } from "./init.js";

const REGISTRY_URL = "https://webscit.github.io/toolkit/r";
const [, , command, ...args] = process.argv;

function printUsage(): void {
  console.log(`
@webscit/toolkit

Usage:
  npx @webscit/toolkit init                     Initialize toolkit in this project
  npx @webscit/toolkit add <component>          Install a component
  npx @webscit/toolkit add button input label   Install multiple components

Components: button, input, label, checkbox, checkbox-group, radio, radio-group,
  switch, select, textarea, dialog, menu, tabs, card, badge, alert, tooltip
  `);
}

if (command === "add") {
  const components = args.join(" ");
  execSync(
    `npx shadcn@latest add --registry ${REGISTRY_URL} ${components}`,
    { stdio: "inherit" },
  );
} else if (command === "init") {
  const cwd = process.cwd();

  if (!existsSync(join(cwd, "components.json"))) {
    console.log("Running shadcn init...");
    execSync(
      `npx shadcn@latest init --defaults --yes --registry ${REGISTRY_URL}`,
      { stdio: "inherit", cwd },
    );
  } else {
    console.log("components.json already exists — skipping shadcn init.");
  }

  console.log("Copying token stylesheets...");
  const bundle = generateTokens();
  const result = runToolkitInit(cwd, bundle);

  const rel = (p: string) => relative(cwd, p);
  for (const f of result.filesWritten) console.log(`  wrote   ${rel(f)}`);
  for (const f of result.filesSkipped)
    console.log(`  skipped ${rel(f)} (already exists)`);

  if (result.importsInjected.length > 0) {
    console.log(
      `\nInjected imports at the top of ${rel(result.cssEntryPath)}:`,
    );
    for (const line of result.importsInjected) console.log(`  ${line}`);
  } else {
    console.log(
      `\nNo imports needed — all three @import lines already present in ${rel(result.cssEntryPath)}.`,
    );
  }

  console.log("\nDone.");
} else {
  printUsage();
}
```

Notes:
- `existsSync` on `components.json` gates the shadcn invocation, matching the spec's re-run tolerance.
- Passing `cwd` to `execSync` explicitly is defensive — `process.cwd()` already defaults there, but this makes it explicit for future refactors.
- `runToolkitInit` is imported via the `./init.js` extension (required by `module: node16`). TypeScript emits `.js` imports as-written.

- [ ] **Step 2: Build the CLI**

Run: `npm run build -w packages/cli`
Expected: clean tsc build. `packages/cli/dist/index.js` and `packages/cli/dist/init.js` produced. Test files are excluded from the build by the `tsconfig.json` change made in Task 4.

- [ ] **Step 3: Type-check across the workspace**

Run: `npm run typecheck`
Expected: no errors across all packages.

- [ ] **Step 4: Run the CLI test suite one more time**

Run: `npm run test -w packages/cli`
Expected: all 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/index.ts
git commit -m "Wire init subcommand in CLI entry"
```

---

## Task 11: End-to-end smoke test in a scratch Vite project

This is a manual verification, not an automated test. Skip if the subagent framework cannot create scratch projects; otherwise run to catch `shadcn init --defaults --yes` behavior that automated tests cannot cover.

- [ ] **Step 1: Create a scratch Vite + React + TS app in a temp directory**

```bash
cd /tmp
rm -rf webscit-smoke
npm create vite@latest webscit-smoke -- --template react-ts
cd webscit-smoke
npm install
```

If `npm create vite` prompts (newer versions ask about rolldown-vite), accept the defaults.

- [ ] **Step 2: Link the local CLI**

From the toolkit repo root, run `npm run build -w packages/cli -w packages/tokens`, then from `/tmp/webscit-smoke`:

```bash
node <path-to-repo>/packages/cli/dist/index.js init
```

Expected:
- shadcn init runs without prompts (`--defaults --yes`).
- `components.json` is created.
- `src/index.css` (or whatever shadcn chose) gains three `@import` lines at the top.
- `src/tokens.css`, `src/tokens-dark.css`, `src/theme.css` exist (in the same directory as the CSS entry).

- [ ] **Step 3: Run init a second time — verify idempotency**

```bash
node <path-to-repo>/packages/cli/dist/index.js init
```

Expected:
- "components.json already exists — skipping shadcn init."
- The three `wrote ...` lines turn into `skipped ... (already exists)`.
- "No imports needed — all three @import lines already present in ..."
- The CSS entry file is unchanged on disk (no duplicate imports).

- [ ] **Step 4: Add a component and dev-server check**

```bash
node <path-to-repo>/packages/cli/dist/index.js add button
npm run dev
```

Expected: dev server starts; adding `<Button>Save</Button>` to `App.tsx` renders a styled button with correct font-family and colors. Toggle `document.documentElement.dataset.theme = "dark"` in the browser console → colors swap.

- [ ] **Step 5: (No commit — this task is verification.)**

If everything works, proceed to docs. If anything fails, go back to the relevant task to fix before proceeding.

---

## Task 12: Rewrite `Installation.mdx`

**Files:**
- Modify: `apps/docs/src/docs/Installation.mdx`

- [ ] **Step 1: Replace the file**

Write `apps/docs/src/docs/Installation.mdx`:

````mdx
import { Meta } from "@storybook/blocks";

<Meta title="Docs/Installation" parameters={{ viewMode: "docs" }} />

# Installation

Components and design tokens are not installed as a dependency. The CLI copies both component source files and compiled token CSS into your project so you own them directly.

## Prerequisites

- Node.js 18 or later
- A React project (Vite, Next.js, or similar)

## Step 1 — Initialize

Run the `init` command in the root of your project:

```bash
npx @webscit/toolkit init
```

`init` does three things:

1. Runs `shadcn init` under the hood with sensible defaults, creating `components.json`.
2. Copies the compiled token stylesheets (`tokens.css`, `tokens-dark.css`, `theme.css`) next to your CSS entry (for example `src/app/` for Next, `src/` for Vite).
3. Prepends three `@import` lines to the top of your CSS entry so the tokens load before any other layered styles.

The command prints exactly what it wrote and what it injected. It is safe to re-run — existing files are left alone and imports are deduplicated.

## Step 2 — Add a component

```bash
npx @webscit/toolkit add button
```

Add multiple components in one call:

```bash
npx @webscit/toolkit add button input label
```

Component source files (`.tsx` and `.css`) are written into your project. You can edit them freely.

## Step 3 — Use the component

Import the component from wherever shadcn placed it (typically `@/components/ui`):

```tsx
import { Button } from "@/components/ui/button";

export function App() {
  return <Button variant="default">Save</Button>;
}
```

## Dark mode

Toggle dark mode by setting `data-theme="dark"` on the `<html>` element:

```ts
// Enable dark mode
document.documentElement.dataset.theme = "dark";

// Return to light mode
document.documentElement.dataset.theme = "";
```

In a React component:

```tsx
function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "";
  }

  return <button onClick={toggle}>{dark ? "Light mode" : "Dark mode"}</button>;
}
```

## CSS layer ordering

The token CSS files are imported at the very top of your CSS entry precisely because they declare the `@layer design-tokens, theme` ordering that other styles in your app rely on. If you later reorganize your imports, keep these three `@import` lines first. See [Theming](?path=/docs/docs-theming--docs) for details.
````

- [ ] **Step 2: Verify Storybook renders the doc**

Run: `npm run dev -w apps/docs`
Navigate to the Installation doc in the browser. Expected: renders without MDX errors; bullets and code blocks display correctly.

Stop the dev server after verification.

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/docs/Installation.mdx
git commit -m "Rewrite Installation doc around init command"
```

---

## Task 13: Update `Introduction.mdx`

**Files:**
- Modify: `apps/docs/src/docs/Introduction.mdx`

- [ ] **Step 1: Update the "What's included" CLI bullet**

In `apps/docs/src/docs/Introduction.mdx`, find:

```md
- **CLI** — `npx @webscit/toolkit add <component>` copies any component into your project
```

Replace with:

```md
- **CLI** — `npx @webscit/toolkit init` scaffolds tokens and `components.json`; `npx @webscit/toolkit add <component>` copies components
```

- [ ] **Step 2: Update the Distribution row of the tech table**

Find:

```md
| Distribution | Copy-into-project via CLI (shadcn-compatible registry) |
```

Replace with:

```md
| Distribution | Copy-into-project for components and tokens via CLI (shadcn-compatible registry) |
```

- [ ] **Step 3: Verify in Storybook**

Run: `npm run dev -w apps/docs`, open the Introduction doc. Expected: bullet and table render without errors. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add apps/docs/src/docs/Introduction.mdx
git commit -m "Mention init command in Introduction"
```

---

## Task 14: Final verification

- [ ] **Step 1: Type-check, lint, and test across the monorepo**

Run (in order):
```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Expected: all commands exit 0. No TypeScript errors. Vitest runs the 5 CLI tests (node env) plus any registry tests.

- [ ] **Step 2: Review the diff against `main`**

Run: `git log --oneline main..HEAD`
Expected: one commit per task (12–13 commits), in the order of tasks, each with a descriptive message.

- [ ] **Step 3: Confirm done**

All tasks complete. Spec coverage:
- `init` subcommand ✅ (Task 10)
- Delegates to `shadcn init --defaults --yes` ✅ (Task 10)
- Re-run tolerance ✅ (Task 10 skip + Tasks 6/8 for file/import dedup)
- Reads `components.json` ✅ (Task 5)
- `generateTokens` programmatic API ✅ (Task 2)
- Tokens package ships JS entry ✅ (Task 3)
- Writes three CSS files next to CSS entry ✅ (Task 5)
- Skip existing files with warning ✅ (Task 6)
- Inject imports at top ✅ (Task 7)
- Dedup imports on re-run ✅ (Task 8)
- Create CSS entry if missing ✅ (Task 9)
- Report to user ✅ (Task 10)
- Installation doc rewrite ✅ (Task 12)
- Introduction doc update ✅ (Task 13)
