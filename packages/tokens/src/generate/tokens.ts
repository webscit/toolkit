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
  [9, 9],
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
  { alias: "surface", ref: "{sct.color.neutral.50}" },
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

function colorGroup(palettes: Palettes): DtcgGroup {
  // Aliases may share a key with a scale role (e.g. "primary" is both a
  // role with steps 50..950 AND a semantic alias pointing at the 600 step).
  // DTCG allows a node to be both a token (via $type/$value) and a parent
  // group; merge the alias's $type/$value into the scale group rather than
  // overwriting it. Style Dictionary itself cannot consume hybrid nodes —
  // the CSS layer (css.ts) splits them apart before handing tokens to SD.
  const out = colorScalesGroup(palettes);
  for (const { alias, ref } of SEMANTIC_ALIASES) {
    const existing = out[alias];
    if (existing && typeof existing === "object" && !("$value" in existing)) {
      Object.assign(existing, { $type: "color", $value: ref });
    } else {
      out[alias] = { $type: "color", $value: ref };
    }
  }
  return out;
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
  radius: DtcgGroup & { $type: "dimension"; $value: string };
} {
  if (config.radius === "full") {
    const hybrid = {
      $type: "dimension",
      $value: "9999px",
      full: { $type: "dimension", $value: "9999px" },
    } as unknown as DtcgGroup & { $type: "dimension"; $value: string };
    for (const [name] of RADIUS_MULTIPLIERS) {
      (hybrid as unknown as Record<string, DtcgToken>)[name] = {
        $type: "dimension",
        $value: "9999px",
      };
    }
    return { radius: hybrid };
  }
  const base = RADIUS_BASE[config.radius];
  const hybrid = {
    $type: "dimension",
    $value: base,
    full: { $type: "dimension", $value: "9999px" },
  } as unknown as DtcgGroup & { $type: "dimension"; $value: string };
  for (const [name, mul] of RADIUS_MULTIPLIERS) {
    (hybrid as unknown as Record<string, DtcgToken>)[name] = {
      $type: "dimension",
      $value: `calc(var(--sct-radius) * ${mul})`,
    };
  }
  return { radius: hybrid };
}

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
    // sans: removed — Phase B complete.
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
  };
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
    font,
    ...border,
    ...lineHeightGroup(),
    ...shadowGroup(),
    ...componentDimensionsGroup(),
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

// Re-exports used by tests in this part (avoid circular imports later)
export { SCALE_STEPS, ROLE_NAMES };
export type { Palettes };
export { FONT_FAMILY_STACKS, MONO_FAMILY_STACK };
