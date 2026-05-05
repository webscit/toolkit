// packages/tokens/src/generate/index.ts
import type { ThemeConfig } from "./config.js";
import { generatePalettes } from "./palettes.js";
import { generateTokenDocuments } from "./tokens.js";
import { generateCss } from "./css.js";

export interface TokenBundle {
  tokensCss: string;
  tokensDarkCss: string;
  themeCss: string;
  /** Serialized `theme` section, ready to embed in components.json. */
  configJson: string;
}

export async function generateTheme(
  config: ThemeConfig,
): Promise<TokenBundle> {
  const palettes = generatePalettes(config);
  const docs = generateTokenDocuments(config, palettes);
  const css = await generateCss(docs);
  return {
    tokensCss: css.tokensCss,
    tokensDarkCss: css.tokensDarkCss,
    themeCss: css.themeCss,
    configJson: JSON.stringify(config, null, 2),
  };
}
