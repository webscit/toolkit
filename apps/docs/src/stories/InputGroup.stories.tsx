import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputGroup, InputGroupAddon, Input } from "@webscit/registry";
import { Input as ShadcnInput } from "@/components/ui/input";

const addonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0 12px",
  border: "1px solid var(--border)",
  backgroundColor: "var(--muted)",
  fontSize: "14px",
  color: "var(--muted-foreground)",
};

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputGroup style={{ width: "300px" }}>
      <InputGroupAddon>$</InputGroupAddon>
      <Input placeholder="0.00" />
    </InputGroup>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", width: "300px" }}>
          <span
            style={{
              ...addonStyle,
              borderRight: "none",
              borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
            }}
          >
            $
          </span>
          <ShadcnInput
            placeholder="0.00"
            style={{ borderRadius: "0 var(--radius-md) var(--radius-md) 0" }}
          />
        </div>
      ),
    },
  },
};

export const WithSuffix: Story = {
  render: () => (
    <InputGroup style={{ width: "300px" }}>
      <Input placeholder="username" />
      <InputGroupAddon>@example.com</InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", width: "300px" }}>
          <ShadcnInput
            placeholder="username"
            style={{
              borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
              borderRight: "none",
            }}
          />
          <span
            style={{
              ...addonStyle,
              borderRadius: "0 var(--radius-md) var(--radius-md) 0",
            }}
          >
            @example.com
          </span>
        </div>
      ),
    },
  },
};

export const BothSides: Story = {
  render: () => (
    <InputGroup style={{ width: "300px" }}>
      <InputGroupAddon>https://</InputGroupAddon>
      <Input placeholder="example.com" />
      <InputGroupAddon>/path</InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", width: "300px" }}>
          <span
            style={{
              ...addonStyle,
              borderRight: "none",
              borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
            }}
          >
            https://
          </span>
          <ShadcnInput
            placeholder="example.com"
            style={{ borderRadius: 0, borderRight: "none" }}
          />
          <span
            style={{
              ...addonStyle,
              borderRadius: "0 var(--radius-md) var(--radius-md) 0",
            }}
          >
            /path
          </span>
        </div>
      ),
    },
  },
};
