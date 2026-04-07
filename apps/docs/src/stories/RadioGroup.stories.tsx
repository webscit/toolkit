import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio, Label } from "@webscit/registry";
import type { RadioGroupProps } from "@webscit/registry";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Radio id="compact" value="compact" />
        <Label htmlFor="compact">Compact</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Radio id="comfortable" value="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Radio id="spacious" value="spacious" />
        <Label htmlFor="spacious">Spacious</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="b" orientation="horizontal">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Radio id="h-a" value="a" />
        <Label htmlFor="h-a">Option A</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Radio id="h-b" value="b" />
        <Label htmlFor="h-b">Option B</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Radio id="d-a" value="a" disabled />
        <Label htmlFor="d-a">Disabled option A</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Radio id="d-b" value="b" disabled />
        <Label htmlFor="d-b">Disabled option B</Label>
      </div>
    </RadioGroup>
  ),
};

export const Playground: Story = {
  args: { orientation: "vertical", defaultValue: "a" },
  render: (args: RadioGroupProps) => (
    <RadioGroup {...args}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Radio id="pg-a" value="a" />
        <Label htmlFor="pg-a">Option A</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Radio id="pg-b" value="b" />
        <Label htmlFor="pg-b">Option B</Label>
      </div>
    </RadioGroup>
  ),
};
