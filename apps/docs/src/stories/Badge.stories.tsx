import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@webscit/registry";
import { Badge as ShadcnBadge } from "@/components/ui/badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <ShadcnBadge variant="default">Default</ShadcnBadge>
          <ShadcnBadge variant="secondary">Secondary</ShadcnBadge>
          <ShadcnBadge variant="destructive">Destructive</ShadcnBadge>
          <ShadcnBadge variant="outline">Outline</ShadcnBadge>
        </div>
      ),
    },
  },
};

export const Playground: Story = {
  args: { children: "Badge", variant: "default" },
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <ShadcnBadge
          variant={
            args["variant"] as
              | "default"
              | "secondary"
              | "destructive"
              | "outline"
          }
        >
          {(args["children"] as string) ?? "Badge"}
        </ShadcnBadge>
      ),
    },
  },
};
