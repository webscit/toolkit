import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card>content</Card>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('forwards className', () => {
    render(<Card className="my-class">content</Card>);
    expect(screen.getByText('content')).toHaveClass('sct-card', 'my-class');
  });

  it('renders full card composition', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('sets data-slot on each part', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText('Title').closest('[data-slot="card-title"]')).toBeInTheDocument();
    expect(screen.getByText('Content').closest('[data-slot="card-content"]')).toBeInTheDocument();
    expect(screen.getByText('Footer').closest('[data-slot="card-footer"]')).toBeInTheDocument();
  });
});
