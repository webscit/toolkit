import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design Tokens',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const colorTokens = [
  // Semantic
  'primary', 'primary-foreground',
  'destructive', 'destructive-foreground',
  'background', 'foreground',
  'muted', 'muted-foreground',
  'accent', 'accent-foreground',
  'secondary', 'secondary-foreground',
  'surface', 'overlay',
  'border', 'input', 'ring',
  // Palette
  'blue-light', 'blue-base', 'blue-dark', 'blue-darker',
  'red-light', 'red-base', 'red-dark',
  'neutral-0', 'neutral-50', 'neutral-100', 'neutral-200',
  'neutral-400', 'neutral-500', 'neutral-600',
  'neutral-700', 'neutral-800', 'neutral-900', 'neutral-950',
];

const spaceTokens = ['0', '1', '2', '3', '4', '5', '6', '8'];
const radiusTokens = ['none', 'sm', 'md', 'lg', 'full'];
const fontSizeTokens = ['xs', 'sm', 'base', 'lg', 'xl', '2xl'];
const fontWeightTokens = ['normal', 'medium', 'semibold'];
const shadowTokens = ['xs', 'sm', 'lg'];

function ColorSwatch({ name }: { name: string }) {
  const varName = `--sct-color-${name}`;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '6px',
          background: `var(${varName})`,
          border: '1px solid var(--sct-color-border)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontSize: 'var(--sct-font-size-sm)', fontWeight: 'var(--sct-font-weight-medium)' as never }}>
          {name}
        </div>
        <div style={{ fontSize: 'var(--sct-font-size-xs)', color: 'var(--sct-color-muted-foreground)', fontFamily: 'monospace' }}>
          {varName}
        </div>
      </div>
    </div>
  );
}

export const Colors: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: 'var(--sct-font-size-xl)', fontWeight: 'var(--sct-font-weight-semibold)' as never, marginBottom: '16px' }}>
        Color Tokens
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '4px' }}>
        {colorTokens.map((name) => (
          <ColorSwatch key={name} name={name} />
        ))}
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: 'var(--sct-font-size-xl)', fontWeight: 'var(--sct-font-weight-semibold)' as never, marginBottom: '16px' }}>
        Spacing Scale
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {spaceTokens.map((n) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '80px', fontSize: 'var(--sct-font-size-sm)', fontFamily: 'monospace' }}>
              --sct-space-{n}
            </div>
            <div
              style={{
                height: '20px',
                width: `var(--sct-space-${n})`,
                minWidth: n === '0' ? '2px' : undefined,
                background: 'var(--sct-color-primary)',
                borderRadius: '2px',
              }}
            />
            <div style={{ fontSize: 'var(--sct-font-size-xs)', color: 'var(--sct-color-muted-foreground)' }}>
              {Number(n) * 4}px
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: 'var(--sct-font-size-xl)', fontWeight: 'var(--sct-font-weight-semibold)' as never, marginBottom: '16px' }}>
        Border Radius
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {radiusTokens.map((r) => (
          <div key={r} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'var(--sct-color-primary)',
                borderRadius: `var(--sct-radius-${r})`,
              }}
            />
            <div style={{ fontSize: 'var(--sct-font-size-xs)', fontFamily: 'monospace', color: 'var(--sct-color-muted-foreground)' }}>
              {r}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: 'var(--sct-font-size-xl)', fontWeight: 'var(--sct-font-weight-semibold)' as never, marginBottom: '16px' }}>
        Typography Scale
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
        {fontSizeTokens.map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <div style={{ width: '80px', fontSize: '11px', color: 'var(--sct-color-muted-foreground)', fontFamily: 'monospace' }}>
              {s}
            </div>
            <div style={{ fontSize: `var(--sct-font-size-${s})` }}>
              The quick brown fox jumps
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: 'var(--sct-font-size-lg)', fontWeight: 'var(--sct-font-weight-medium)' as never, marginBottom: '12px' }}>
        Font Weights
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {fontWeightTokens.map((w) => (
          <div key={w} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '80px', fontSize: '11px', color: 'var(--sct-color-muted-foreground)', fontFamily: 'monospace' }}>
              {w}
            </div>
            <div style={{ fontWeight: `var(--sct-font-weight-${w})` as never, fontSize: 'var(--sct-font-size-base)' }}>
              Sample text at {w} weight
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: 'var(--sct-font-size-xl)', fontWeight: 'var(--sct-font-weight-semibold)' as never, marginBottom: '24px' }}>
        Shadows
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
        {shadowTokens.map((s) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'var(--sct-color-background)',
                borderRadius: 'var(--sct-radius-md)',
                boxShadow: `var(--sct-shadow-${s})`,
              }}
            />
            <div style={{ fontSize: 'var(--sct-font-size-xs)', fontFamily: 'monospace', color: 'var(--sct-color-muted-foreground)' }}>
              shadow-{s}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
