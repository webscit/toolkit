import type { Meta, StoryObj } from "@storybook/react";
import { InputGroup, InputGroupAddon, Input } from "@webscit/registry";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputGroup style={{ width: "300px" }}>
      <InputGroupAddon>$</InputGroupAddon>
      <Input placeholder="0.00" />
    </InputGroup>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <InputGroup style={{ width: "300px" }}>
      <Input placeholder="username" />
      <InputGroupAddon>@example.com</InputGroupAddon>
    </InputGroup>
  ),
};

export const BothSides: Story = {
  render: () => (
    <InputGroup style={{ width: "300px" }}>
      <InputGroupAddon>https://</InputGroupAddon>
      <Input placeholder="example.com" />
      <InputGroupAddon>/path</InputGroupAddon>
    </InputGroup>
  ),
};
