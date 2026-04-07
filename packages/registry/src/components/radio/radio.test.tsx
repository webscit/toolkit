import { render } from 'vitest-browser-react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { describe, it, expect } from 'vitest';
import { Radio } from './radio';

describe('Radio', () => {
  it('renders without crashing inside a RadioGroup', async () => {
    const screen = await render(
      <RadioGroup>
        <Radio value="a" />
      </RadioGroup>,
    );
    await expect.element(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('forwards className after scope anchor', async () => {
    const screen = await render(
      <RadioGroup>
        <Radio value="a" className="my-class" />
      </RadioGroup>,
    );
    await expect.element(screen.getByRole('radio')).toHaveClass('sct-radio my-class');
  });

  it('sets data-slot attribute', async () => {
    const screen = await render(
      <RadioGroup>
        <Radio value="a" />
      </RadioGroup>,
    );
    await expect.element(screen.getByRole('radio')).toHaveAttribute('data-slot', 'radio');
  });

  it('disabled state applies data-disabled', async () => {
    const screen = await render(
      <RadioGroup>
        <Radio value="a" disabled />
      </RadioGroup>,
    );
    await expect.element(screen.getByRole('radio')).toHaveAttribute('data-disabled');
  });
});
