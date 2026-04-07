import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  it('renders without crashing', async () => {
    const screen = await render(<Input />);
    await expect.element(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', async () => {
    const screen = await render(<Input className="my-class" />);
    await expect.element(screen.getByRole('textbox')).toHaveClass('sct-input my-class');
  });

  it('sets data-slot attribute', async () => {
    const screen = await render(<Input />);
    await expect.element(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input');
  });

  it('passes type prop', async () => {
    const screen = await render(<Input type="email" />);
    await expect.element(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('passes disabled prop', async () => {
    const screen = await render(<Input disabled />);
    await expect.element(screen.getByRole('textbox')).toBeDisabled();
  });
});
