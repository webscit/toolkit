import type { Meta, StoryObj } from "@storybook/react";
import { Label, Input, Checkbox } from "@webscit/registry";
import { Label as ShadcnLabel } from "@/components/ui/label";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        maxWidth: "280px",
      }}
    >
      <Label htmlFor="name">Full name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            maxWidth: "280px",
          }}
        >
          <ShadcnLabel htmlFor="sn-name">Full name</ShadcnLabel>
          <ShadcnInput id="sn-name" placeholder="Enter your name" />
        </div>
      ),
    },
  },
};

export const WithCheckbox: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Checkbox id="agree" />
      <Label htmlFor="agree">I agree to the terms</Label>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShadcnCheckbox id="sn-agree" />
          <ShadcnLabel htmlFor="sn-agree">I agree to the terms</ShadcnLabel>
        </div>
      ),
    },
  },
};

export const Playground: Story = {
  args: { children: "Label text", htmlFor: "input" },
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <ShadcnLabel htmlFor={args["htmlFor"] as string}>
          {(args["children"] as string) ?? "Label text"}
        </ShadcnLabel>
      ),
    },
  },
};
