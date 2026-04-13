import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "@webscit/registry";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea
      style={{
        height: "200px",
        width: "300px",
        border: "1px solid var(--sct-color-border)",
        borderRadius: "var(--sct-radius-md)",
      }}
    >
      <div style={{ padding: "16px" }}>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} style={{ margin: "8px 0" }}>
            Item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};
