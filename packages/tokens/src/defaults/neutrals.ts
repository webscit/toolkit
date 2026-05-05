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
