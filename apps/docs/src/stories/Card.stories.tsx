import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@webscit/registry";
import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent,
  CardFooter as ShadcnCardFooter,
} from "@/components/ui/card";
import { Button as ShadcnButton } from "@/components/ui/button";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: "360px" }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card description that provides additional context.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This can include any React content.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnCard style={{ maxWidth: "360px" }}>
          <ShadcnCardHeader>
            <ShadcnCardTitle>Card Title</ShadcnCardTitle>
            <ShadcnCardDescription>Card description that provides additional context.</ShadcnCardDescription>
          </ShadcnCardHeader>
          <ShadcnCardContent>
            <p>Card content goes here. This can include any React content.</p>
          </ShadcnCardContent>
          <ShadcnCardFooter>
            <ShadcnButton variant="outline">Cancel</ShadcnButton>
            <ShadcnButton>Save</ShadcnButton>
          </ShadcnCardFooter>
        </ShadcnCard>
      ),
    },
  },
};

export const Simple: Story = {
  render: () => (
    <Card style={{ maxWidth: "360px" }}>
      <CardContent>
        <p>A simple card with only content.</p>
      </CardContent>
    </Card>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnCard style={{ maxWidth: "360px" }}>
          <ShadcnCardContent>
            <p>A simple card with only content.</p>
          </ShadcnCardContent>
        </ShadcnCard>
      ),
    },
  },
};

export const Playground: Story = {
  args: { children: "Card content" },
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <ShadcnCard>
          <ShadcnCardContent>{args["children"] as string ?? "Card content"}</ShadcnCardContent>
        </ShadcnCard>
      ),
    },
  },
};
