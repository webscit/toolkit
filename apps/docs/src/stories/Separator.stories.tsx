import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@webscit/registry";
import { Separator as ShadcnSeparator } from "@/components/ui/separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: { control: "boolean" },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { shadcn: { render: () => <ShadcnSeparator /> } },
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        height: "24px",
      }}
    >
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", height: "24px" }}>
          <span>Left</span>
          <ShadcnSeparator orientation="vertical" className="h-full" />
          <span>Right</span>
        </div>
      ),
    },
  },
};

export const Playground: Story = {
  args: { orientation: "horizontal", decorative: true },
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <ShadcnSeparator
          orientation={args["orientation"] as "horizontal" | "vertical"}
          decorative={args["decorative"] as boolean}
        />
      ),
    },
  },
};
