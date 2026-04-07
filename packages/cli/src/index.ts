#!/usr/bin/env node
export {};

const REGISTRY_URL = "https://webscit.github.io/toolkit/r";
const [, , command, ...args] = process.argv;

if (command === "add") {
  const { execSync } = await import("child_process");
  const components = args.join(" ");
  execSync(`npx shadcn@latest add --registry ${REGISTRY_URL} ${components}`, {
    stdio: "inherit",
  });
} else {
  console.log(`
@webscit/toolkit

Usage:
  npx @webscit/toolkit add <component>         Install a component
  npx @webscit/toolkit add button input label  Install multiple components

Components: button, input, label, checkbox, checkbox-group, radio, radio-group,
  switch, select, textarea, dialog, menu, tabs, card, badge, alert, tooltip
  `);
}
