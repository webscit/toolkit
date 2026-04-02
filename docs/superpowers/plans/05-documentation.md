# Phase 5 — Documentation

## Goal
A Storybook instance in `apps/docs/` that documents all 17 components with interactive stories, design token reference, and a theme toggle. Accessibility is validated in-browser via the a11y addon.

---

## Steps

### 5.1 — Initialize Storybook

```sh
cd apps/docs
npx storybook@latest init --type react --builder vite
npm install --save-dev @storybook/addon-a11y @storybook/addon-docs
```

`.storybook/main.ts`
```ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
```

---

### 5.2 — Import tokens + theme toggle

`.storybook/preview.ts`
```ts
import '@webscit/tokens/tokens.css';
import '@webscit/tokens/tokens-dark.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme =
        context.globals['theme'] === 'dark' ? 'dark' : '';
      return <Story />;
    },
  ],
};
export default preview;
```

---

### 5.3 — Unit tests with Vitest browser mode

Component tests run in a real browser via `@vitest/browser` (using the Playwright provider internally — no standalone Playwright test suite needed).

`packages/registry/vitest.config.ts`
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
});
```

Install the browser provider:
```sh
cd packages/registry
npm install --save-dev @vitest/browser playwright
npx playwright install chromium
```

This enables tests that assert on real DOM rendering without a separate Playwright test runner.

Example test pattern:
```tsx
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders with scope anchor class', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('sct-button');
  });

  it('forwards className', () => {
    render(<Button className="custom">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('sct-button', 'custom');
  });

  it('applies data-variant attribute', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'destructive');
  });

  it('sets data-disabled when disabled', async () => {
    render(<Button disabled>Click</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('data-disabled');
  });
});
```

---

### 5.4 — Story pattern (all 17 components)

Every story follows this template:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@webscit/registry';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    size:    { control: 'select', options: ['default', 'xs', 'sm', 'lg', 'icon'] },
    disabled:{ control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const Playground: Story = {
  args: { children: 'Click me', variant: 'default', size: 'default' },
};
```

---

### 5.5 — Design Tokens page

`apps/docs/src/tokens/Tokens.stories.tsx`

A documentation-only story that renders all `--sct-*` token values as visual swatches:
- Color palette grid (background, border, text previews per color token)
- Spacing scale ruler
- Typography scale with font size + weight samples
- Border radius samples
- Shadow samples

---

### 5.6 — CI: deploy Storybook to GitHub Pages

The Storybook static build is deployed alongside the registry in the same GitHub Pages site.

Add to `.github/workflows/deploy-registry.yml`:

```yaml
      - name: Build Storybook
        run: npm run build --workspace=apps/docs

      - name: Prepare Pages artifact
        run: |
          mkdir -p _site/r
          mkdir -p _site/tokens
          mkdir -p _site/storybook
          cp -r packages/registry/registry/* _site/r/
          cp packages/tokens/dist/*.css _site/tokens/
          cp packages/tokens/dist/*.json _site/tokens/
          cp -r apps/docs/storybook-static/* _site/storybook/
```

Final URLs:
- Registry: `https://webscit.github.io/toolkit/r/`
- Tokens CSS: `https://webscit.github.io/toolkit/tokens/tokens.css`
- Storybook: `https://webscit.github.io/toolkit/storybook/`

---

## Acceptance Criteria

- [ ] All 17 components have a story with at minimum: AllVariants, Disabled, Playground
- [ ] Theme toggle in Storybook toolbar correctly switches light ↔ dark
- [ ] `@storybook/addon-a11y` shows no violations on any component story
- [ ] Design Tokens page renders all `--sct-*` color, spacing, and typography tokens
- [ ] `npm run build` in `apps/docs` succeeds (static Storybook output)
- [ ] Storybook is accessible at `https://webscit.github.io/toolkit/storybook/` after deploy
- [ ] All component unit tests pass using `@vitest/browser` with Chromium
