# Phase 4 — Registry & CLI

## Goal
Make components installable via `npx @webscit/toolkit add <component>` into a consumer project. This requires:
1. A shadcn-compatible registry manifest built from component sources
2. A GitHub Actions workflow that deploys the registry to GitHub Pages at `https://webscit.github.io/toolkit`
3. A thin CLI wrapper published to npm

---

## Steps

### 4.1 — shadcn registry format

The shadcn CLI fetches components from a registry server. Two key endpoints:

**Registry index** (`/r/registry.json`):
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "webscit-toolkit",
  "homepage": "https://webscit.github.io/toolkit",
  "items": [
    {
      "name": "button",
      "type": "registry:component",
      "title": "Button",
      "description": "Themable button built on Base UI.",
      "dependencies": ["@base-ui-components/react"],
      "files": [
        { "path": "components/button/button.tsx", "type": "registry:component" },
        { "path": "components/button/button.css", "type": "registry:component" }
      ]
    }
  ]
}
```

**Per-component file** (`/r/button.json`) — same shape but with `content` field populated with raw file text.

---

### 4.2 — Registry build script

`packages/registry/scripts/build-registry.mts`

```ts
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';

const COMPONENTS_DIR = resolve('src/components');
const OUTPUT_DIR = resolve('registry');
mkdirSync(OUTPUT_DIR, { recursive: true });

const componentNames = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const items = componentNames.map((name) => {
  const dir = join(COMPONENTS_DIR, name);
  const meta = JSON.parse(readFileSync(join(dir, 'registry.meta.json'), 'utf8'));

  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.tsx') || f.endsWith('.css'))
    .map((filename) => ({
      path: `components/${name}/${filename}`,
      type: 'registry:component' as const,
      content: readFileSync(join(dir, filename), 'utf8'),
    }));

  const item = { name, type: 'registry:component', ...meta, files };

  // Write per-component JSON
  writeFileSync(join(OUTPUT_DIR, `${name}.json`), JSON.stringify(item, null, 2));

  // Return index entry (without content)
  return { ...item, files: files.map(({ content: _, ...f }) => f) };
});

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'webscit-toolkit',
  homepage: 'https://webscit.github.io/toolkit',
  items,
};

writeFileSync(join(OUTPUT_DIR, 'registry.json'), JSON.stringify(registry, null, 2));
console.log(`✓ registry built: ${items.length} components`);
```

The `registry/` output directory is gitignored in the source tree — it is generated and deployed by CI only.

---

### 4.3 — GitHub Actions: deploy registry to GitHub Pages

`.github/workflows/deploy-registry.yml`

```yaml
name: Deploy Registry

on:
  push:
    branches: [main]
    paths:
      - 'packages/registry/src/**'
      - 'packages/registry/scripts/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build tokens
        run: npm run build --workspace=packages/tokens

      - name: Build registry TypeScript
        run: npm run build --workspace=packages/registry

      - name: Build registry JSON
        run: npm run build:registry --workspace=packages/registry

      - name: Prepare Pages artifact
        run: |
          mkdir -p _site/r
          cp -r packages/registry/registry/* _site/r/
          # Also deploy built tokens CSS for consumers who want to link directly
          mkdir -p _site/tokens
          cp packages/tokens/dist/*.css _site/tokens/
          cp packages/tokens/dist/*.json _site/tokens/

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site

      - uses: actions/deploy-pages@v4
        id: deployment
```

After a successful deploy, the registry will be available at:
- `https://webscit.github.io/toolkit/r/registry.json`
- `https://webscit.github.io/toolkit/r/button.json`
- `https://webscit.github.io/toolkit/tokens/tokens.css`

---

### 4.4 — Thin CLI wrapper

`packages/cli/src/index.ts`

```ts
#!/usr/bin/env node
const REGISTRY_URL = 'https://webscit.github.io/toolkit/r';
const [,, command, ...args] = process.argv;

if (command === 'add') {
  const { execSync } = await import('child_process');
  const components = args.join(' ');
  execSync(
    `npx shadcn@latest add --registry ${REGISTRY_URL} ${components}`,
    { stdio: 'inherit' }
  );
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
```

`packages/cli/package.json`
```json
{
  "name": "@webscit/toolkit",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "webscit": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "files": ["dist"]
}
```

---

### 4.5 — End-to-end consumer test

Create a test project outside the monorepo and verify:

```sh
mkdir /tmp/test-consumer && cd /tmp/test-consumer
npx create-vite@latest . --template react-ts
npm install
npx @webscit/toolkit add button
```

Expected:
- `src/components/button/button.tsx` created
- `src/components/button/button.css` created
- `@base-ui-components/react` added to `package.json` dependencies
- Component renders correctly when `@webscit/tokens/tokens.css` is imported at app root

---

## Acceptance Criteria

- [ ] `npm run build:registry` in `packages/registry` produces valid JSON files in `registry/`
- [ ] GitHub Actions deploy workflow triggers on push to `main` and succeeds
- [ ] `https://webscit.github.io/toolkit/r/registry.json` returns valid JSON after deploy
- [ ] `https://webscit.github.io/toolkit/r/button.json` returns button component files with content
- [ ] `npx @webscit/toolkit add button` installs files into a consumer Vite project
- [ ] `npx @webscit/toolkit add button input label` (multi-component) works
- [ ] Installed component renders correctly with tokens CSS imported
