import type { Meta, StoryObj } from "@storybook/react";
import { Input, Label } from "@webscit/registry";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label as ShadcnLabel } from "@/components/ui/label";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        maxWidth: "320px",
      }}
    >
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
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
            maxWidth: "320px",
          }}
        >
          <ShadcnLabel htmlFor="sn-email">Email</ShadcnLabel>
          <ShadcnInput
            id="sn-email"
            type="email"
            placeholder="you@example.com"
          />
        </div>
      ),
    },
  },
};

export const AllTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "320px",
      }}
    >
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="search" placeholder="Search input" />
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "320px",
          }}
        >
          <ShadcnInput type="text" placeholder="Text input" />
          <ShadcnInput type="email" placeholder="Email input" />
          <ShadcnInput type="password" placeholder="Password input" />
          <ShadcnInput type="number" placeholder="Number input" />
          <ShadcnInput type="search" placeholder="Search input" />
        </div>
      ),
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <ShadcnInput
          disabled={args["disabled"] as boolean}
          placeholder={args["placeholder"] as string}
        />
      ),
    },
  },
};

export const Playground: Story = {
  args: { placeholder: "Placeholder text", type: "text" },
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <ShadcnInput
          placeholder={args["placeholder"] as string}
          type={args["type"] as string}
          disabled={args["disabled"] as boolean | undefined}
        />
      ),
    },
  },
};
