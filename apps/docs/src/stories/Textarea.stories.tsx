import type { Meta, StoryObj } from "@storybook/react";
import { Textarea, Label } from "@webscit/registry";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { Label as ShadcnLabel } from "@/components/ui/label";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        maxWidth: "320px",
      }}
    >
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{display:"flex",flexDirection:"column",gap:"6px",maxWidth:"320px"}}>
          <ShadcnLabel htmlFor="sn-message">Message</ShadcnLabel>
          <ShadcnTextarea id="sn-message" placeholder="Type your message here..." />
        </div>
      ),
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled textarea" },
  parameters: {
    shadcn: {
      render: (args: any) => (
        <ShadcnTextarea disabled={args["disabled"] as boolean} placeholder={args["placeholder"] as string} />
      ),
    },
  },
};

export const Playground: Story = {
  args: { placeholder: "Type something...", rows: 4 },
  parameters: {
    shadcn: {
      render: (args: any) => (
        <ShadcnTextarea placeholder={args["placeholder"] as string} rows={args["rows"] as number} disabled={args["disabled"] as boolean | undefined} />
      ),
    },
  },
};
