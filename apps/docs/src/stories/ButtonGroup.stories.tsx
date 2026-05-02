import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup, Button } from "@webscit/registry";
import { Button as ShadcnButton } from "@/components/ui/button";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "inline-flex" }}>
          <ShadcnButton variant="outline" style={{ borderRadius: "var(--radius-md) 0 0 var(--radius-md)", borderRight: "none" }}>Left</ShadcnButton>
          <ShadcnButton variant="outline" style={{ borderRadius: 0, borderRight: "none" }}>Center</ShadcnButton>
          <ShadcnButton variant="outline" style={{ borderRadius: "0 var(--radius-md) var(--radius-md) 0" }}>Right</ShadcnButton>
        </div>
      ),
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          <ShadcnButton variant="outline" style={{ borderRadius: "var(--radius-md) var(--radius-md) 0 0", borderBottom: "none" }}>Top</ShadcnButton>
          <ShadcnButton variant="outline" style={{ borderRadius: 0, borderBottom: "none" }}>Middle</ShadcnButton>
          <ShadcnButton variant="outline" style={{ borderRadius: "0 0 var(--radius-md) var(--radius-md)" }}>Bottom</ShadcnButton>
        </div>
      ),
    },
  },
};

export const Playground: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">A</Button>
      <Button variant="outline">B</Button>
      <Button variant="outline">C</Button>
    </ButtonGroup>
  ),
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => {
        const isVertical = args["orientation"] === "vertical";
        return (
          <div style={{ display: "inline-flex", flexDirection: isVertical ? "column" : "row" }}>
            <ShadcnButton
              variant="outline"
              style={
                isVertical
                  ? { borderRadius: "var(--radius-md) var(--radius-md) 0 0", borderBottom: "none" }
                  : { borderRadius: "var(--radius-md) 0 0 var(--radius-md)", borderRight: "none" }
              }
            >
              A
            </ShadcnButton>
            <ShadcnButton
              variant="outline"
              style={
                isVertical
                  ? { borderRadius: 0, borderBottom: "none" }
                  : { borderRadius: 0, borderRight: "none" }
              }
            >
              B
            </ShadcnButton>
            <ShadcnButton
              variant="outline"
              style={
                isVertical
                  ? { borderRadius: "0 0 var(--radius-md) var(--radius-md)" }
                  : { borderRadius: "0 var(--radius-md) var(--radius-md) 0" }
              }
            >
              C
            </ShadcnButton>
          </div>
        );
      },
    },
  },
};
