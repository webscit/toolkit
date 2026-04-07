import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@webscit/registry";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const OnButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger style={{ padding: "6px 12px", cursor: "pointer" }}>
        More info
      </TooltipTrigger>
      <TooltipContent>
        <p>More information about this feature</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Playground: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Tooltip trigger</TooltipTrigger>
      <TooltipContent>Tooltip text</TooltipContent>
    </Tooltip>
  ),
};
