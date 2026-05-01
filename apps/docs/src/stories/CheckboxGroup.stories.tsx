import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup, Checkbox, Label } from "@webscit/registry";

const meta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CheckboxGroup legend="Notifications">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox id="email" defaultChecked />
        <Label htmlFor="email">Email</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox id="sms" />
        <Label htmlFor="sms">SMS</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox id="push" />
        <Label htmlFor="push">Push notifications</Label>
      </div>
    </CheckboxGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <CheckboxGroup legend="Options" orientation="horizontal">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox id="opt-a" />
        <Label htmlFor="opt-a">Option A</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox id="opt-b" />
        <Label htmlFor="opt-b">Option B</Label>
      </div>
    </CheckboxGroup>
  ),
};

export const Playground: Story = {
  args: { legend: "Group label", orientation: "vertical" },
  render: (args) => (
    <CheckboxGroup {...args}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox id="pg-cg-a" />
        <Label htmlFor="pg-cg-a">Option A</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox id="pg-cg-b" />
        <Label htmlFor="pg-cg-b">Option B</Label>
      </div>
    </CheckboxGroup>
  ),
};
