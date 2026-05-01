import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@webscit/registry";
import {
  Collapsible as ShadcnCollapsible,
  CollapsibleTrigger as ShadcnCollapsibleTrigger,
  CollapsibleContent as ShadcnCollapsibleContent,
} from "@/components/ui/collapsible";
import { Button as ShadcnButton } from "@/components/ui/button";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible style={{ width: "350px" }}>
      <CollapsibleTrigger>
        <Button variant="ghost">Toggle content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          style={{
            padding: "8px",
            border: "1px solid var(--sct-color-border)",
            borderRadius: "var(--sct-radius-md)",
            marginTop: "8px",
          }}
        >
          This content can be collapsed and expanded.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnCollapsible style={{ width: "350px" }}>
          <ShadcnCollapsibleTrigger asChild>
            <ShadcnButton variant="ghost">Toggle content</ShadcnButton>
          </ShadcnCollapsibleTrigger>
          <ShadcnCollapsibleContent>
            <div style={{ padding: "8px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", marginTop: "8px" }}>
              This content can be collapsed and expanded.
            </div>
          </ShadcnCollapsibleContent>
        </ShadcnCollapsible>
      ),
    },
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen style={{ width: "350px" }}>
      <CollapsibleTrigger>
        <Button variant="ghost">Toggle content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          style={{
            padding: "8px",
            border: "1px solid var(--sct-color-border)",
            borderRadius: "var(--sct-radius-md)",
            marginTop: "8px",
          }}
        >
          This starts expanded.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnCollapsible defaultOpen style={{ width: "350px" }}>
          <ShadcnCollapsibleTrigger asChild>
            <ShadcnButton variant="ghost">Toggle content</ShadcnButton>
          </ShadcnCollapsibleTrigger>
          <ShadcnCollapsibleContent>
            <div style={{ padding: "8px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", marginTop: "8px" }}>
              This starts expanded.
            </div>
          </ShadcnCollapsibleContent>
        </ShadcnCollapsible>
      ),
    },
  },
};
