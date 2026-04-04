import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<Switch className="my-class" />);
    expect(screen.getByRole('switch')).toHaveClass('sct-switch', 'my-class');
  });

  it('sets data-slot attribute', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-slot', 'switch');
  });

  it('can be toggled', async () => {
    const user = userEvent.setup();
    render(<Switch />);
    const sw = screen.getByRole('switch');
    await user.click(sw);
    expect(sw).toHaveAttribute('data-checked');
  });

  it('disabled state applies data-disabled', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-disabled');
  });
});
