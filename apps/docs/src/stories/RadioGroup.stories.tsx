import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio, Label } from "@webscit/registry";
import type { RadioGroupProps } from "@webscit/registry";
import {
  RadioGroup as ShadcnRadioGroup,
  RadioGroupItem as ShadcnRadioGroupItem,
} from "@/components/ui/radio-group";
import { Label as ShadcnLabel } from "@/components/ui/label";

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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnRadioGroup defaultValue="comfortable">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnRadioGroupItem value="compact" id="sn-compact" />
            <ShadcnLabel htmlFor="sn-compact">Compact</ShadcnLabel>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnRadioGroupItem value="comfortable" id="sn-comfortable" />
            <ShadcnLabel htmlFor="sn-comfortable">Comfortable</ShadcnLabel>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnRadioGroupItem value="spacious" id="sn-spacious" />
            <ShadcnLabel htmlFor="sn-spacious">Spacious</ShadcnLabel>
          </div>
        </ShadcnRadioGroup>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnRadioGroup
          defaultValue="b"
          style={{ flexDirection: "row", display: "flex", gap: "16px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnRadioGroupItem value="a" id="sn-h-a" />
            <ShadcnLabel htmlFor="sn-h-a">Option A</ShadcnLabel>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnRadioGroupItem value="b" id="sn-h-b" />
            <ShadcnLabel htmlFor="sn-h-b">Option B</ShadcnLabel>
          </div>
        </ShadcnRadioGroup>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnRadioGroup defaultValue="a">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnRadioGroupItem value="a" id="sn-d-a" disabled />
            <ShadcnLabel htmlFor="sn-d-a">Disabled option A</ShadcnLabel>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnRadioGroupItem value="b" id="sn-d-b" disabled />
            <ShadcnLabel htmlFor="sn-d-b">Disabled option B</ShadcnLabel>
          </div>
        </ShadcnRadioGroup>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <ShadcnRadioGroup
          defaultValue={args["defaultValue"] as string}
          style={
            args["orientation"] === "horizontal"
              ? { flexDirection: "row", display: "flex", gap: "16px" }
              : undefined
          }
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnRadioGroupItem value="a" id="sn-pg-a" />
            <ShadcnLabel htmlFor="sn-pg-a">Option A</ShadcnLabel>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShadcnRadioGroupItem value="b" id="sn-pg-b" />
            <ShadcnLabel htmlFor="sn-pg-b">Option B</ShadcnLabel>
          </div>
        </ShadcnRadioGroup>
      ),
    },
  },
};
