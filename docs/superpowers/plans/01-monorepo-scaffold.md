# Phase 1 — Monorepo Scaffold

## Goal
A fully configured monorepo that all subsequent phases build on top of. Every developer tool is wired up, CI passes on an empty repo.

---

## Steps

### 1.1 — Initialize npm workspace

**Files to create:**

`package.json` (root)
```json
{
  "name": "webscit-toolkit",
  "private": true,
  "type": "module",
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces --if-present",
    "test": "npm run test --workspaces --if-present",
    "lint": "eslint .",
    "typecheck": "npm run typecheck --workspaces --if-present"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^9.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0"
  }
}
```

`.npmrc`
```
legacy-peer-deps=false
```

**Install:**
```sh
npm install
```

---

### 1.2 — TypeScript root config

`tsconfig.base.json` (root — shared config all packages extend)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

---

### 1.3 — ESLint config

`eslint.config.mjs` (flat config, root)
```js
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': tseslint },
    languageOptions: { parser: tsparser },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
];
```

---

### 1.4 — Create package skeletons

**`packages/tokens/package.json`**
```json
{
  "name": "@webscit/tokens",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "build": "node build.mjs",
    "typecheck": "tsc --noEmit"
  }
}
```

**`packages/registry/package.json`**
```json
{
  "name": "@webscit/registry",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "build": "tsc -p tsconfig.build.json && npm run build:registry",
    "build:registry": "tsx scripts/build-registry.mts",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "dependencies": {
    "@base-ui-components/react": "^1.0.0"
  },
  "devDependencies": {
    "vitest": "^2.0.0",
    "@vitest/browser": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "jsdom": "^25.0.0",
    "tsx": "^4.0.0"
  }
}
```

**`apps/docs/package.json`**
```json
{
  "name": "@webscit/docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build"
  },
  "dependencies": {
    "@webscit/registry": "*",
    "@webscit/tokens": "*"
  },
  "devDependencies": {
    "@storybook/react": "^8.0.0",
    "@storybook/react-vite": "^8.0.0",
    "@storybook/addon-a11y": "^8.0.0",
    "@storybook/addon-docs": "^8.0.0",
    "vite": "^6.0.0"
  }
}
```

---

### 1.5 — Git setup

`.gitignore`
```
node_modules/
dist/
*.tsbuildinfo
storybook-static/
registry/
```

Initialize git:
```sh
git init
git add .
git commit -m "chore: initialize monorepo scaffold"
```

---

### 1.6 — CI workflow (GitHub Actions)

`.github/workflows/ci.yml`
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
      - run: npm run test
```

---

## Acceptance Criteria

- [ ] `npm install` succeeds from root
- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run lint` passes
- [ ] `npm run build` runs without error (even though packages are empty)
- [ ] CI workflow passes on first push
