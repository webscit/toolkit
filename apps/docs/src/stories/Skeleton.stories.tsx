import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@webscit/registry";
import { Skeleton as ShadcnSkeleton } from "@/components/ui/skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "300px",
      }}
    >
      <Skeleton style={{ height: "1rem", width: "80%" }} />
      <Skeleton style={{ height: "1rem", width: "60%" }} />
      <Skeleton style={{ height: "1rem", width: "70%" }} />
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "300px" }}>
          <ShadcnSkeleton className="h-4 w-4/5" />
          <ShadcnSkeleton className="h-4 w-3/5" />
          <ShadcnSkeleton className="h-4 w-[70%]" />
        </div>
      ),
    },
  },
};

export const Card: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Skeleton
        style={{ width: "48px", height: "48px", borderRadius: "50%" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton style={{ height: "1rem", width: "200px" }} />
        <Skeleton style={{ height: "0.75rem", width: "150px" }} />
      </div>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <ShadcnSkeleton className="h-12 w-12 rounded-full" />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <ShadcnSkeleton className="h-4 w-[200px]" />
            <ShadcnSkeleton className="h-3 w-[150px]" />
          </div>
        </div>
      ),
    },
  },
};
