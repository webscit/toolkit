import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { TokenBundle } from "@webscit/tokens";

interface ComponentsJson {
  tailwind?: { css?: string };
}

interface InitResult {
  cssEntryPath: string;
  filesWritten: string[];
  filesSkipped: string[];
  importsInjected: string[];
}

const OUTPUTS: Array<{ key: keyof TokenBundle; filename: string }> = [
  { key: "tokensCss", filename: "tokens.css" },
  { key: "tokensDarkCss", filename: "tokens-dark.css" },
  { key: "themeCss", filename: "theme.css" },
];

export function runToolkitInit(cwd: string, bundle: TokenBundle): InitResult {
  const componentsJsonPath = join(cwd, "components.json");
  const cfg = JSON.parse(readFileSync(componentsJsonPath, "utf8")) as ComponentsJson;
  const cssRel = cfg.tailwind?.css;
  if (!cssRel) {
    throw new Error(
      `components.json at ${componentsJsonPath} does not have a tailwind.css entry`,
    );
  }
  const cssEntryPath = resolve(cwd, cssRel);
  const cssDir = dirname(cssEntryPath);

  const filesWritten: string[] = [];
  const filesSkipped: string[] = [];
  for (const { key, filename } of OUTPUTS) {
    const dest = join(cssDir, filename);
    if (existsSync(dest)) {
      filesSkipped.push(dest);
      continue;
    }
    writeFileSync(dest, bundle[key]);
    filesWritten.push(dest);
  }

  const importLines = OUTPUTS.map(({ filename }) => `@import "./${filename}";`);
  const original = readFileSync(cssEntryPath, "utf8");
  const missing = importLines.filter((line) => !original.includes(line));
  if (missing.length > 0) {
    const prefix = missing.join("\n") + "\n";
    writeFileSync(cssEntryPath, prefix + original);
  }

  return { cssEntryPath, filesWritten, filesSkipped, importsInjected: missing };
}
