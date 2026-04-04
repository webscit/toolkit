import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

describe('Select', () => {
  it('renders trigger without crashing', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('forwards className on trigger', () => {
    render(
      <Select>
        <SelectTrigger className="my-class">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveClass('sct-select-trigger', 'my-class');
  });

  it('sets data-slot on trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('data-slot', 'select-trigger');
  });
});
