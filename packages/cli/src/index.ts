#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import { generateTokens } from "@webscit/tokens";
import { runToolkitInit } from "./init.js";

const REGISTRY_URL = "https://webscit.github.io/toolkit/r";
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

if (command === "add") {
  const components = args.join(" ");
  execSync(
    `npx shadcn@latest add --registry ${REGISTRY_URL} ${components}`,
    { stdio: "inherit" },
  );
} else if (command === "init") {
  const cwd = process.cwd();

  if (!existsSync(join(cwd, "components.json"))) {
    console.log("Running shadcn init...");
    execSync(
      `npx shadcn@latest init --defaults --yes --registry ${REGISTRY_URL}`,
      { stdio: "inherit", cwd },
    );
  } else {
    console.log("components.json already exists — skipping shadcn init.");
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
