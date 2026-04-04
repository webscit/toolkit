import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

// Create a custom transform group based on tokens-studio but using kebab-case naming
// The tokens-studio group includes both name/kebab and name/camel (camel last, overriding).
// We replace name/camel with name/kebab for CSS-friendly --sct-* variable names.
StyleDictionary.registerTransformGroup({
  name: 'tokens-studio-kebab',
  transforms: [
    'ts/descriptionToComment',
    'ts/resolveMath',
    'ts/size/px',
    'ts/opacity',
    'ts/size/lineheight',
    'ts/typography/fontWeight',
    'ts/color/modifiers',
    'ts/color/css/hexrgba',
    'ts/size/css/letterspacing',
    'ts/shadow/innerShadow',
    'attribute/cti',
    'name/kebab',
    'time/seconds',
    'html/icon',
    'size/rem',
    'color/css',
    'asset/url',
    'fontFamily/css',
    'cubicBezier/css',
    'strokeStyle/css/shorthand',
    'border/css/shorthand',
    'typography/css/shorthand',
    'transition/css/shorthand',
    'shadow/css/shorthand',
    // Note: name/camel is intentionally omitted so name/kebab takes effect
  ],
});

// Light theme (all tokens except dark overrides)
const light = new StyleDictionary({
  source: ['src/base.tokens.json', 'src/semantic.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio-kebab',
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { selector: ':root', outputReferences: false },
      }],
    },
    figma: {
      transformGroup: 'tokens-studio-kebab',
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.figma.json',
        format: 'json/nested',
      }],
    },
    penpot: {
      transformGroup: 'tokens-studio-kebab',
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.penpot.css',
        format: 'css/variables',
        options: { selector: ':root', outputReferences: false },
      }],
    },
  },
});

// Dark theme overrides only
const dark = new StyleDictionary({
  source: ['src/base.tokens.json', 'src/semantic-dark.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio-kebab',
      buildPath: 'dist/',
      files: [{
        destination: 'tokens-dark.css',
        format: 'css/variables',
        options: { selector: '[data-theme="dark"]', outputReferences: false },
        filter: (token) => token.filePath.includes('semantic-dark'),
      }],
    },
  },
});

await light.buildAllPlatforms();
await dark.buildAllPlatforms();
console.log('✓ tokens built');
