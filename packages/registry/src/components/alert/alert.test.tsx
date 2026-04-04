import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from './alert';

describe('Alert', () => {
  it('renders without crashing', () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(<Alert className="my-class">Content</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('sct-alert', 'my-class');
  });

  it('applies correct data-variant attribute', () => {
    render(<Alert variant="destructive">Error!</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'destructive');
  });

  it('defaults to variant=default', () => {
    render(<Alert>Info</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'default');
  });

  it('renders title and description', () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText('Heads up!')).toBeInTheDocument();
    expect(screen.getByText('Something happened.')).toBeInTheDocument();
  });
});
