# Phase 2 — Design Token System

## Goal

A complete `packages/tokens` package that:

1. Defines base + semantic tokens in W3C DTCG format, derived from VS Code Default Light/Dark Modern color values
2. Builds to a CSS custom properties file (`dist/tokens.css`)
3. Builds a dark theme override (`dist/tokens-dark.css`)
4. Exports a Figma Variables file (`dist/tokens.figma.json`)
5. Exports a Penpot-compatible CSS file (`dist/tokens.penpot.css`)

---

## Steps

### 2.1 — Install Style Dictionary v4

```sh
cd packages/tokens
npm install --save-dev style-dictionary@^4.0.0 @tokens-studio/sd-transforms@^1.0.0
```

`@tokens-studio/sd-transforms` provides:

- W3C DTCG token parsing
- Color modifier support (lightness/alpha derivation)
- Typography composite token expansion

---

### 2.2 — First theme: VS Code Default Light/Dark Modern

The default token values are taken directly from VS Code's built-in themes, giving the library an immediately recognisable VS Code aesthetic.

| Token                | Light Modern | Dark Modern | VS Code source                   |
| -------------------- | ------------ | ----------- | -------------------------------- |
| `primary`            | `#0078d4`    | `#0e70c0`   | `button.background`              |
| `primary-foreground` | `#ffffff`    | `#ffffff`   | `button.foreground`              |
| `background`         | `#ffffff`    | `#1e1e1e`   | `editor.background`              |
| `foreground`         | `#000000`    | `#d4d4d4`   | `editor.foreground`              |
| `surface`            | `#f3f3f3`    | `#252526`   | `sideBar.background`             |
| `surface-overlay`    | `#e8e8e8`    | `#2d2d2d`   | `editorHoverWidget.background`   |
| `border`             | `#8a8a8a`    | `#3c3c3c`   | `input.border`                   |
| `muted-foreground`   | `#737373`    | `#8b8b8b`   | `descriptionForeground`          |
| `focus-ring`         | `#0090f1`    | `#007fd4`   | `focusBorder`                    |
| `destructive`        | `#c72e2e`    | `#f85149`   | inspired by VS Code error colors |
| `accent`             | `#e8f0fe`    | `#2a2d2e`   | `list.hoverBackground`           |
| `accent-foreground`  | `#0078d4`    | `#d4d4d4`   | `list.hoverForeground`           |

---

### 2.3 — Define base tokens

`packages/tokens/src/base.tokens.json`

```json
{
  "$schema": "https://tr.designtokens.org/format/",
  "sct": {
    "color": {
      "blue": {
        "light": { "$type": "color", "$value": "#0090f1" },
        "base": { "$type": "color", "$value": "#0078d4" },
        "dark": { "$type": "color", "$value": "#0e70c0" },
        "darker": { "$type": "color", "$value": "#005a9e" }
      },
      "red": {
        "light": { "$type": "color", "$value": "#f85149" },
        "base": { "$type": "color", "$value": "#c72e2e" },
        "dark": { "$type": "color", "$value": "#a12626" }
      },
      "neutral": {
        "0": { "$type": "color", "$value": "#ffffff" },
        "50": { "$type": "color", "$value": "#f3f3f3" },
        "100": { "$type": "color", "$value": "#e8e8e8" },
        "200": { "$type": "color", "$value": "#c8c8c8" },
        "400": { "$type": "color", "$value": "#8b8b8b" },
        "500": { "$type": "color", "$value": "#737373" },
        "600": { "$type": "color", "$value": "#3c3c3c" },
        "700": { "$type": "color", "$value": "#2d2d2d" },
        "800": { "$type": "color", "$value": "#252526" },
        "900": { "$type": "color", "$value": "#1e1e1e" },
        "950": { "$type": "color", "$value": "#000000" }
      }
    },
    "space": {
      "0": { "$type": "dimension", "$value": "0px" },
      "1": { "$type": "dimension", "$value": "4px" },
      "2": { "$type": "dimension", "$value": "8px" },
      "3": { "$type": "dimension", "$value": "12px" },
      "4": { "$type": "dimension", "$value": "16px" },
      "5": { "$type": "dimension", "$value": "20px" },
      "6": { "$type": "dimension", "$value": "24px" },
      "8": { "$type": "dimension", "$value": "32px" }
    },
    "radius": {
      "none": { "$type": "dimension", "$value": "0px" },
      "sm": { "$type": "dimension", "$value": "2px" },
      "md": { "$type": "dimension", "$value": "4px" },
      "lg": { "$type": "dimension", "$value": "6px" },
      "full": { "$type": "dimension", "$value": "9999px" }
    },
    "font": {
      "family": {
        "sans": {
          "$type": "fontFamily",
          "$value": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        },
        "mono": {
          "$type": "fontFamily",
          "$value": "'SF Mono', 'Fira Code', 'Cascadia Code', monospace"
        }
      },
      "size": {
        "xs": { "$type": "dimension", "$value": "11px" },
        "sm": { "$type": "dimension", "$value": "12px" },
        "base": { "$type": "dimension", "$value": "13px" },
        "lg": { "$type": "dimension", "$value": "14px" },
        "xl": { "$type": "dimension", "$value": "16px" },
        "2xl": { "$type": "dimension", "$value": "18px" }
      },
      "weight": {
        "normal": { "$type": "number", "$value": 400 },
        "medium": { "$type": "number", "$value": 500 },
        "semibold": { "$type": "number", "$value": 600 }
      },
      "line-height": {
        "tight": { "$type": "number", "$value": 1.2 },
        "normal": { "$type": "number", "$value": 1.4 },
        "relaxed": { "$type": "number", "$value": 1.6 }
      }
    },
    "shadow": {
      "xs": {
        "$type": "shadow",
        "$value": {
          "offsetX": "0",
          "offsetY": "1px",
          "blur": "2px",
          "spread": "0",
          "color": "rgba(0,0,0,0.10)"
        }
      },
      "sm": {
        "$type": "shadow",
        "$value": {
          "offsetX": "0",
          "offsetY": "2px",
          "blur": "4px",
          "spread": "0",
          "color": "rgba(0,0,0,0.15)"
        }
      },
      "lg": {
        "$type": "shadow",
        "$value": {
          "offsetX": "0",
          "offsetY": "8px",
          "blur": "24px",
          "spread": "0",
          "color": "rgba(0,0,0,0.20)"
        }
      }
    }
  }
}
```

---

### 2.4 — Define semantic tokens (light theme)

`packages/tokens/src/semantic.tokens.json`

```json
{
  "$schema": "https://tr.designtokens.org/format/",
  "sct": {
    "color": {
      "primary": { "$type": "color", "$value": "{sct.color.blue.base}" },
      "primary-foreground": {
        "$type": "color",
        "$value": "{sct.color.neutral.0}"
      },
      "destructive": { "$type": "color", "$value": "{sct.color.red.base}" },
      "destructive-foreground": {
        "$type": "color",
        "$value": "{sct.color.neutral.0}"
      },
      "background": { "$type": "color", "$value": "{sct.color.neutral.0}" },
      "foreground": { "$type": "color", "$value": "{sct.color.neutral.950}" },
      "muted": { "$type": "color", "$value": "{sct.color.neutral.50}" },
      "muted-foreground": {
        "$type": "color",
        "$value": "{sct.color.neutral.500}"
      },
      "accent": { "$type": "color", "$value": "{sct.color.neutral.100}" },
      "accent-foreground": {
        "$type": "color",
        "$value": "{sct.color.neutral.950}"
      },
      "surface": { "$type": "color", "$value": "{sct.color.neutral.50}" },
      "overlay": { "$type": "color", "$value": "{sct.color.neutral.100}" },
      "border": { "$type": "color", "$value": "{sct.color.neutral.200}" },
      "input": { "$type": "color", "$value": "{sct.color.neutral.200}" },
      "ring": { "$type": "color", "$value": "{sct.color.blue.light}" },
      "secondary": { "$type": "color", "$value": "{sct.color.neutral.100}" },
      "secondary-foreground": {
        "$type": "color",
        "$value": "{sct.color.neutral.950}"
      }
    }
  }
}
```

---

### 2.5 — Define dark theme token overrides

`packages/tokens/src/semantic-dark.tokens.json`

```json
{
  "sct": {
    "color": {
      "primary": { "$type": "color", "$value": "{sct.color.blue.dark}" },
      "destructive": { "$type": "color", "$value": "{sct.color.red.light}" },
      "background": { "$type": "color", "$value": "{sct.color.neutral.900}" },
      "foreground": { "$type": "color", "$value": "{sct.color.neutral.200}" },
      "muted": { "$type": "color", "$value": "{sct.color.neutral.800}" },
      "muted-foreground": {
        "$type": "color",
        "$value": "{sct.color.neutral.400}"
      },
      "accent": { "$type": "color", "$value": "{sct.color.neutral.700}" },
      "accent-foreground": {
        "$type": "color",
        "$value": "{sct.color.neutral.200}"
      },
      "surface": { "$type": "color", "$value": "{sct.color.neutral.800}" },
      "overlay": { "$type": "color", "$value": "{sct.color.neutral.700}" },
      "border": { "$type": "color", "$value": "{sct.color.neutral.600}" },
      "input": { "$type": "color", "$value": "{sct.color.neutral.600}" },
      "ring": { "$type": "color", "$value": "{sct.color.blue.base}" },
      "secondary": { "$type": "color", "$value": "{sct.color.neutral.700}" },
      "secondary-foreground": {
        "$type": "color",
        "$value": "{sct.color.neutral.200}"
      }
    }
  }
}
```

---

### 2.6 — Style Dictionary build config

`packages/tokens/build.mjs`

```js
import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";

register(StyleDictionary);

// Light theme (all tokens except dark overrides)
const light = new StyleDictionary({
  source: ["src/base.tokens.json", "src/semantic.tokens.json"],
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      prefix: "sct",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: { selector: ":root", outputReferences: false },
        },
      ],
    },
    figma: {
      transformGroup: "tokens-studio",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.figma.json",
          format: "json/nested",
        },
      ],
    },
    penpot: {
      transformGroup: "tokens-studio",
      prefix: "sct",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.penpot.css",
          format: "css/variables",
          options: { selector: ":root", outputReferences: false },
        },
      ],
    },
  },
});

// Dark theme overrides only
const dark = new StyleDictionary({
  source: ["src/base.tokens.json", "src/semantic-dark.tokens.json"],
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      prefix: "sct",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens-dark.css",
          format: "css/variables",
          options: { selector: '[data-theme="dark"]', outputReferences: false },
          filter: (token) => token.filePath.includes("semantic-dark"),
        },
      ],
    },
  },
});

await light.buildAllPlatforms();
await dark.buildAllPlatforms();
console.log("✓ tokens built");
```

---

### 2.7 — Verify outputs

After `npm run build` in `packages/tokens`, verify:

```
dist/
├── tokens.css            # :root { --sct-* } — light theme
├── tokens-dark.css       # [data-theme="dark"] { --sct-* }
├── tokens.figma.json     # Tokens Studio import format
└── tokens.penpot.css     # Penpot import format
```

Open `tokens.css` and confirm all `--sct-*` vars are fully resolved (no `{sct.*}` references remaining).

---

### 2.8 — Export package entry points

`packages/tokens/package.json` exports:

```json
{
  "exports": {
    "./tokens.css": "./dist/tokens.css",
    "./tokens-dark.css": "./dist/tokens-dark.css"
  }
}
```

---

## Acceptance Criteria

- [ ] `npm run build` in `packages/tokens` produces all four output files
- [ ] `dist/tokens.css` contains only resolved `--sct-*` custom properties (no token references)
- [ ] `dist/tokens-dark.css` uses `[data-theme="dark"]` selector
- [ ] `dist/tokens.figma.json` is valid JSON importable by Tokens Studio
- [ ] Adding `data-theme="dark"` to `<html>` switches the palette visually (verified in docs app)
- [ ] Primary color in light theme is `#0078d4` (VS Code button blue)
- [ ] Background in dark theme is `#1e1e1e` (VS Code dark editor)
