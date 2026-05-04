// packages/tokens/src/generate/palettes.ts
import {
  BackgroundColor,
  Color,
  Theme,
} from "@adobe/leonardo-contrast-colors";
import type { ThemeConfig } from "./config.js";
import { NEUTRAL_KEY_COLORS } from "../defaults/neutrals.js";
import {
  PRIMARY_KEY_COLORS,
  FIXED_ROLE_KEY_COLORS,
} from "../defaults/primaries.js";

export type ScaleStep =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;

export const SCALE_STEPS: readonly ScaleStep[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type RoleName =
  | "primary"
  | "neutral"
  | "success"
  | "info"
  | "warning"
  | "destructive";

export const ROLE_NAMES: readonly RoleName[] = [
  "primary",
  "neutral",
  "success",
  "info",
  "warning",
  "destructive",
] as const;

export type Scale = Readonly<Record<ScaleStep, string>>;
export type Palettes = Readonly<Record<RoleName, Scale>>;

export interface ThemePalettes {
  light: Palettes;
  dark: Palettes;
}

export const DEFAULT_CONTRAST_TARGETS: readonly number[] = [
  1.05, 1.1, 1.2, 1.4, 2, 3, 4.5, 6, 8, 11, 17,
] as const;

export const DEFAULT_DARK_LIGHTNESS = 8;
export const LIGHT_LIGHTNESS = 100;

interface RoleKey {
  role: RoleName;
  key: string;
}

function resolveRoleKeys(config: ThemeConfig): RoleKey[] {
  const primaryKey = PRIMARY_KEY_COLORS[config.primary];
  return [
    { role: "primary", key: primaryKey },
    { role: "neutral", key: NEUTRAL_KEY_COLORS[config.neutral] },
    { role: "success", key: FIXED_ROLE_KEY_COLORS.success },
    { role: "info", key: primaryKey },
    { role: "warning", key: FIXED_ROLE_KEY_COLORS.warning },
    { role: "destructive", key: FIXED_ROLE_KEY_COLORS.destructive },
  ];
}

interface LeonardoOutput {
  background: string;
}

interface LeonardoColorOutput {
  name: string;
  values: Array<{ name: string; contrast: number; value: string }>;
}

type LeonardoContrastColors = [LeonardoOutput, ...LeonardoColorOutput[]];

function buildTheme(
  config: ThemeConfig,
  lightness: number,
  backgroundOverride?: string,
): LeonardoContrastColors {
  const ratios = config.advanced.contrastTargets ?? [
    ...DEFAULT_CONTRAST_TARGETS,
  ];
  if (ratios.length !== SCALE_STEPS.length) {
    throw new Error(
      `advanced.contrastTargets must have ${SCALE_STEPS.length} values, got ${ratios.length}`,
    );
  }

  const neutralKey =
    backgroundOverride ?? NEUTRAL_KEY_COLORS[config.neutral];

  const background = new BackgroundColor({
    name: "background",
    colorKeys: [neutralKey],
    colorspace: "OKLCH",
    ratios,
  });

  const colors = resolveRoleKeys(config).map(
    ({ role, key }) =>
      new Color({
        name: role,
        colorKeys: [key],
        colorspace: "OKLCH",
        ratios,
      }),
  );

  const theme = new Theme({
    colors,
    backgroundColor: background,
    lightness,
    contrast: 1,
    output: "HEX",
  });

  return theme.contrastColors as LeonardoContrastColors;
}

function toScale(role: LeonardoColorOutput): Scale {
  if (role.values.length !== SCALE_STEPS.length) {
    throw new Error(
      `Leonardo returned ${role.values.length} values for ${role.name}, expected ${SCALE_STEPS.length}`,
    );
  }
  const out = {} as Record<ScaleStep, string>;
  SCALE_STEPS.forEach((step, i) => {
    out[step] = role.values[i]!.value;
  });
  return out;
}

function toPalettes(output: LeonardoContrastColors): Palettes {
  const out = {} as Record<RoleName, Scale>;
  for (const item of output.slice(1) as LeonardoColorOutput[]) {
    if (!(ROLE_NAMES as readonly string[]).includes(item.name)) continue;
    out[item.name as RoleName] = toScale(item);
  }
  for (const role of ROLE_NAMES) {
    if (!out[role]) {
      throw new Error(`Leonardo did not produce a scale for role ${role}`);
    }
  }
  return out;
}

export function generatePalettes(config: ThemeConfig): ThemePalettes {
  const light = buildTheme(config, LIGHT_LIGHTNESS);
  const dark = buildTheme(
    config,
    DEFAULT_DARK_LIGHTNESS,
    config.advanced.darkBackground,
  );
  return {
    light: toPalettes(light),
    dark: toPalettes(dark),
  };
}
