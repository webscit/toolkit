#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import { generateTokens } from "@webscit/tokens";
import { runToolkitInit } from "./init.js";
import {
  createComponentsJson,
  findCssEntry,
  patchComponentsJsonRegistries,
  readTsconfigAliases,
} from "./components-json.js";

const REGISTRY_URL =
  process.env.WEBSCIT_REGISTRY_URL ?? "https://webscit.github.io/toolkit/r";
const [, , command, ...args] = process.argv;

function printUsage(): void {
  console.log(`
@webscit/toolkit

Usage:
  npx @webscit/toolkit init                     Initialize toolkit in this project
  npx @webscit/toolkit add <component>          Install a component
  npx @webscit/toolkit add button input label   Install multiple components

Components: button, input, label, checkbox, checkbox-group, radio, radio-group,
  switch, select, textarea, dialog, menu, tabs, card, badge, alert, tooltip
  `);
}

function toRegistryUrl(name: string): string {
  if (name.startsWith("http://") || name.startsWith("https://")) return name;
  return `${REGISTRY_URL}/${name}.json`;
}

if (command === "add") {
  const urls = args.map(toRegistryUrl).join(" ");
  execSync(`npx shadcn@latest add --yes ${urls}`, { stdio: "inherit" });
} else if (command === "init") {
  const cwd = process.cwd();
  const cssIdx = args.indexOf("--css");
  const cssFlag = cssIdx !== -1 ? args[cssIdx + 1] : undefined;

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

  console.log("Copying token stylesheets...");
  const bundle = generateTokens();
  const result = runToolkitInit(cwd, bundle);

  const rel = (p: string) => relative(cwd, p);
  for (const f of result.filesWritten) console.log(`  wrote   ${rel(f)}`);
  for (const f of result.filesSkipped)
    console.log(`  skipped ${rel(f)} (already exists)`);

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
} else {
  printUsage();
}
