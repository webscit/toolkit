import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RadioGroup } from './radio-group';

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    render(<RadioGroup aria-label="Options">children</RadioGroup>);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<RadioGroup aria-label="Options" className="my-class">children</RadioGroup>);
    expect(screen.getByRole('radiogroup')).toHaveClass('sct-radio-group', 'my-class');
  });

  it('sets data-orientation attribute', () => {
    render(<RadioGroup aria-label="Options" orientation="horizontal">children</RadioGroup>);
    expect(screen.getByRole('radiogroup')).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('defaults to vertical orientation', () => {
    render(<RadioGroup aria-label="Options">children</RadioGroup>);
    expect(screen.getByRole('radiogroup')).toHaveAttribute('data-orientation', 'vertical');
  });
});
