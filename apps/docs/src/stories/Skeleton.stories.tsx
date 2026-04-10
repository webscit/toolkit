import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@webscit/registry";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "300px" }}>
      <Skeleton style={{ height: "1rem", width: "80%" }} />
      <Skeleton style={{ height: "1rem", width: "60%" }} />
      <Skeleton style={{ height: "1rem", width: "70%" }} />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Skeleton style={{ width: "48px", height: "48px", borderRadius: "50%" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton style={{ height: "1rem", width: "200px" }} />
        <Skeleton style={{ height: "0.75rem", width: "150px" }} />
      </div>
    </div>
  ),
};
