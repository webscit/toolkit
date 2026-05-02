import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Label } from "@webscit/registry";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";
import { Label as ShadcnLabel } from "@/components/ui/label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShadcnCheckbox id="sn-terms" />
          <ShadcnLabel htmlFor="sn-terms">
            Accept terms and conditions
          </ShadcnLabel>
        </div>
      ),
    },
  },
};

export const Checked: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Checked by default</Label>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShadcnCheckbox id="sn-checked" defaultChecked />
          <ShadcnLabel htmlFor="sn-checked">Checked by default</ShadcnLabel>
        </div>
      ),
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox id="dis1" disabled />
        <Label htmlFor="dis1">Disabled unchecked</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox id="dis2" disabled defaultChecked />
        <Label htmlFor="dis2">Disabled checked</Label>
      </div>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnCheckbox id="sn-dis1" disabled />
            <ShadcnLabel htmlFor="sn-dis1">Disabled unchecked</ShadcnLabel>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnCheckbox id="sn-dis2" disabled defaultChecked />
            <ShadcnLabel htmlFor="sn-dis2">Disabled checked</ShadcnLabel>
          </div>
        </div>
      ),
    },
  },
};

export const Playground: Story = {
  args: { disabled: false, defaultChecked: false },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Checkbox id="pg-checkbox" {...args} />
      <Label htmlFor="pg-checkbox">Accept terms</Label>
    </div>
  ),
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShadcnCheckbox
            id="sn-pg-checkbox"
            disabled={args["disabled"] as boolean}
            defaultChecked={args["defaultChecked"] as boolean}
          />
          <ShadcnLabel htmlFor="sn-pg-checkbox">Accept terms</ShadcnLabel>
        </div>
      ),
    },
  },
};
