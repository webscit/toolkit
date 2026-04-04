import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<Button className="my-class">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('sct-button', 'my-class');
  });

  it('applies correct data-variant attribute', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'destructive');
  });

  it('applies correct data-size attribute', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg');
  });

  it('defaults to variant=default and size=default', () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('data-variant', 'default');
    expect(btn).toHaveAttribute('data-size', 'default');
  });

  it('passes disabled prop', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
