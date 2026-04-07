import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { CheckboxGroup } from './checkbox-group';

describe('CheckboxGroup', () => {
  it('renders without crashing', async () => {
    const screen = await render(<CheckboxGroup>children</CheckboxGroup>);
    await expect.element(screen.getByRole('group')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', async () => {
    const screen = await render(<CheckboxGroup className="my-class">children</CheckboxGroup>);
    await expect.element(screen.getByRole('group')).toHaveClass('sct-checkbox-group my-class');
  });

  it('renders legend when provided', async () => {
    const screen = await render(<CheckboxGroup legend="Fruits">children</CheckboxGroup>);
    await expect.element(screen.getByText('Fruits')).toBeInTheDocument();
  });

  it('sets data-orientation attribute', async () => {
    const screen = await render(<CheckboxGroup orientation="horizontal">children</CheckboxGroup>);
    await expect.element(screen.getByRole('group')).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('defaults to vertical orientation', async () => {
    const screen = await render(<CheckboxGroup>children</CheckboxGroup>);
    await expect.element(screen.getByRole('group')).toHaveAttribute('data-orientation', 'vertical');
  });
});
