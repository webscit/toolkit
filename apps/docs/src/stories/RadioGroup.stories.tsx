import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio, Label } from "@webscit/registry";
import type { RadioGroupProps } from "@webscit/registry";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
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
  args: { defaultValue: "a" },
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
