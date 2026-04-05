import type { Meta, StoryObj } from '@storybook/react';
import { Label, Input, Checkbox } from '@webscit/registry';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '280px' }}>
      <Label htmlFor="name">Full name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Checkbox id="agree" />
      <Label htmlFor="agree">I agree to the terms</Label>
    </div>
  ),
};

export const Playground: Story = {
  args: { children: 'Label text', htmlFor: 'input' },
};
