// packages/tokens/build.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// We import the compiled JS — but the build runs *before* tsc.
// Use a tsx/ts-node loader by invoking the ESM .ts source directly via
// Node's import-from-loader is fragile; the simpler path is to have build.mjs
// shell out to tsc first, then import dist/index.js. We do the opposite:
// run build.mjs *after* tsc by reordering the npm script.
import { generateTheme, defaultThemeConfig } from "./dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = join(here, "dist");
mkdirSync(distDir, { recursive: true });

const bundle = await generateTheme(defaultThemeConfig());

writeFileSync(join(distDir, "tokens.css"), bundle.tokensCss);
writeFileSync(join(distDir, "tokens-dark.css"), bundle.tokensDarkCss);
writeFileSync(join(distDir, "theme.css"), bundle.themeCss);

console.log("✓ tokens built");
