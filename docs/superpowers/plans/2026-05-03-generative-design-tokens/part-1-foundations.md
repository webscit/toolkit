# Part 1 — Foundations

Adds the package dependencies, the `ThemeConfig` type, and the curated lists of neutrals/primaries/fonts. No generation logic yet — that comes in Part 2.

**Files created in this part:**
- `packages/tokens/src/generate/config.ts`
- `packages/tokens/src/generate/config.test.ts`
- `packages/tokens/src/defaults/neutrals.ts`
- `packages/tokens/src/defaults/primaries.ts`
- `packages/tokens/src/defaults/fonts.ts`
- `packages/tokens/src/defaults/defaults.test.ts`

**Files modified in this part:**
- `packages/tokens/package.json` (add `@adobe/leonardo-contrast-colors` runtime dep, promote `style-dictionary` from devDep to dep)
- `packages/tokens/vitest.config.ts` (create if absent)

---

## Task 1.1 — Add runtime dependencies to `@webscit/tokens`

**Files:**
- Modify: `packages/tokens/package.json`

- [ ] **Step 1: Add deps**

Edit `packages/tokens/package.json` so the dependency sections become:

```json
"dependencies": {
  "@adobe/leonardo-contrast-colors": "^1.0.0",
  "style-dictionary": "^5.4.0",
  "@tokens-studio/sd-transforms": "^2.0.3"
},
"devDependencies": {
  "typescript": "^6.0.2",
  "vitest": "^3.0.0"
}
```

- [ ] **Step 2: Install**

Run from repo root:

```bash
npm install
```

Expected: lockfile updates, no errors. If `@adobe/leonardo-contrast-colors@^1.0.0` does not resolve, fall back to the latest available `0.x` and record the actual version in this task's commit message (note the precedent: `@base-ui-components/react` was downgraded to `^1.0.0-rc.0` for the same reason).

- [ ] **Step 3: Verify import works**

```bash
node -e "import('@adobe/leonardo-contrast-colors').then(m => console.log(Object.keys(m).slice(0,5)))" --input-type=module
```

Expected output contains `BackgroundColor`, `Color`, `Theme`.

- [ ] **Step 4: Commit**

```bash
git add packages/tokens/package.json package-lock.json
git commit -m "chore(tokens): add Leonardo + promote Style Dictionary to runtime dep"
```

---

## Task 1.2 — Add Vitest config to `@webscit/tokens`

**Files:**
- Create: `packages/tokens/vitest.config.ts`
- Modify: `packages/tokens/package.json` (add `test` script)

- [ ] **Step 1: Create vitest config**

```ts
// packages/tokens/vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 2: Add `test` script**

In `packages/tokens/package.json`, add to `scripts`:

```json
"test": "vitest run"
```

Add `vitest` to devDependencies if not already present (it is, via root, but each workspace declares its own — see `packages/cli/package.json` for the pattern).

```json
"devDependencies": {
  "typescript": "^6.0.2",
  "vitest": "^3.0.0"
}
```

- [ ] **Step 3: Sanity-check the config**

Create a throwaway file `packages/tokens/src/sanity.test.ts`:

```ts
import { describe, it, expect } from "vitest";
describe("sanity", () => {
  it("runs", () => expect(1 + 1).toBe(2));
});
```

Run:

```bash
npm test -w packages/tokens
```

Expected: 1 passing test.

Delete the file:

```bash
rm packages/tokens/src/sanity.test.ts
```

- [ ] **Step 4: Commit**

```bash
git add packages/tokens/vitest.config.ts packages/tokens/package.json package-lock.json
git commit -m "chore(tokens): add vitest config and test script"
```

---

## Task 1.3 — Define neutral defaults

**Files:**
- Create: `packages/tokens/src/defaults/neutrals.ts`

- [ ] **Step 1: Write the file**

```ts
// packages/tokens/src/defaults/neutrals.ts

export type NeutralName = "slate" | "gray" | "zinc" | "neutral" | "stone";

export const NEUTRAL_CHOICES: readonly NeutralName[] = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
] as const;

export const NEUTRAL_KEY_COLORS: Readonly<Record<NeutralName, string>> = {
  slate: "#64748b",
  gray: "#6b7280",
  zinc: "#71717a",
  neutral: "#737373",
  stone: "#78716c",
};
```

- [ ] **Step 2: Commit (combined with 1.4–1.5 below)**

Defer the commit until tasks 1.4 and 1.5 are also written; they're committed together in Task 1.6.

---

## Task 1.4 — Define primary defaults

**Files:**
- Create: `packages/tokens/src/defaults/primaries.ts`

- [ ] **Step 1: Write the file**

```ts
// packages/tokens/src/defaults/primaries.ts

export type PrimaryName =
  | "blue"
  | "indigo"
  | "violet"
  | "rose"
  | "green"
  | "amber"
  | "cyan"
  | "emerald";

export const PRIMARY_CHOICES: readonly PrimaryName[] = [
  "blue",
  "indigo",
  "violet",
  "rose",
  "green",
  "amber",
  "cyan",
  "emerald",
] as const;

export const PRIMARY_KEY_COLORS: Readonly<Record<PrimaryName, string>> = {
  blue: "#3b82f6",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  rose: "#f43f5e",
  green: "#22c55e",
  amber: "#f59e0b",
  cyan: "#06b6d4",
  emerald: "#10b981",
};

// Fixed roles (not user-pickable in v1).
export const FIXED_ROLE_KEY_COLORS = {
  success: "#22c55e",
  warning: "#f59e0b",
  destructive: "#ef4444",
  // info uses the chosen primary; resolved at generation time.
} as const;
```

---

## Task 1.5 — Define font defaults

**Files:**
- Create: `packages/tokens/src/defaults/fonts.ts`

- [ ] **Step 1: Write the file**

```ts
// packages/tokens/src/defaults/fonts.ts

export type FontName =
  | "system"
  | "geometric-sans"
  | "humanist-sans"
  | "serif"
  | "slab";

export const FONT_CHOICES: readonly FontName[] = [
  "system",
  "geometric-sans",
  "humanist-sans",
  "serif",
  "slab",
] as const;

const SYSTEM_SANS =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, " +
  "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const SYSTEM_MONO =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, " +
  "'Liberation Mono', 'Courier New', monospace";

export const FONT_FAMILY_STACKS: Readonly<Record<FontName, string>> = {
  system: SYSTEM_SANS,
  "geometric-sans": `'Inter', 'Geist', ${SYSTEM_SANS}`,
  "humanist-sans": `'Source Sans 3', 'Open Sans', ${SYSTEM_SANS}`,
  serif: `'Source Serif 4', 'Merriweather', Georgia, 'Times New Roman', serif`,
  slab: `'Roboto Slab', 'Source Serif 4', Georgia, serif`,
};

export const MONO_FAMILY_STACK = SYSTEM_MONO;
```

---

## Task 1.6 — Test the defaults

**Files:**
- Create: `packages/tokens/src/defaults/defaults.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// packages/tokens/src/defaults/defaults.test.ts
import { describe, it, expect } from "vitest";
import { NEUTRAL_CHOICES, NEUTRAL_KEY_COLORS } from "./neutrals.js";
import {
  PRIMARY_CHOICES,
  PRIMARY_KEY_COLORS,
  FIXED_ROLE_KEY_COLORS,
} from "./primaries.js";
import { FONT_CHOICES, FONT_FAMILY_STACKS } from "./fonts.js";

const HEX = /^#[0-9a-fA-F]{6}$/;

describe("defaults", () => {
  it("every neutral choice has a hex key color", () => {
    for (const name of NEUTRAL_CHOICES) {
      expect(NEUTRAL_KEY_COLORS[name]).toMatch(HEX);
    }
  });

  it("every primary choice has a hex key color", () => {
    for (const name of PRIMARY_CHOICES) {
      expect(PRIMARY_KEY_COLORS[name]).toMatch(HEX);
    }
  });

  it("fixed roles have hex key colors", () => {
    expect(FIXED_ROLE_KEY_COLORS.success).toMatch(HEX);
    expect(FIXED_ROLE_KEY_COLORS.warning).toMatch(HEX);
    expect(FIXED_ROLE_KEY_COLORS.destructive).toMatch(HEX);
  });

  it("every font choice has a non-empty family stack", () => {
    for (const name of FONT_CHOICES) {
      expect(FONT_FAMILY_STACKS[name].length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run the test and verify it passes**

```bash
npm test -w packages/tokens -- defaults.test
```

Expected: 4 passing tests.

- [ ] **Step 3: Commit defaults + tests together**

```bash
git add packages/tokens/src/defaults/
git commit -m "feat(tokens): add curated neutral, primary, and font defaults"
```

---

## Task 1.7 — Define `ThemeConfig` type and a parser

**Files:**
- Create: `packages/tokens/src/generate/config.ts`
- Create: `packages/tokens/src/generate/config.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// packages/tokens/src/generate/config.test.ts
import { describe, it, expect } from "vitest";
import { defaultThemeConfig, parseThemeConfig } from "./config.js";

describe("defaultThemeConfig", () => {
  it("returns a valid ThemeConfig", () => {
    const cfg = defaultThemeConfig();
    expect(cfg.neutral).toBe("slate");
    expect(cfg.primary).toBe("blue");
    expect(cfg.radius).toBe("medium");
    expect(cfg.sizing).toBe("medium");
    expect(cfg.font.text).toBe("system");
    expect(cfg.font.heading).toBe("inherit");
    expect(cfg.font.mono).toBe("system-mono");
  });
});

describe("parseThemeConfig", () => {
  it("accepts a valid config object", () => {
    const cfg = parseThemeConfig({
      neutral: "zinc",
      primary: "violet",
      radius: "large",
      sizing: "small",
      font: { text: "serif", heading: "geometric-sans", mono: "system-mono" },
    });
    expect(cfg.neutral).toBe("zinc");
  });

  it("fills missing optional advanced field with empty object", () => {
    const cfg = parseThemeConfig({
      neutral: "slate",
      primary: "blue",
      radius: "medium",
      sizing: "medium",
      font: { text: "system", heading: "inherit", mono: "system-mono" },
    });
    expect(cfg.advanced).toEqual({});
  });

  it("rejects unknown neutral", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "purple-fog",
        primary: "blue",
        radius: "medium",
        sizing: "medium",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/neutral/i);
  });

  it("rejects unknown primary", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "slate",
        primary: "magenta",
        radius: "medium",
        sizing: "medium",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/primary/i);
  });

  it("rejects unknown radius", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "slate",
        primary: "blue",
        radius: "huge",
        sizing: "medium",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/radius/i);
  });

  it("rejects unknown sizing", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "slate",
        primary: "blue",
        radius: "medium",
        sizing: "xl",
        font: { text: "system", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/sizing/i);
  });

  it("rejects unknown font", () => {
    expect(() =>
      parseThemeConfig({
        neutral: "slate",
        primary: "blue",
        radius: "medium",
        sizing: "medium",
        font: { text: "comic-sans", heading: "inherit", mono: "system-mono" },
      }),
    ).toThrow(/text/i);
  });

  it("accepts heading: 'inherit'", () => {
    const cfg = parseThemeConfig({
      neutral: "slate",
      primary: "blue",
      radius: "medium",
      sizing: "medium",
      font: { text: "system", heading: "inherit", mono: "system-mono" },
    });
    expect(cfg.font.heading).toBe("inherit");
  });

  it("rejects non-object input", () => {
    expect(() => parseThemeConfig(null)).toThrow();
    expect(() => parseThemeConfig("nope")).toThrow();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
npm test -w packages/tokens -- config.test
```

Expected: failures of the form `Cannot find module './config.js'`.

- [ ] **Step 3: Implement `config.ts`**

```ts
// packages/tokens/src/generate/config.ts
import { NEUTRAL_CHOICES, type NeutralName } from "../defaults/neutrals.js";
import { PRIMARY_CHOICES, type PrimaryName } from "../defaults/primaries.js";
import { FONT_CHOICES, type FontName } from "../defaults/fonts.js";

export type RadiusChoice = "none" | "small" | "medium" | "large" | "full";
export type SizingChoice = "small" | "medium" | "large";

export const RADIUS_CHOICES: readonly RadiusChoice[] = [
  "none",
  "small",
  "medium",
  "large",
  "full",
] as const;
export const SIZING_CHOICES: readonly SizingChoice[] = [
  "small",
  "medium",
  "large",
] as const;

export interface AdvancedThemeConfig {
  /** Override the dark-mode background color (hex). */
  darkBackground?: string;
  /** Override the 11 Leonardo target contrast ratios. */
  contrastTargets?: number[];
}

export interface ThemeConfig {
  neutral: NeutralName;
  primary: PrimaryName;
  radius: RadiusChoice;
  sizing: SizingChoice;
  font: {
    text: FontName;
    heading: FontName | "inherit";
    mono: "system-mono"; // v1: not user-pickable
  };
  advanced: AdvancedThemeConfig;
}

export function defaultThemeConfig(): ThemeConfig {
  return {
    neutral: "slate",
    primary: "blue",
    radius: "medium",
    sizing: "medium",
    font: { text: "system", heading: "inherit", mono: "system-mono" },
    advanced: {},
  };
}

function assertEnum<T extends string>(
  field: string,
  value: unknown,
  allowed: readonly T[],
): asserts value is T {
  if (typeof value !== "string" || !(allowed as readonly string[]).includes(value)) {
    throw new Error(
      `Invalid ${field}: ${JSON.stringify(value)}. ` +
        `Expected one of: ${allowed.join(", ")}`,
    );
  }
}

export function parseThemeConfig(input: unknown): ThemeConfig {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    throw new Error(
      `Invalid theme config: expected an object, got ${typeof input}`,
    );
  }
  const o = input as Record<string, unknown>;

  assertEnum("neutral", o.neutral, NEUTRAL_CHOICES);
  assertEnum("primary", o.primary, PRIMARY_CHOICES);
  assertEnum("radius", o.radius, RADIUS_CHOICES);
  assertEnum("sizing", o.sizing, SIZING_CHOICES);

  const font = o.font;
  if (font === null || typeof font !== "object") {
    throw new Error(`Invalid font: expected an object, got ${typeof font}`);
  }
  const f = font as Record<string, unknown>;
  assertEnum("font.text", f.text, FONT_CHOICES);
  if (f.heading !== "inherit") {
    assertEnum("font.heading", f.heading, FONT_CHOICES);
  }
  if (f.mono !== "system-mono") {
    throw new Error(
      `Invalid font.mono: ${JSON.stringify(f.mono)}. ` +
        `Expected "system-mono" (only choice in v1)`,
    );
  }

  const advanced = (o.advanced ?? {}) as AdvancedThemeConfig;

  return {
    neutral: o.neutral,
    primary: o.primary,
    radius: o.radius,
    sizing: o.sizing,
    font: {
      text: f.text,
      heading: f.heading as FontName | "inherit",
      mono: "system-mono",
    },
    advanced,
  };
}
```

- [ ] **Step 4: Run the test and verify it passes**

```bash
npm test -w packages/tokens -- config.test
```

Expected: 9 passing tests.

- [ ] **Step 5: Typecheck**

```bash
npm run typecheck -w packages/tokens
```

Expected: no errors. (If `tsconfig.json` has `"files": []`, change it temporarily to `"include": ["src/**/*.ts"]` so type-checking actually covers the new sources. This will be confirmed in Part 5 when the build is wired up.)

- [ ] **Step 6: Commit**

```bash
git add packages/tokens/src/generate/config.ts packages/tokens/src/generate/config.test.ts
git commit -m "feat(tokens): add ThemeConfig type with parseThemeConfig validator"
```

---

## End of Part 1

After Part 1 the package compiles, has the new dependencies installed, and exposes typed defaults plus a validated `ThemeConfig`. No CSS or generation logic exists yet — Part 2 adds the Leonardo wrapper.
