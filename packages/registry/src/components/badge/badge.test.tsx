import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<Badge className="my-class">New</Badge>);
    expect(screen.getByText('New')).toHaveClass('sct-badge', 'my-class');
  });

  it('applies correct data-variant attribute', () => {
    render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText('Error')).toHaveAttribute('data-variant', 'destructive');
  });

  it('defaults to variant=default', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveAttribute('data-variant', 'default');
  });

  it('sets data-slot attribute', () => {
    render(<Badge>Badge</Badge>);
    expect(screen.getByText('Badge')).toHaveAttribute('data-slot', 'badge');
  });
});
