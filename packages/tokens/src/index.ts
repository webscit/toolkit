// packages/tokens/src/index.ts

// Public types
export type {
  ThemeConfig,
  AdvancedThemeConfig,
  RadiusChoice,
  SizingChoice,
} from "./generate/config.js";
export type { NeutralName } from "./defaults/neutrals.js";
export type { PrimaryName } from "./defaults/primaries.js";
export type { FontName } from "./defaults/fonts.js";

// Public values
export {
  defaultThemeConfig,
  parseThemeConfig,
  RADIUS_CHOICES,
  SIZING_CHOICES,
} from "./generate/config.js";
export { NEUTRAL_CHOICES } from "./defaults/neutrals.js";
export { PRIMARY_CHOICES } from "./defaults/primaries.js";
export { FONT_CHOICES } from "./defaults/fonts.js";

// Generator
export { generateTheme, type TokenBundle } from "./generate/index.js";
