import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup, Checkbox, Label } from "@webscit/registry";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";
import { Label as ShadcnLabel } from "@/components/ui/label";

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
  parameters: {
    shadcn: {
      render: () => (
        <fieldset style={{ border: "none", padding: 0 }}>
          <legend style={{ fontWeight: 500, marginBottom: "8px" }}>
            Notifications
          </legend>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShadcnCheckbox id="sn-email" defaultChecked />
              <ShadcnLabel htmlFor="sn-email">Email</ShadcnLabel>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShadcnCheckbox id="sn-sms" />
              <ShadcnLabel htmlFor="sn-sms">SMS</ShadcnLabel>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShadcnCheckbox id="sn-push" />
              <ShadcnLabel htmlFor="sn-push">Push notifications</ShadcnLabel>
            </div>
          </div>
        </fieldset>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: () => (
        <fieldset style={{ border: "none", padding: 0 }}>
          <legend style={{ fontWeight: 500, marginBottom: "8px" }}>
            Options
          </legend>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShadcnCheckbox id="sn-opt-a" />
              <ShadcnLabel htmlFor="sn-opt-a">Option A</ShadcnLabel>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShadcnCheckbox id="sn-opt-b" />
              <ShadcnLabel htmlFor="sn-opt-b">Option B</ShadcnLabel>
            </div>
          </div>
        </fieldset>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <fieldset style={{ border: "none", padding: 0 }}>
          <legend style={{ fontWeight: 500, marginBottom: "8px" }}>
            {(args["legend"] as string) ?? "Group label"}
          </legend>
          <div
            style={{
              display: "flex",
              flexDirection:
                args["orientation"] === "horizontal" ? "row" : "column",
              gap: args["orientation"] === "horizontal" ? "16px" : "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShadcnCheckbox id="sn-pg-cg-a" />
              <ShadcnLabel htmlFor="sn-pg-cg-a">Option A</ShadcnLabel>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShadcnCheckbox id="sn-pg-cg-b" />
              <ShadcnLabel htmlFor="sn-pg-cg-b">Option B</ShadcnLabel>
            </div>
          </div>
        </fieldset>
      ),
    },
  },
};
