#!/usr/bin/env node
// packages/cli/src/index.ts
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import {
  defaultThemeConfig,
  generateTheme,
  type ThemeConfig,
} from "@webscit/tokens";
import { runToolkitInit } from "./init.js";
import {
  createComponentsJson,
  findCssEntry,
  patchComponentsJsonRegistries,
  readTsconfigAliases,
} from "./components-json.js";
import {
  hasThemeConfig,
  readThemeConfig,
  writeThemeConfig,
} from "./theme-config.js";
import { runThemePrompts } from "./prompts.js";
import { runThemeCommand } from "./theme-command.js";

const REGISTRY_URL =
  process.env.WEBSCIT_REGISTRY_URL ?? "https://webscit.github.io/toolkit/r";
const [, , command, ...args] = process.argv;

function printUsage(): void {
  console.log(`
@webscit/toolkit

Usage:
  npx @webscit/toolkit init [--css <path>] [--reconfigure] [--yes]
                                                Initialize the toolkit, prompt for theme
  npx @webscit/toolkit theme                    Regenerate token CSS from components.json
  npx @webscit/toolkit add <component> [...]    Install components

Components: button, input, label, checkbox, checkbox-group, radio, radio-group,
  switch, select, textarea, dialog, menu, tabs, card, badge, alert, tooltip
  `);
}

function toRegistryUrl(name: string): string {
  if (name.startsWith("http://") || name.startsWith("https://")) return name;
  return `${REGISTRY_URL}/${name}.json`;
}

function hasFlag(name: string): boolean {
  return args.includes(name);
}

function flagValue(name: string): string | undefined {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : undefined;
}

async function chooseConfig(cwd: string): Promise<ThemeConfig> {
  const reconfigure = hasFlag("--reconfigure");
  const useDefaults = hasFlag("--yes") || !process.stdout.isTTY;

  if (hasThemeConfig(cwd) && !reconfigure) {
    return readThemeConfig(cwd);
  }
  if (useDefaults) {
    return defaultThemeConfig();
  }
  const startFrom = hasThemeConfig(cwd) ? readThemeConfig(cwd) : defaultThemeConfig();
  return runThemePrompts(startFrom);
}

async function main(): Promise<void> {
  if (command === "add") {
    const urls = args.map(toRegistryUrl).join(" ");
    execSync(`npx shadcn@latest add --yes ${urls}`, { stdio: "inherit" });
    return;
  }

  if (command === "theme") {
    const cwd = process.cwd();
    const result = await runThemeCommand(cwd);
    const rel = (p: string) => relative(cwd, p);
    for (const f of result.filesWritten) console.log(`  wrote      ${rel(f)}`);
    for (const f of result.filesOverwritten)
      console.log(`  rewrote    ${rel(f)}`);
    return;
  }

  if (command === "init") {
    const cwd = process.cwd();
    const cssFlag = flagValue("--css");

    if (!existsSync(join(cwd, "components.json"))) {
      const cssEntry = findCssEntry(cwd, cssFlag);
      const cssRelPath = relative(cwd, cssEntry).replace(/\\/g, "/");
      const { prefix } = readTsconfigAliases(cwd);
      createComponentsJson(cwd, cssRelPath, prefix, REGISTRY_URL);
      console.log("Created components.json.");
    } else {
      console.log("components.json already exists — updating registries.");
      patchComponentsJsonRegistries(cwd, REGISTRY_URL);
    }

    const config = await chooseConfig(cwd);
    writeThemeConfig(cwd, config);
    console.log(
      `Theme: neutral=${config.neutral}, primary=${config.primary}, ` +
        `radius=${config.radius}, sizing=${config.sizing}, ` +
        `font.text=${config.font.text}, font.heading=${config.font.heading}`,
    );

    console.log("Generating token stylesheets...");
    const bundle = await generateTheme(config);
    const result = runToolkitInit(cwd, bundle);

    const rel = (p: string) => relative(cwd, p);
    for (const f of result.filesWritten) console.log(`  wrote   ${rel(f)}`);
    for (const f of result.filesSkipped)
      console.log(`  skipped ${rel(f)} (already exists, run \`theme\` to regenerate)`);

    if (result.importsInjected.length > 0) {
      console.log(
        `\nInjected imports at the top of ${rel(result.cssEntryPath)}:`,
      );
      for (const line of result.importsInjected) console.log(`  ${line}`);
    } else {
      console.log(
        `\nNo imports needed — all three @import lines already present in ${rel(result.cssEntryPath)}.`,
      );
    }
    console.log("\nDone.");
    return;
  }

  printUsage();
}

await main();
