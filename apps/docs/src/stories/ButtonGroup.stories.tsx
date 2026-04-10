import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup, Button } from "@webscit/registry";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const Playground: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">A</Button>
      <Button variant="outline">B</Button>
      <Button variant="outline">C</Button>
    </ButtonGroup>
  ),
};
