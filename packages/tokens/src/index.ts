import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export interface TokenBundle {
  tokensCss: string;
  tokensDarkCss: string;
  themeCss: string;
}

// Placeholder for future generative inputs (brand color, density, …).
// Empty today — callers should pass {} or omit.
export type TokenOptions = Record<string, never>;

const here = dirname(fileURLToPath(import.meta.url));

function read(file: string): string {
  // After tsc compilation, this file lives at dist/index.js; the CSS files
  // live alongside it at dist/*.css. Resolve relative to the compiled output.
  return readFileSync(join(here, file), "utf8");
}

export function generateTokens(_options?: TokenOptions): TokenBundle {
  return {
    tokensCss: read("tokens.css"),
    tokensDarkCss: read("tokens-dark.css"),
    themeCss: read("theme.css"),
  };
}
