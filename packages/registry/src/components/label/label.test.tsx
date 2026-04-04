import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from './label';

describe('Label', () => {
  it('renders without crashing', () => {
    render(<Label>My Label</Label>);
    expect(screen.getByText('My Label')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<Label className="my-class">Label</Label>);
    const el = screen.getByText('Label');
    expect(el).toHaveClass('sct-label', 'my-class');
  });

  it('sets data-slot attribute', () => {
    render(<Label>Label</Label>);
    expect(screen.getByText('Label')).toHaveAttribute('data-slot', 'label');
  });

  it('passes htmlFor prop', () => {
    render(<Label htmlFor="my-input">Label</Label>);
    expect(screen.getByText('Label')).toHaveAttribute('for', 'my-input');
  });
});
