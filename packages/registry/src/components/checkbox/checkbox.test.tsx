import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<Checkbox className="my-class" />);
    expect(screen.getByRole('checkbox')).toHaveClass('sct-checkbox', 'my-class');
  });

  it('sets data-slot attribute', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-slot', 'checkbox');
  });

  it('can be checked', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('data-checked');
  });

  it('disabled state applies data-disabled', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-disabled');
  });
});
