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
