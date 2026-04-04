import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<Input className="my-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('sct-input', 'my-class');
  });

  it('sets data-slot attribute', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input');
  });

  it('passes type prop', () => {
    render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('passes disabled prop', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
