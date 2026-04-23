# @webscit/toolkit — Scientific UI Component Library

A themable React component library for scientific-domain UIs. Components are distributed shadcn-style: the CLI copies source files into your project so you own and modify them directly. Styling is plain CSS with `@scope` rules and W3C design tokens — no Tailwind, no runtime JS for styling.

## Quick start

```bash
npx @webscit/toolkit add button
```

Then import the token stylesheet once at your application entry point:

```ts
import "@webscit/tokens/tokens.css";
```

## Links

- [Documentation](https://webscit.github.io/toolkit/) — Storybook with component previews and guides
- [Component registry](https://webscit.github.io/toolkit/r) — Raw registry endpoint (used by the CLI)
- [Component list](https://webscit.github.io/toolkit/?path=/docs/docs-components--docs) — All available components grouped by category

## How it works

`@webscit/toolkit` follows the same model as [shadcn/ui](https://ui.shadcn.com/). There is no package to install for the components themselves. Running `npx @webscit/toolkit add <component>` copies the component's `.tsx` and `.css` files into your project via the shadcn CLI.

Because the files live in your codebase, you can edit markup, adjust styles, and evolve components alongside your application without waiting for an upstream release.

The only installed package is `@webscit/tokens`, which provides the CSS custom properties (`--sct-*`) that components reference for colors, spacing, typography, and more.

## Dark mode

Set `data-theme="dark"` on `<html>` to activate the dark theme:

```ts
document.documentElement.dataset.theme = "dark";
```

Import `@webscit/tokens/tokens-dark.css` alongside `tokens.css` to enable dark overrides.

## License

MIT
