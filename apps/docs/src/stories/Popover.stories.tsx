import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from "@webscit/registry";

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
};
