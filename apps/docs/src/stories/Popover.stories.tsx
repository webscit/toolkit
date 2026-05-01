import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from "@webscit/registry";
import {
  Popover as ShadcnPopover,
  PopoverTrigger as ShadcnPopoverTrigger,
  PopoverContent as ShadcnPopoverContent,
} from "@/components/ui/popover";
import { Button as ShadcnButton } from "@/components/ui/button";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p style={{ fontWeight: 600, marginBottom: "4px" }}>Dimensions</p>
        <p
          style={{
            fontSize: "12px",
            color: "var(--sct-color-muted-foreground)",
          }}
        >
          Set the dimensions for the layer.
        </p>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnPopover>
          <ShadcnPopoverTrigger asChild>
            <ShadcnButton variant="outline">Open popover</ShadcnButton>
          </ShadcnPopoverTrigger>
          <ShadcnPopoverContent>
            <p style={{ fontWeight: 600, marginBottom: "4px" }}>Dimensions</p>
            <p style={{ fontSize: "12px" }}>
              Set the dimensions for the layer.
            </p>
          </ShadcnPopoverContent>
        </ShadcnPopover>
      ),
    },
  },
};

export const WithClose: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button>Details</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Some detailed information here.</p>
        <PopoverClose>
          <Button variant="outline" size="sm">
            Close
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnPopover>
          <ShadcnPopoverTrigger asChild>
            <ShadcnButton>Details</ShadcnButton>
          </ShadcnPopoverTrigger>
          <ShadcnPopoverContent>
            <p>Some detailed information here.</p>
          </ShadcnPopoverContent>
        </ShadcnPopover>
      ),
    },
  },
};
