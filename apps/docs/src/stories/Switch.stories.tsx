import type { Meta, StoryObj } from "@storybook/react";
import { Switch, Label } from "@webscit/registry";
import { Switch as ShadcnSwitch } from "@/components/ui/switch";
import { Label as ShadcnLabel } from "@/components/ui/label";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane Mode</Label>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShadcnSwitch id="sn-airplane" />
          <ShadcnLabel htmlFor="sn-airplane">Airplane Mode</ShadcnLabel>
        </div>
      ),
    },
  },
};

export const Checked: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Switch id="notifications" defaultChecked />
      <Label htmlFor="notifications">Notifications</Label>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShadcnSwitch id="sn-notifications" defaultChecked />
          <ShadcnLabel htmlFor="sn-notifications">Notifications</ShadcnLabel>
        </div>
      ),
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Switch id="dis-off" disabled />
        <Label htmlFor="dis-off">Disabled off</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Switch id="dis-on" disabled defaultChecked />
        <Label htmlFor="dis-on">Disabled on</Label>
      </div>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnSwitch id="sn-dis-off" disabled />
            <ShadcnLabel htmlFor="sn-dis-off">Disabled off</ShadcnLabel>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnSwitch id="sn-dis-on" disabled defaultChecked />
            <ShadcnLabel htmlFor="sn-dis-on">Disabled on</ShadcnLabel>
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
      <Switch id="pg-switch" {...args} />
      <Label htmlFor="pg-switch">Enable notifications</Label>
    </div>
  ),
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShadcnSwitch
            id="sn-pg-switch"
            disabled={args["disabled"] as boolean}
            defaultChecked={args["defaultChecked"] as boolean}
          />
          <ShadcnLabel htmlFor="sn-pg-switch">Enable notifications</ShadcnLabel>
        </div>
      ),
    },
  },
};
