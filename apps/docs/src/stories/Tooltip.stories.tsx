import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@webscit/registry";
import {
  Tooltip as ShadcnTooltip,
  TooltipProvider as ShadcnTooltipProvider,
  TooltipTrigger as ShadcnTooltipTrigger,
  TooltipContent as ShadcnTooltipContent,
} from "@/components/ui/tooltip";
import { Button as ShadcnButton } from "@/components/ui/button";

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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnTooltipProvider>
          <ShadcnTooltip>
            <ShadcnTooltipTrigger asChild>
              <ShadcnButton variant="outline">Hover me</ShadcnButton>
            </ShadcnTooltipTrigger>
            <ShadcnTooltipContent>
              <p>This is a tooltip</p>
            </ShadcnTooltipContent>
          </ShadcnTooltip>
        </ShadcnTooltipProvider>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnTooltipProvider>
          <ShadcnTooltip>
            <ShadcnTooltipTrigger asChild>
              <ShadcnButton variant="outline">More info</ShadcnButton>
            </ShadcnTooltipTrigger>
            <ShadcnTooltipContent>
              <p>More information about this feature</p>
            </ShadcnTooltipContent>
          </ShadcnTooltip>
        </ShadcnTooltipProvider>
      ),
    },
  },
};

export const Playground: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Tooltip trigger</TooltipTrigger>
      <TooltipContent>Tooltip text</TooltipContent>
    </Tooltip>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnTooltipProvider>
          <ShadcnTooltip>
            <ShadcnTooltipTrigger>Tooltip trigger</ShadcnTooltipTrigger>
            <ShadcnTooltipContent>Tooltip text</ShadcnTooltipContent>
          </ShadcnTooltip>
        </ShadcnTooltipProvider>
      ),
    },
  },
};
