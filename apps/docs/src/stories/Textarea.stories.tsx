import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, Label } from '@webscit/registry';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '320px' }}>
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled textarea' },
};

export const Playground: Story = {
  args: { placeholder: 'Type something...', rows: 4 },
};
