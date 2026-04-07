import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { Label } from './label';

describe('Label', () => {
  it('renders without crashing', async () => {
    const screen = await render(<Label>My Label</Label>);
    await expect.element(screen.getByText('My Label')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', async () => {
    const screen = await render(<Label className="my-class">Label</Label>);
    const el = screen.getByText('Label');
    await expect.element(el).toHaveClass('sct-label my-class');
  });

  it('sets data-slot attribute', async () => {
    const screen = await render(<Label>Label</Label>);
    await expect.element(screen.getByText('Label')).toHaveAttribute('data-slot', 'label');
  });

  it('passes htmlFor prop', async () => {
    const screen = await render(<Label htmlFor="my-input">Label</Label>);
    await expect.element(screen.getByText('Label')).toHaveAttribute('for', 'my-input');
  });
});
