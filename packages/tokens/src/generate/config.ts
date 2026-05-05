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
