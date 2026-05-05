// packages/cli/src/theme-command.ts
import { generateTheme } from "@webscit/tokens";
import { runToolkitInit, type InitResult } from "./init.js";
import { readThemeConfig } from "./theme-config.js";

export async function runThemeCommand(cwd: string): Promise<InitResult> {
  const config = readThemeConfig(cwd);
  const bundle = await generateTheme(config);
  return runToolkitInit(cwd, bundle, { overwrite: true });
}
