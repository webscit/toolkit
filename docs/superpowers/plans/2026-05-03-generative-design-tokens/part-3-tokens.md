# Part 3 — DTCG token emission

Turns a `ThemeConfig` + computed `ThemePalettes` into a pair of W3C DTCG JSON token documents — one for the light theme, one for dark-mode overrides. No CSS yet; Part 4 hands these documents to Style Dictionary.

**Files created in this part:**
- `packages/tokens/src/generate/tokens.ts`
- `packages/tokens/src/generate/tokens.test.ts`

---

## Output shape

The generator emits two documents under the root key `sct`:

- **Light document** — full token set: color scales, semantic color aliases, spacing base + scale, radius base + scale, font-size base + scale, border-width tokens, font family stacks.
- **Dark document** — only the tokens whose values change in dark mode: the six color scales **and** the semantic color aliases (because aliases inline to the resolved hex value when Style Dictionary is run with `outputReferences: false` — same shape, dark hex values).

Token values use literal CSS strings (`"calc(var(--sct-spacing) * 2)"`, `"0.25rem"`, hex). The Style Dictionary build in Part 4 will use a minimal transform group that does **not** mutate values (no `size/rem`, no `ts/resolveMath`).

---

## Task 3.1 — Define multiplier tables and base-value tables

**Files:**
- Create: `packages/tokens/src/generate/tokens.ts` (constants only)

- [ ] **Step 1: Write the file**

```ts
// packages/tokens/src/generate/tokens.ts
import type { ThemeConfig, RadiusChoice, SizingChoice } from "./config.js";
import {
  SCALE_STEPS,
  ROLE_NAMES,
  type Palettes,
  type ThemePalettes,
} from "./palettes.js";
import { FONT_FAMILY_STACKS, MONO_FAMILY_STACK } from "../defaults/fonts.js";

/** Base spacing value (rem) per sizing choice. */
export const SPACING_BASE: Readonly<Record<SizingChoice, string>> = {
  small: "0.2rem",
  medium: "0.25rem",
  large: "0.3rem",
};

/** Base font size (rem) per sizing choice. */
export const FONT_SIZE_BASE: Readonly<Record<SizingChoice, string>> = {
  small: "0.875rem",
  medium: "1rem",
  large: "1.0625rem",
};

/** Base radius value (rem) per radius choice; "full" handled specially. */
export const RADIUS_BASE: Readonly<Record<RadiusChoice, string>> = {
  none: "0",
  small: "0.25rem",
  medium: "0.5rem",
  large: "0.75rem",
  full: "0", // unused — "full" emits 9999px directly
};

/** Multipliers for the spacing scale. */
export const SPACE_MULTIPLIERS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [8, 8],
  [10, 10],
  [12, 12],
  [16, 16],
  [20, 20],
  [24, 24],
] as const;

/** Multipliers for the radius scale. "full" replaces these with 9999px. */
export const RADIUS_MULTIPLIERS: ReadonlyArray<readonly [string, number]> = [
  ["sm", 0.5],
  ["md", 1],
  ["lg", 1.5],
  ["xl", 2],
] as const;

/** Multipliers for the font-size scale (relative to font-size-base). */
export const FONT_SIZE_MULTIPLIERS: ReadonlyArray<readonly [string, number]> = [
  ["xs", 0.75],
  ["sm", 0.875],
  ["lg", 1.125],
  ["xl", 1.25],
  ["2xl", 1.5],
  ["3xl", 1.875],
] as const;

// Stub — implemented in 3.2/3.3
export interface DtcgDocuments {
  light: Record<string, unknown>;
  dark: Record<string, unknown>;
}

export function generateTokenDocuments(
  _config: ThemeConfig,
  _palettes: ThemePalettes,
): DtcgDocuments {
  throw new Error("not implemented");
}

// Re-exports used by tests in this part (avoid circular imports later)
export { SCALE_STEPS, ROLE_NAMES };
export type { Palettes };
export { FONT_FAMILY_STACKS, MONO_FAMILY_STACK };
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck -w packages/tokens
```

Expected: no errors.

- [ ] **Step 3: No commit yet**

Commit together with 3.2 + 3.3.

---

## Task 3.2 — Implement `generateTokenDocuments`

**Files:**
- Modify: `packages/tokens/src/generate/tokens.ts`

- [ ] **Step 1: Replace the stub with the full implementation**

Replace the bottom of `tokens.ts` (everything from `export interface DtcgDocuments` onward) with:

```ts
type DtcgToken = {
  $type: "color" | "dimension" | "fontFamily";
  $value: string;
};

type DtcgGroup = { [key: string]: DtcgToken | DtcgGroup };

export interface DtcgDocuments {
  light: { sct: DtcgGroup };
  dark: { sct: DtcgGroup };
}

function colorScaleGroup(scale: Palettes[keyof Palettes]): DtcgGroup {
  const out: DtcgGroup = {};
  for (const step of SCALE_STEPS) {
    out[String(step)] = { $type: "color", $value: scale[step] };
  }
  return out;
}

function colorScalesGroup(palettes: Palettes): DtcgGroup {
  const out: DtcgGroup = {};
  for (const role of ROLE_NAMES) {
    out[role] = colorScaleGroup(palettes[role]);
  }
  return out;
}

interface AliasMapEntry {
  alias: string;
  ref: string; // e.g. "{sct.color.neutral.50}"
}

const SEMANTIC_ALIASES: readonly AliasMapEntry[] = [
  { alias: "background", ref: "{sct.color.neutral.50}" },
  { alias: "foreground", ref: "{sct.color.neutral.950}" },
  { alias: "muted", ref: "{sct.color.neutral.100}" },
  { alias: "muted-foreground", ref: "{sct.color.neutral.600}" },
  { alias: "border", ref: "{sct.color.neutral.200}" },
  { alias: "input", ref: "{sct.color.neutral.200}" },
  { alias: "ring", ref: "{sct.color.primary.500}" },
  { alias: "primary", ref: "{sct.color.primary.600}" },
  { alias: "primary-foreground", ref: "{sct.color.primary.50}" },
  { alias: "secondary", ref: "{sct.color.neutral.100}" },
  { alias: "secondary-foreground", ref: "{sct.color.neutral.900}" },
  { alias: "accent", ref: "{sct.color.neutral.100}" },
  { alias: "accent-foreground", ref: "{sct.color.neutral.900}" },
  { alias: "destructive", ref: "{sct.color.destructive.600}" },
  { alias: "destructive-foreground", ref: "{sct.color.destructive.50}" },
  { alias: "success", ref: "{sct.color.success.600}" },
  { alias: "success-foreground", ref: "{sct.color.success.50}" },
  { alias: "warning", ref: "{sct.color.warning.500}" },
  { alias: "warning-foreground", ref: "{sct.color.warning.950}" },
  { alias: "info", ref: "{sct.color.info.600}" },
  { alias: "info-foreground", ref: "{sct.color.info.50}" },
] as const;

function semanticAliasesGroup(): DtcgGroup {
  const out: DtcgGroup = {};
  for (const { alias, ref } of SEMANTIC_ALIASES) {
    out[alias] = { $type: "color", $value: ref };
  }
  return out;
}

function colorGroup(palettes: Palettes): DtcgGroup {
  return {
    ...colorScalesGroup(palettes),
    ...semanticAliasesGroup(),
  };
}

function spacingGroup(config: ThemeConfig): {
  spacing: DtcgToken;
  space: DtcgGroup;
} {
  const base = SPACING_BASE[config.sizing];
  const space: DtcgGroup = {};
  for (const [name, mul] of SPACE_MULTIPLIERS) {
    space[String(name)] = {
      $type: "dimension",
      $value: `calc(var(--sct-spacing) * ${mul})`,
    };
  }
  return {
    spacing: { $type: "dimension", $value: base },
    space,
  };
}

function radiusGroup(config: ThemeConfig): {
  radius: DtcgToken;
  "radius-scale": DtcgGroup;
} {
  if (config.radius === "full") {
    const scale: DtcgGroup = { full: { $type: "dimension", $value: "9999px" } };
    for (const [name] of RADIUS_MULTIPLIERS) {
      scale[name] = { $type: "dimension", $value: "9999px" };
    }
    return {
      radius: { $type: "dimension", $value: "9999px" },
      "radius-scale": scale,
    };
  }
  const base = RADIUS_BASE[config.radius];
  const scale: DtcgGroup = { full: { $type: "dimension", $value: "9999px" } };
  for (const [name, mul] of RADIUS_MULTIPLIERS) {
    scale[name] = {
      $type: "dimension",
      $value: `calc(var(--sct-radius) * ${mul})`,
    };
  }
  return {
    radius: { $type: "dimension", $value: base },
    "radius-scale": scale,
  };
}

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
    // Compatibility shim — Phase B drops this.
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

  return { family, size };
}

function borderGroup(): DtcgGroup {
  return {
    "border-width": {
      "1": { $type: "dimension", $value: "1px" },
      "2": { $type: "dimension", $value: "2px" },
    },
  };
}

export function generateTokenDocuments(
  config: ThemeConfig,
  palettes: ThemePalettes,
): DtcgDocuments {
  const sizing = spacingGroup(config);
  const radius = radiusGroup(config);
  const font = fontGroup(config);
  const border = borderGroup();

  const lightSct: DtcgGroup = {
    color: colorGroup(palettes.light),
    spacing: sizing.spacing,
    space: sizing.space,
    radius: radius.radius,
    "radius-scale": radius["radius-scale"],
    font,
    ...border,
  };

  // Dark document only carries values that change in dark mode:
  // the color scales + the same semantic aliases (which inline to the
  // dark-mode hex values when Style Dictionary resolves references).
  const darkSct: DtcgGroup = {
    color: colorGroup(palettes.dark),
  };

  return {
    light: { sct: lightSct },
    dark: { sct: darkSct },
  };
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck -w packages/tokens
```

Expected: no errors.

---

## Task 3.3 — Test the document generator

**Files:**
- Create: `packages/tokens/src/generate/tokens.test.ts`

- [ ] **Step 1: Write the test**

```ts
// packages/tokens/src/generate/tokens.test.ts
import { describe, it, expect } from "vitest";
import { defaultThemeConfig } from "./config.js";
import { generatePalettes, SCALE_STEPS } from "./palettes.js";
import { generateTokenDocuments } from "./tokens.js";

const cfg = defaultThemeConfig();
const palettes = generatePalettes(cfg);
const docs = generateTokenDocuments(cfg, palettes);

function get(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

describe("generateTokenDocuments — light", () => {
  it("emits all 11 color steps for every role", () => {
    const colors = get(docs.light, "sct.color") as Record<string, unknown>;
    for (const role of [
      "primary",
      "neutral",
      "success",
      "info",
      "warning",
      "destructive",
    ]) {
      const scale = colors[role] as Record<string, unknown>;
      for (const step of SCALE_STEPS) {
        const token = scale[String(step)] as { $type: string; $value: string };
        expect(token.$type).toBe("color");
        expect(token.$value).toMatch(/^#[0-9a-fA-F]{6}$/);
      }
    }
  });

  it("emits semantic aliases as references to scale steps", () => {
    const primary = get(docs.light, "sct.color.primary") as {
      $type: string;
      $value: string;
    };
    expect(primary.$type).toBe("color");
    expect(primary.$value).toBe("{sct.color.primary.600}");

    const ring = get(docs.light, "sct.color.ring") as { $value: string };
    expect(ring.$value).toBe("{sct.color.primary.500}");

    const fg = get(docs.light, "sct.color.foreground") as { $value: string };
    expect(fg.$value).toBe("{sct.color.neutral.950}");
  });

  it("emits spacing base + calc()-derived scale", () => {
    const base = get(docs.light, "sct.spacing") as {
      $type: string;
      $value: string;
    };
    expect(base.$type).toBe("dimension");
    expect(base.$value).toBe("0.25rem");

    const space2 = get(docs.light, "sct.space.2") as { $value: string };
    expect(space2.$value).toBe("calc(var(--sct-spacing) * 2)");
  });

  it("emits font-size base + calc()-derived scale", () => {
    const base = get(docs.light, "sct.font.size.base") as { $value: string };
    expect(base.$value).toBe("1rem");
    const xs = get(docs.light, "sct.font.size.xs") as { $value: string };
    expect(xs.$value).toBe("calc(var(--sct-font-size-base) * 0.75)");
  });

  it("emits radius base + calc()-derived scale (medium)", () => {
    const base = get(docs.light, "sct.radius") as { $value: string };
    expect(base.$value).toBe("0.5rem");
    const md = get(docs.light, "sct.radius-scale.md") as { $value: string };
    expect(md.$value).toBe("calc(var(--sct-radius) * 1)");
    const full = get(docs.light, "sct.radius-scale.full") as {
      $value: string;
    };
    expect(full.$value).toBe("9999px");
  });

  it("emits border widths in px", () => {
    const w1 = get(docs.light, "sct.border-width.1") as {
      $type: string;
      $value: string;
    };
    expect(w1.$type).toBe("dimension");
    expect(w1.$value).toBe("1px");
  });

  it("emits font families: text, heading (inherit shim), mono, sans (compat)", () => {
    const text = get(docs.light, "sct.font.family.text") as {
      $type: string;
      $value: string;
    };
    expect(text.$type).toBe("fontFamily");
    expect(text.$value.length).toBeGreaterThan(0);

    const heading = get(docs.light, "sct.font.family.heading") as {
      $value: string;
    };
    expect(heading.$value).toBe("var(--sct-font-family-text)");

    const sans = get(docs.light, "sct.font.family.sans") as { $value: string };
    expect(sans.$value).toBe("var(--sct-font-family-text)");
  });

  it("explicit heading font emits a real stack, not the inherit shim", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.font.heading = "serif";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    const heading = get(docs2.light, "sct.font.family.heading") as {
      $value: string;
    };
    expect(heading.$value).not.toBe("var(--sct-font-family-text)");
    expect(heading.$value).toMatch(/serif/);
  });
});

describe("generateTokenDocuments — radius edge cases", () => {
  it("radius='none' makes the base 0", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.radius = "none";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    const base = get(docs2.light, "sct.radius") as { $value: string };
    expect(base.$value).toBe("0");
    const md = get(docs2.light, "sct.radius-scale.md") as { $value: string };
    expect(md.$value).toBe("calc(var(--sct-radius) * 1)");
    const full = get(docs2.light, "sct.radius-scale.full") as {
      $value: string;
    };
    expect(full.$value).toBe("9999px");
  });

  it("radius='full' replaces all scale entries with 9999px", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.radius = "full";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    for (const name of ["sm", "md", "lg", "xl", "full"]) {
      const tok = get(docs2.light, `sct.radius-scale.${name}`) as {
        $value: string;
      };
      expect(tok.$value).toBe("9999px");
    }
  });
});

describe("generateTokenDocuments — sizing", () => {
  it("sizing='small' shrinks spacing and font-size base", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.sizing = "small";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    expect(
      (get(docs2.light, "sct.spacing") as { $value: string }).$value,
    ).toBe("0.2rem");
    expect(
      (get(docs2.light, "sct.font.size.base") as { $value: string }).$value,
    ).toBe("0.875rem");
  });

  it("sizing='large' grows spacing and font-size base", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.sizing = "large";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    expect(
      (get(docs2.light, "sct.spacing") as { $value: string }).$value,
    ).toBe("0.3rem");
    expect(
      (get(docs2.light, "sct.font.size.base") as { $value: string }).$value,
    ).toBe("1.0625rem");
  });
});

describe("generateTokenDocuments — dark", () => {
  it("dark document only contains color tokens", () => {
    const sct = (docs.dark as { sct: Record<string, unknown> }).sct;
    expect(Object.keys(sct)).toEqual(["color"]);
  });

  it("dark color scales differ from light", () => {
    const lightP500 = (
      get(docs.light, "sct.color.primary.500") as { $value: string }
    ).$value;
    const darkP500 = (
      get(docs.dark, "sct.color.primary.500") as { $value: string }
    ).$value;
    expect(darkP500).not.toBe(lightP500);
  });

  it("dark uses the same semantic alias map (refs)", () => {
    const ring = get(docs.dark, "sct.color.ring") as { $value: string };
    expect(ring.$value).toBe("{sct.color.primary.500}");
    const fg = get(docs.dark, "sct.color.foreground") as { $value: string };
    expect(fg.$value).toBe("{sct.color.neutral.950}");
  });
});
```

- [ ] **Step 2: Run the tests**

```bash
npm test -w packages/tokens -- tokens.test
```

Expected: all tests pass.

If any fail, fix `tokens.ts` (don't relax the test); the assertions match the spec exactly.

- [ ] **Step 3: Commit (Tasks 3.1 + 3.2 + 3.3 together)**

```bash
git add packages/tokens/src/generate/tokens.ts \
        packages/tokens/src/generate/tokens.test.ts
git commit -m "feat(tokens): generate DTCG documents from ThemeConfig + palettes"
```

---

## End of Part 3

After Part 3, `generateTokenDocuments(config, palettes)` returns a pair of in-memory DTCG documents. No CSS is emitted yet. Part 4 wires Style Dictionary v4 to consume these documents and produce the three CSS files.
