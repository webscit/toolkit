# Part 6 — CLI integration

Wires the new generator into `@webscit/toolkit` (the CLI). Adds interactive prompts via `@inquirer/prompts`, persists choices in `components.json` under a new `theme` section, and ships a `theme` subcommand that regenerates CSS from that section.

**Files created in this part:**
- `packages/cli/src/theme-config.ts` — read/write the `theme` section of `components.json`.
- `packages/cli/src/theme-config.test.ts`
- `packages/cli/src/prompts.ts` — `@inquirer/prompts` wrappers for the six questions.
- `packages/cli/src/prompts.test.ts`
- `packages/cli/src/theme-command.ts` — the `theme` subcommand handler.
- `packages/cli/src/theme-command.test.ts`

**Files modified in this part:**
- `packages/cli/package.json` — add `@inquirer/prompts` dep.
- `packages/cli/src/init.ts` — accept a pre-built `TokenBundle`, gain an `overwrite` flag.
- `packages/cli/src/init.test.ts` — adapt to the new `init.ts` signature only where needed.
- `packages/cli/src/index.ts` — call prompts on `init`, dispatch `theme` subcommand.

---

## Task 6.1 — Add `@inquirer/prompts` to the CLI

**Files:**
- Modify: `packages/cli/package.json`

- [ ] **Step 1: Add the dep**

Edit `packages/cli/package.json` `dependencies`:

```json
"dependencies": {
  "@inquirer/prompts": "^7.0.0",
  "@webscit/tokens": "^0.1.0"
}
```

- [ ] **Step 2: Install + verify import**

```bash
npm install
node -e "import('@inquirer/prompts').then(m => console.log(typeof m.select))" --input-type=module
```

Expected: prints `function`. If `^7.0.0` does not resolve, fall back to the latest available major and update the manifest.

- [ ] **Step 3: Commit**

```bash
git add packages/cli/package.json package-lock.json
git commit -m "chore(cli): add @inquirer/prompts dependency"
```

---

## Task 6.2 — Read/write the `theme` section of `components.json`

**Files:**
- Create: `packages/cli/src/theme-config.ts`
- Create: `packages/cli/src/theme-config.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// packages/cli/src/theme-config.test.ts
import { describe, it, expect } from "vitest";
import { mkdtempSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { defaultThemeConfig } from "@webscit/tokens";
import {
  readThemeConfig,
  writeThemeConfig,
  hasThemeConfig,
} from "./theme-config.js";

function tempCwd(initial: object): string {
  const cwd = mkdtempSync(join(tmpdir(), "webscit-theme-"));
  writeFileSync(
    join(cwd, "components.json"),
    JSON.stringify(initial, null, 2) + "\n",
  );
  return cwd;
}

describe("theme-config", () => {
  it("hasThemeConfig=false when section is missing", () => {
    const cwd = tempCwd({ tailwind: { css: "src/index.css" } });
    expect(hasThemeConfig(cwd)).toBe(false);
  });

  it("readThemeConfig throws when section is missing", () => {
    const cwd = tempCwd({ tailwind: { css: "src/index.css" } });
    expect(() => readThemeConfig(cwd)).toThrow(/theme/i);
  });

  it("writes theme section without dropping other fields", () => {
    const cwd = tempCwd({
      tailwind: { css: "src/index.css" },
      registries: { "@webscit": "https://x/y/{name}.json" },
    });
    writeThemeConfig(cwd, defaultThemeConfig());

    const content = JSON.parse(
      readFileSync(join(cwd, "components.json"), "utf8"),
    );
    expect(content.tailwind.css).toBe("src/index.css");
    expect(content.registries["@webscit"]).toBe("https://x/y/{name}.json");
    expect(content.theme.neutral).toBe("slate");
    expect(content.theme.primary).toBe("blue");
  });

  it("readThemeConfig validates and returns the section", () => {
    const cwd = tempCwd({
      tailwind: { css: "src/index.css" },
      theme: {
        neutral: "zinc",
        primary: "violet",
        radius: "large",
        sizing: "small",
        font: { text: "serif", heading: "inherit", mono: "system-mono" },
      },
    });
    const cfg = readThemeConfig(cwd);
    expect(cfg.neutral).toBe("zinc");
    expect(cfg.primary).toBe("violet");
    expect(cfg.advanced).toEqual({});
  });

  it("readThemeConfig surfaces validation errors clearly", () => {
    const cwd = tempCwd({
      tailwind: { css: "src/index.css" },
      theme: {
        neutral: "purple",
        primary: "blue",
        radius: "medium",
        sizing: "medium",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      },
    });
    expect(() => readThemeConfig(cwd)).toThrow(/neutral/i);
  });
});
```

- [ ] **Step 2: Run the test (expected to fail)**

```bash
npm test -w packages/cli -- theme-config
```

Expected: `Cannot find module './theme-config.js'`.

- [ ] **Step 3: Implement `theme-config.ts`**

```ts
// packages/cli/src/theme-config.ts
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  defaultThemeConfig,
  parseThemeConfig,
  type ThemeConfig,
} from "@webscit/tokens";

function load(cwd: string): { path: string; data: Record<string, unknown> } {
  const path = join(cwd, "components.json");
  const data = JSON.parse(readFileSync(path, "utf8")) as Record<
    string,
    unknown
  >;
  return { path, data };
}

export function hasThemeConfig(cwd: string): boolean {
  const { data } = load(cwd);
  return data.theme !== undefined && data.theme !== null;
}

export function readThemeConfig(cwd: string): ThemeConfig {
  const { data } = load(cwd);
  if (data.theme === undefined || data.theme === null) {
    throw new Error(
      `components.json has no "theme" section. Run \`npx @webscit/toolkit init\` first.`,
    );
  }
  return parseThemeConfig(data.theme);
}

export function writeThemeConfig(cwd: string, config: ThemeConfig): void {
  const { path, data } = load(cwd);
  data.theme = config;
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

export { defaultThemeConfig };
```

- [ ] **Step 4: Run the tests**

```bash
npm test -w packages/cli -- theme-config
```

Expected: 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/theme-config.ts packages/cli/src/theme-config.test.ts
git commit -m "feat(cli): read and write theme section of components.json"
```

---

## Task 6.3 — Wrap `@inquirer/prompts` for the six questions

**Files:**
- Create: `packages/cli/src/prompts.ts`
- Create: `packages/cli/src/prompts.test.ts`

The wrapper exposes `runThemePrompts(defaults?)` that resolves to a `ThemeConfig`. It accepts a defaults object so the test can pre-fill answers via dependency injection — `@inquirer/prompts`' programmatic test API requires reading from a TTY, which we don't want in unit tests. We isolate behavior by testing the *defaulting and assembly* logic with the actual `select` function injected.

- [ ] **Step 1: Write the failing test**

```ts
// packages/cli/src/prompts.test.ts
import { describe, it, expect, vi } from "vitest";
import { defaultThemeConfig } from "@webscit/tokens";
import { buildPromptPlan, assembleConfig } from "./prompts.js";

describe("buildPromptPlan", () => {
  it("returns six questions with default-aware initial values", () => {
    const plan = buildPromptPlan(defaultThemeConfig());
    const names = plan.map((q) => q.name);
    expect(names).toEqual([
      "neutral",
      "primary",
      "radius",
      "sizing",
      "fontText",
      "fontHeading",
    ]);
    const neutral = plan.find((q) => q.name === "neutral")!;
    expect(neutral.choices).toContain("slate");
    expect(neutral.default).toBe("slate");

    const heading = plan.find((q) => q.name === "fontHeading")!;
    expect(heading.choices).toContain("inherit");
    expect(heading.default).toBe("inherit");
  });
});

describe("assembleConfig", () => {
  it("turns a flat answer record into a ThemeConfig", () => {
    const cfg = assembleConfig({
      neutral: "zinc",
      primary: "violet",
      radius: "large",
      sizing: "small",
      fontText: "serif",
      fontHeading: "inherit",
    });
    expect(cfg.neutral).toBe("zinc");
    expect(cfg.primary).toBe("violet");
    expect(cfg.radius).toBe("large");
    expect(cfg.sizing).toBe("small");
    expect(cfg.font.text).toBe("serif");
    expect(cfg.font.heading).toBe("inherit");
    expect(cfg.font.mono).toBe("system-mono");
    expect(cfg.advanced).toEqual({});
  });
});
```

- [ ] **Step 2: Run the test (expected to fail)**

```bash
npm test -w packages/cli -- prompts.test
```

Expected: `Cannot find module './prompts.js'`.

- [ ] **Step 3: Implement `prompts.ts`**

```ts
// packages/cli/src/prompts.ts
import { select } from "@inquirer/prompts";
import {
  defaultThemeConfig,
  NEUTRAL_CHOICES,
  PRIMARY_CHOICES,
  RADIUS_CHOICES,
  SIZING_CHOICES,
  FONT_CHOICES,
  type ThemeConfig,
  type NeutralName,
  type PrimaryName,
  type FontName,
  type RadiusChoice,
  type SizingChoice,
} from "@webscit/tokens";

export interface PromptQuestion {
  name:
    | "neutral"
    | "primary"
    | "radius"
    | "sizing"
    | "fontText"
    | "fontHeading";
  message: string;
  choices: readonly string[];
  default: string;
}

export function buildPromptPlan(defaults: ThemeConfig): PromptQuestion[] {
  const headingChoices: readonly string[] = ["inherit", ...FONT_CHOICES];
  const headingDefault =
    defaults.font.heading === "inherit" ? "inherit" : defaults.font.heading;
  return [
    {
      name: "neutral",
      message: "Neutral color",
      choices: NEUTRAL_CHOICES,
      default: defaults.neutral,
    },
    {
      name: "primary",
      message: "Primary color",
      choices: PRIMARY_CHOICES,
      default: defaults.primary,
    },
    {
      name: "radius",
      message: "Border radius",
      choices: RADIUS_CHOICES,
      default: defaults.radius,
    },
    {
      name: "sizing",
      message: "Sizing (drives spacing and font size)",
      choices: SIZING_CHOICES,
      default: defaults.sizing,
    },
    {
      name: "fontText",
      message: "Text font",
      choices: FONT_CHOICES,
      default: defaults.font.text,
    },
    {
      name: "fontHeading",
      message: "Heading font",
      choices: headingChoices,
      default: headingDefault,
    },
  ];
}

export interface FlatAnswers {
  neutral: NeutralName;
  primary: PrimaryName;
  radius: RadiusChoice;
  sizing: SizingChoice;
  fontText: FontName;
  fontHeading: FontName | "inherit";
}

export function assembleConfig(answers: FlatAnswers): ThemeConfig {
  return {
    neutral: answers.neutral,
    primary: answers.primary,
    radius: answers.radius,
    sizing: answers.sizing,
    font: {
      text: answers.fontText,
      heading: answers.fontHeading,
      mono: "system-mono",
    },
    advanced: {},
  };
}

export async function runThemePrompts(defaults?: ThemeConfig): Promise<ThemeConfig> {
  const base = defaults ?? defaultThemeConfig();
  const plan = buildPromptPlan(base);
  const answers: Partial<FlatAnswers> = {};
  for (const q of plan) {
    const value = await select({
      message: q.message,
      choices: q.choices.map((c) => ({ name: c, value: c })),
      default: q.default,
    });
    (answers as Record<string, unknown>)[q.name] = value;
  }
  return assembleConfig(answers as FlatAnswers);
}
```

- [ ] **Step 4: Run the tests**

```bash
npm test -w packages/cli -- prompts.test
```

Expected: 2 tests pass. (`runThemePrompts` itself is not unit-tested — it requires a TTY. Its smoke test happens manually after wiring is complete; assembly + plan logic are covered above.)

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/prompts.ts packages/cli/src/prompts.test.ts
git commit -m "feat(cli): add @inquirer/prompts wrapper for theme questions"
```

---

## Task 6.4 — Refactor `init.ts` for the new flow

`runToolkitInit` currently takes a synchronous `TokenBundle` and skips files that exist. Two adjustments:

1. Add an `overwrite` flag (default `false`) so the new `theme` subcommand can force-rewrite files.
2. Keep the existing signature otherwise — the `index.ts` orchestrator builds the bundle from a `ThemeConfig` and passes it in.

**Files:**
- Modify: `packages/cli/src/init.ts`
- Modify: `packages/cli/src/init.test.ts` (add overwrite test only; existing tests stay)

- [ ] **Step 1: Update `init.ts`**

Replace the whole file:

```ts
// packages/cli/src/init.ts
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { TokenBundle } from "@webscit/tokens";

interface ComponentsJson {
  tailwind?: { css?: string };
}

export interface InitOptions {
  overwrite?: boolean;
}

export interface InitResult {
  cssEntryPath: string;
  filesWritten: string[];
  filesSkipped: string[];
  filesOverwritten: string[];
  importsInjected: string[];
}

const OUTPUTS: Array<{ key: keyof TokenBundle; filename: string }> = [
  { key: "tokensCss", filename: "tokens.css" },
  { key: "tokensDarkCss", filename: "tokens-dark.css" },
  { key: "themeCss", filename: "theme.css" },
];

export function runToolkitInit(
  cwd: string,
  bundle: TokenBundle,
  options: InitOptions = {},
): InitResult {
  const componentsJsonPath = join(cwd, "components.json");
  const cfg = JSON.parse(
    readFileSync(componentsJsonPath, "utf8"),
  ) as ComponentsJson;
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
  const filesOverwritten: string[] = [];
  for (const { key, filename } of OUTPUTS) {
    const dest = join(cssDir, filename);
    const exists = existsSync(dest);
    if (exists && !options.overwrite) {
      filesSkipped.push(dest);
      continue;
    }
    writeFileSync(dest, bundle[key]);
    if (exists) filesOverwritten.push(dest);
    else filesWritten.push(dest);
  }

  const importLines = OUTPUTS.map(({ filename }) => `@import "./${filename}";`);
  const original = existsSync(cssEntryPath)
    ? readFileSync(cssEntryPath, "utf8")
    : "";
  const missing = importLines.filter((line) => !original.includes(line));
  if (missing.length > 0) {
    const prefix = missing.join("\n") + "\n";
    writeFileSync(cssEntryPath, prefix + original);
  }

  return {
    cssEntryPath,
    filesWritten,
    filesSkipped,
    filesOverwritten,
    importsInjected: missing,
  };
}
```

- [ ] **Step 2: Add an overwrite test to `init.test.ts`**

Append the following test inside the existing `describe("runToolkitInit", ...)` block (do not modify the existing tests):

```ts
  it("overwrites existing files when overwrite=true", () => {
    const { cwd } = makeFixture();
    const existing = join(cwd, "src/app/tokens.css");
    writeFileSync(existing, "/* user-customized */");

    const result = runToolkitInit(cwd, tokenBundle, { overwrite: true });

    expect(readFileSync(existing, "utf8")).toBe("/* light */");
    expect(result.filesOverwritten).toContain(existing);
    expect(result.filesSkipped).not.toContain(existing);
  });
```

- [ ] **Step 3: Run init tests**

```bash
npm test -w packages/cli -- init
```

Expected: 6 tests pass (5 existing + 1 new).

- [ ] **Step 4: Commit**

```bash
git add packages/cli/src/init.ts packages/cli/src/init.test.ts
git commit -m "feat(cli): support overwrite flag in runToolkitInit"
```

---

## Task 6.5 — Implement the `theme` subcommand handler

**Files:**
- Create: `packages/cli/src/theme-command.ts`
- Create: `packages/cli/src/theme-command.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// packages/cli/src/theme-command.test.ts
import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runThemeCommand } from "./theme-command.js";

function fixture(theme?: object): string {
  const cwd = mkdtempSync(join(tmpdir(), "webscit-theme-cmd-"));
  mkdirSync(join(cwd, "src", "app"), { recursive: true });
  writeFileSync(join(cwd, "src/app/globals.css"), "body{}\n");
  writeFileSync(
    join(cwd, "components.json"),
    JSON.stringify(
      { tailwind: { css: "src/app/globals.css" }, ...(theme ? { theme } : {}) },
      null,
      2,
    ),
  );
  return cwd;
}

describe("runThemeCommand", () => {
  it("regenerates and overwrites the three CSS files", async () => {
    const cwd = fixture({
      neutral: "slate",
      primary: "blue",
      radius: "medium",
      sizing: "medium",
      font: { text: "system", heading: "inherit", mono: "system-mono" },
    });
    // Pre-populate with bogus content to verify overwrite behavior.
    writeFileSync(join(cwd, "src/app/tokens.css"), "/* old */");

    const result = await runThemeCommand(cwd);

    const tokens = readFileSync(join(cwd, "src/app/tokens.css"), "utf8");
    expect(tokens).toContain("@layer design-tokens");
    expect(tokens).not.toBe("/* old */");
    expect(result.filesOverwritten).toContain(join(cwd, "src/app/tokens.css"));
  });

  it("errors if components.json has no theme section", async () => {
    const cwd = fixture(); // no theme
    await expect(runThemeCommand(cwd)).rejects.toThrow(/theme/i);
  });
});
```

- [ ] **Step 2: Run the test (expected to fail)**

```bash
npm test -w packages/cli -- theme-command
```

- [ ] **Step 3: Implement the handler**

```ts
// packages/cli/src/theme-command.ts
import { generateTheme } from "@webscit/tokens";
import { runToolkitInit, type InitResult } from "./init.js";
import { readThemeConfig } from "./theme-config.js";

export async function runThemeCommand(cwd: string): Promise<InitResult> {
  const config = readThemeConfig(cwd);
  const bundle = await generateTheme(config);
  return runToolkitInit(cwd, bundle, { overwrite: true });
}
```

- [ ] **Step 4: Run the test**

```bash
npm test -w packages/cli -- theme-command
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/theme-command.ts packages/cli/src/theme-command.test.ts
git commit -m "feat(cli): add theme subcommand to regenerate from components.json"
```

---

## Task 6.6 — Wire prompts and the `theme` subcommand into `index.ts`

**Files:**
- Modify: `packages/cli/src/index.ts`

The `init` command becomes:

1. Find/create `components.json` (existing behavior).
2. If `theme` section exists and `--reconfigure` is not passed, use the existing config.
3. Otherwise, if `--yes` or `!process.stdout.isTTY`, use `defaultThemeConfig()`.
4. Otherwise, prompt the user via `runThemePrompts(existingOrDefault)`.
5. Persist via `writeThemeConfig`.
6. Generate bundle, call `runToolkitInit` with default `overwrite: false` (existing skip-if-present behavior preserved).

A new `theme` subcommand simply calls `runThemeCommand(cwd)`.

- [ ] **Step 1: Replace `index.ts`**

```ts
#!/usr/bin/env node
// packages/cli/src/index.ts
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import {
  defaultThemeConfig,
  generateTheme,
  type ThemeConfig,
} from "@webscit/tokens";
import { runToolkitInit } from "./init.js";
import {
  createComponentsJson,
  findCssEntry,
  patchComponentsJsonRegistries,
  readTsconfigAliases,
} from "./components-json.js";
import {
  hasThemeConfig,
  readThemeConfig,
  writeThemeConfig,
} from "./theme-config.js";
import { runThemePrompts } from "./prompts.js";
import { runThemeCommand } from "./theme-command.js";

const REGISTRY_URL =
  process.env.WEBSCIT_REGISTRY_URL ?? "https://webscit.github.io/toolkit/r";
const [, , command, ...args] = process.argv;

function printUsage(): void {
  console.log(`
@webscit/toolkit

Usage:
  npx @webscit/toolkit init [--css <path>] [--reconfigure] [--yes]
                                                Initialize the toolkit, prompt for theme
  npx @webscit/toolkit theme                    Regenerate token CSS from components.json
  npx @webscit/toolkit add <component> [...]    Install components

Components: button, input, label, checkbox, checkbox-group, radio, radio-group,
  switch, select, textarea, dialog, menu, tabs, card, badge, alert, tooltip
  `);
}

function toRegistryUrl(name: string): string {
  if (name.startsWith("http://") || name.startsWith("https://")) return name;
  return `${REGISTRY_URL}/${name}.json`;
}

function hasFlag(name: string): boolean {
  return args.includes(name);
}

function flagValue(name: string): string | undefined {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : undefined;
}

async function chooseConfig(cwd: string): Promise<ThemeConfig> {
  const reconfigure = hasFlag("--reconfigure");
  const useDefaults = hasFlag("--yes") || !process.stdout.isTTY;

  if (hasThemeConfig(cwd) && !reconfigure) {
    return readThemeConfig(cwd);
  }
  if (useDefaults) {
    return defaultThemeConfig();
  }
  const startFrom = hasThemeConfig(cwd) ? readThemeConfig(cwd) : defaultThemeConfig();
  return runThemePrompts(startFrom);
}

async function main(): Promise<void> {
  if (command === "add") {
    const urls = args.map(toRegistryUrl).join(" ");
    execSync(`npx shadcn@latest add --yes ${urls}`, { stdio: "inherit" });
    return;
  }

  if (command === "theme") {
    const cwd = process.cwd();
    const result = await runThemeCommand(cwd);
    const rel = (p: string) => relative(cwd, p);
    for (const f of result.filesWritten) console.log(`  wrote      ${rel(f)}`);
    for (const f of result.filesOverwritten)
      console.log(`  rewrote    ${rel(f)}`);
    return;
  }

  if (command === "init") {
    const cwd = process.cwd();
    const cssFlag = flagValue("--css");

    if (!existsSync(join(cwd, "components.json"))) {
      const cssEntry = findCssEntry(cwd, cssFlag);
      const cssRelPath = relative(cwd, cssEntry).replace(/\\/g, "/");
      const { prefix } = readTsconfigAliases(cwd);
      createComponentsJson(cwd, cssRelPath, prefix, REGISTRY_URL);
      console.log("Created components.json.");
    } else {
      console.log("components.json already exists — updating registries.");
      patchComponentsJsonRegistries(cwd, REGISTRY_URL);
    }

    const config = await chooseConfig(cwd);
    writeThemeConfig(cwd, config);
    console.log(
      `Theme: neutral=${config.neutral}, primary=${config.primary}, ` +
        `radius=${config.radius}, sizing=${config.sizing}, ` +
        `font.text=${config.font.text}, font.heading=${config.font.heading}`,
    );

    console.log("Generating token stylesheets...");
    const bundle = await generateTheme(config);
    const result = runToolkitInit(cwd, bundle);

    const rel = (p: string) => relative(cwd, p);
    for (const f of result.filesWritten) console.log(`  wrote   ${rel(f)}`);
    for (const f of result.filesSkipped)
      console.log(`  skipped ${rel(f)} (already exists, run \`theme\` to regenerate)`);

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
    return;
  }

  printUsage();
}

await main();
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck -w packages/cli
```

Expected: no errors.

- [ ] **Step 3: Run all CLI tests**

```bash
npm test -w packages/cli
```

Expected: every test passes (the existing smoke test, init tests, theme-config, prompts, theme-command).

If the smoke test (`packages/cli/src/smoke.test.ts`) fails because it spawns the CLI without a TTY and the CLI now expects to write a `theme` section, the chooser already handles that path — `useDefaults = !process.stdout.isTTY` returns `true`, so `defaultThemeConfig()` is used. If it fails because the smoke fixture lacks a `tsconfig.json`, the existing `readTsconfigAliases` already requires that — the smoke fixture must already provide one. Investigate and fix the fixture if needed; do not weaken `chooseConfig`.

- [ ] **Step 4: Manual smoke test**

```bash
mkdir -p /tmp/webscit-smoke && cd /tmp/webscit-smoke
mkdir -p src/app
echo '{}' > package.json
cat > tsconfig.json <<'JSON'
{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
JSON
echo 'body{}' > src/app/globals.css
node /home/fcollonval/projects/sci-ui-toolkit/packages/cli/dist/index.js init --yes
ls src/app
cat components.json | head -40
```

(Run `npm run build -w packages/cli` first if `dist/index.js` is missing.)

Expected:
- `src/app/{tokens,tokens-dark,theme}.css` exist with non-empty content.
- `components.json` has a `theme` section populated with the defaults.

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/index.ts
git commit -m "feat(cli): prompt for theme on init, add theme subcommand"
```

---

## End of Part 6

After Part 6 the consumer experience is complete: `npx @webscit/toolkit init` prompts for the six theme variables (or accepts defaults non-interactively), persists them in `components.json`, and writes generator-produced CSS into the project. `npx @webscit/toolkit theme` regenerates after manual edits or version bumps.

Phase A is now feature-complete from the consumer's perspective. Part 7 verifies the registry and Storybook still work, then Phase A is shippable.
