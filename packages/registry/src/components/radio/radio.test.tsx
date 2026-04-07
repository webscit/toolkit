import { render, screen } from '@testing-library/react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { describe, it, expect } from 'vitest';
import { Radio } from './radio';

describe('Radio', () => {
  it('renders without crashing inside a RadioGroup', () => {
    render(
      <RadioGroup>
        <Radio value="a" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', () => {
    render(
      <RadioGroup>
        <Radio value="a" className="my-class" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio')).toHaveClass('sct-radio', 'my-class');
  });

  it('sets data-slot attribute', () => {
    render(
      <RadioGroup>
        <Radio value="a" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio')).toHaveAttribute('data-slot', 'radio');
  });

  it('disabled state applies data-disabled', () => {
    render(
      <RadioGroup>
        <Radio value="a" disabled />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio')).toHaveAttribute('data-disabled');
  });
});
