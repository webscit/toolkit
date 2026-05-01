import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@webscit/registry";
import { Button as ShadcnButton } from "@/components/ui/button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: { control: "select", options: ["default", "xs", "sm", "lg", "icon"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <ShadcnButton variant="default">Default</ShadcnButton>
          <ShadcnButton variant="destructive">Destructive</ShadcnButton>
          <ShadcnButton variant="outline">Outline</ShadcnButton>
          <ShadcnButton variant="secondary">Secondary</ShadcnButton>
          <ShadcnButton variant="ghost">Ghost</ShadcnButton>
          <ShadcnButton variant="link">Link</ShadcnButton>
        </div>
      ),
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <ShadcnButton size="sm">Small</ShadcnButton>
          <ShadcnButton size="default">Default</ShadcnButton>
          <ShadcnButton size="lg">Large</ShadcnButton>
        </div>
      ),
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
  parameters: {
    shadcn: {
      render: () => <ShadcnButton disabled>Disabled</ShadcnButton>,
    },
  },
};

export const Playground: Story = {
  args: { children: "Click me", variant: "default", size: "default" },
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <ShadcnButton
          variant={args["variant"] as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"}
          size={args["size"] as "default" | "sm" | "lg" | "icon"}
          disabled={args["disabled"] as boolean | undefined}
        >
          {args["children"] as React.ReactNode ?? "Click me"}
        </ShadcnButton>
      ),
    },
  },
};
