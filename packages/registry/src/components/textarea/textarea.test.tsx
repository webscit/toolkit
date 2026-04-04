import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders without crashing', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<Textarea className="my-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('sct-textarea', 'my-class');
  });

  it('sets data-slot attribute', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'textarea');
  });

  it('passes disabled prop', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
