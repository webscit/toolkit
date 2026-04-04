import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CheckboxGroup } from './checkbox-group';

describe('CheckboxGroup', () => {
  it('renders without crashing', () => {
    render(<CheckboxGroup>children</CheckboxGroup>);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<CheckboxGroup className="my-class">children</CheckboxGroup>);
    expect(screen.getByRole('group')).toHaveClass('sct-checkbox-group', 'my-class');
  });

  it('renders legend when provided', () => {
    render(<CheckboxGroup legend="Fruits">children</CheckboxGroup>);
    expect(screen.getByText('Fruits')).toBeInTheDocument();
  });

  it('sets data-orientation attribute', () => {
    render(<CheckboxGroup orientation="horizontal">children</CheckboxGroup>);
    expect(screen.getByRole('group')).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('defaults to vertical orientation', () => {
    render(<CheckboxGroup>children</CheckboxGroup>);
    expect(screen.getByRole('group')).toHaveAttribute('data-orientation', 'vertical');
  });
});
