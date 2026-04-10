import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@webscit/registry";

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
        <div style={{ padding: "8px", border: "1px solid var(--sct-color-border)", borderRadius: "var(--sct-radius-md)", marginTop: "8px" }}>
          This content can be collapsed and expanded.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen style={{ width: "350px" }}>
      <CollapsibleTrigger>
        <Button variant="ghost">Toggle content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div style={{ padding: "8px", border: "1px solid var(--sct-color-border)", borderRadius: "var(--sct-radius-md)", marginTop: "8px" }}>
          This starts expanded.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
