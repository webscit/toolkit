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
