import { writeFileSync } from "fs";
import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";

register(StyleDictionary);

// Create a custom transform group based on tokens-studio but using kebab-case naming
// The tokens-studio group includes both name/kebab and name/camel (camel last, overriding).
// We replace name/camel with name/kebab for CSS-friendly --sct-* variable names.
StyleDictionary.registerTransformGroup({
  name: "tokens-studio-kebab",
  transforms: [
    "ts/descriptionToComment",
    "ts/resolveMath",
    "ts/size/px",
    "ts/opacity",
    "ts/size/lineheight",
    "ts/typography/fontWeight",
    "ts/color/modifiers",
    "ts/color/css/hexrgba",
    "ts/size/css/letterspacing",
    "ts/shadow/innerShadow",
    "attribute/cti",
    "name/kebab",
    "time/seconds",
    "html/icon",
    "size/rem",
    "color/css",
    "asset/url",
    "fontFamily/css",
    "cubicBezier/css",
    "strokeStyle/css/shorthand",
    "border/css/shorthand",
    "typography/css/shorthand",
    "transition/css/shorthand",
    "shadow/css/shorthand",
    // Note: name/camel is intentionally omitted so name/kebab takes effect
  ],
});

// Custom format: wraps CSS custom properties in @layer design-tokens.
// Accepts options:
//   selector     — CSS selector (default: ':root')
//   layerOrder   — if set, prepends "@layer <value>;" to establish layer order
StyleDictionary.registerFormat({
  name: "css/variables/layered",
  format: ({ dictionary, options }) => {
    const selector = options.selector ?? ":root";
    const layerOrderDecl = options.layerOrder
      ? `@layer ${options.layerOrder};\n\n`
      : "";
    // SD v4 with DTCG format (@tokens-studio/sd-transforms) stores the
    // transformed value in token.$value; fall back to token.value for
    // non-DTCG tokens.
    const vars = dictionary.allTokens
      .map((token) => `    --${token.name}: ${token.$value ?? token.value};`)
      .join("\n");
    return (
      `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n` +
      `${layerOrderDecl}` +
      `@layer design-tokens {\n` +
      `  ${selector} {\n` +
      `${vars}\n` +
      `  }\n` +
      `}\n`
    );
  },
});

// Light theme (all tokens except dark overrides)
const light = new StyleDictionary({
  source: ["src/base.tokens.json", "src/semantic.tokens.json"],
  platforms: {
    css: {
      transformGroup: "tokens-studio-kebab",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables/layered",
          options: {
            selector: ":root",
            outputReferences: false,
            // Declare layer order so consumers don't have to.
            // design-tokens is lower priority; theme can override it.
            layerOrder: "design-tokens, theme",
          },
        },
      ],
    },
    figma: {
      transformGroup: "tokens-studio-kebab",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.figma.json",
          format: "json/nested",
        },
      ],
    },
    penpot: {
      transformGroup: "tokens-studio-kebab",
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
      transformGroup: "tokens-studio-kebab",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens-dark.css",
          format: "css/variables/layered",
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: false,
          },
          filter: (token) => token.filePath.includes("semantic-dark"),
        },
      ],
    },
  },
});

await light.buildAllPlatforms();
await dark.buildAllPlatforms();

// Generate base.css: applies font-family token to html/:host.
// Lives in its own @layer theme so it can override @layer design-tokens
// without specificity fights, and consumers can override it via unlayered rules.
writeFileSync(
  "dist/base.css",
  `/**
 * Do not edit directly, this file was auto-generated.
 */

@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--sct-font-family-sans, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--sct-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
`,
);

console.log("✓ tokens built");
