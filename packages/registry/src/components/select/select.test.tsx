import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

describe('Select', () => {
  it('renders trigger without crashing', async () => {
    const screen = await render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
        </SelectContent>
      </Select>,
    );
    await expect.element(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('forwards className on trigger', async () => {
    const screen = await render(
      <Select>
        <SelectTrigger className="my-class">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
      </Select>,
    );
    await expect.element(screen.getByRole('combobox')).toHaveClass('sct-select-trigger my-class');
  });

  it('sets data-slot on trigger', async () => {
    const screen = await render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
      </Select>,
    );
    await expect.element(screen.getByRole('combobox')).toHaveAttribute('data-slot', 'select-trigger');
  });
});
