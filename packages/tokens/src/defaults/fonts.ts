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
