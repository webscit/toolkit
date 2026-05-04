// packages/tokens/src/generate/css.ts
import StyleDictionary from "style-dictionary";
import type { DesignTokens } from "style-dictionary/types";
import type { DtcgDocuments } from "./tokens.js";
import { THEME_CSS } from "./theme-base.js";

const TRANSFORM_GROUP = "webscit/passthrough";
const FORMAT_LAYERED = "webscit/css-variables-layered";
const HYBRID_TOKEN_KEY = "__self";

let registered = false;

/**
 * Style Dictionary cannot natively handle a node that is both a token
 * (has $value) and a parent group (has child token keys). Walk the input
 * and, for each hybrid node, demote its $type/$value into a synthetic
 * child token under HYBRID_TOKEN_KEY. The format function strips that
 * suffix when building the CSS variable name.
 */
function splitHybridTokens(input: unknown): unknown {
  if (!input || typeof input !== "object" || Array.isArray(input)) return input;
  const node = input as Record<string, unknown>;
  const hasValue = "$value" in node;
  const childKeys = Object.keys(node).filter(
    (k) => k !== "$value" && k !== "$type" && k !== "$description",
  );
  const childGroupKeys = childKeys.filter((k) => {
    const v = node[k];
    return v && typeof v === "object" && !Array.isArray(v);
  });

  if (hasValue && childGroupKeys.length > 0) {
    const out: Record<string, unknown> = {};
    // Carry forward all child groups (recursively split as well).
    for (const k of childKeys) {
      out[k] = splitHybridTokens(node[k]);
    }
    // Move the $value/$type pair into a synthetic child token.
    const self: Record<string, unknown> = { $value: node["$value"] };
    if ("$type" in node) self["$type"] = node["$type"];
    if ("$description" in node) self["$description"] = node["$description"];
    out[HYBRID_TOKEN_KEY] = self;
    return out;
  }

  // Pure group or pure token: recurse into children.
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(node)) {
    out[k] = hasValue && k.startsWith("$") ? node[k] : splitHybridTokens(node[k]);
  }
  return out;
}

function tokenName(path: readonly string[]): string {
  const parts = path.filter((p) => p !== HYBRID_TOKEN_KEY);
  return parts
    .join("-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

function ensureRegistered(): void {
  if (registered) return;
  registered = true;

  StyleDictionary.registerTransformGroup({
    name: TRANSFORM_GROUP,
    transforms: [
      "attribute/cti",
      // Naming is handled inside the format function so the hybrid-token
      // synthetic suffix can be stripped. No size/rem, no ts/resolveMath,
      // no ts/size/px — values from generateTokenDocuments are already
      // exact CSS strings.
    ],
  });

  StyleDictionary.registerFormat({
    name: FORMAT_LAYERED,
    format: ({ dictionary, options }) => {
      const opts = options as {
        selector?: string;
        layerOrder?: string;
      };
      const selector = opts.selector ?? ":root";
      const layerOrderDecl = opts.layerOrder
        ? `@layer ${opts.layerOrder};\n\n`
        : "";
      const lines = dictionary.allTokens.map((token) => {
        const value =
          (token as { $value?: unknown }).$value ??
          (token as { value?: unknown }).value ??
          "";
        const name = tokenName((token as { path: string[] }).path);
        return `    --${name}: ${String(value)};`;
      });
      return (
        `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n` +
        `${layerOrderDecl}` +
        `@layer design-tokens {\n` +
        `  ${selector} {\n` +
        `${lines.join("\n")}\n` +
        `  }\n` +
        `}\n`
      );
    },
  });
}

interface BuildArgs {
  tokens: Record<string, unknown>;
  selector: string;
  layerOrder?: string;
}

async function buildCss(args: BuildArgs): Promise<string> {
  ensureRegistered();
  const sd = new StyleDictionary({
    tokens: splitHybridTokens(args.tokens) as unknown as DesignTokens,
    log: {
      // The synthetic __self child key collides with no real sibling, but
      // SD's collision detector flags hybrid splits regardless. Silence.
      warnings: "disabled",
      verbosity: "silent",
    },
    platforms: {
      css: {
        transformGroup: TRANSFORM_GROUP,
        files: [
          {
            destination: "out.css", // not actually written
            format: FORMAT_LAYERED,
            options: {
              selector: args.selector,
              layerOrder: args.layerOrder,
              outputReferences: false,
            },
          },
        ],
      },
    },
  });

  const results = (await sd.formatPlatform("css")) as Array<{
    output: unknown;
    destination: string | undefined;
  }>;
  const css = results[0]?.output;
  if (typeof css !== "string") {
    throw new Error("Style Dictionary did not produce CSS output");
  }
  return css;
}

export interface GeneratedCss {
  tokensCss: string;
  tokensDarkCss: string;
  themeCss: string;
}

export async function generateCss(
  docs: DtcgDocuments,
): Promise<GeneratedCss> {
  const tokensCss = await buildCss({
    tokens: docs.light,
    selector: ":root",
    layerOrder: "design-tokens, theme",
  });
  const tokensDarkCss = await buildCss({
    tokens: docs.dark,
    selector: '[data-theme="dark"]',
  });
  return {
    tokensCss,
    tokensDarkCss,
    themeCss: THEME_CSS,
  };
}
