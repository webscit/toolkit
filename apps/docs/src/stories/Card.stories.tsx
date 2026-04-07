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
};

export const Simple: Story = {
  render: () => (
    <Card style={{ maxWidth: "360px" }}>
      <CardContent>
        <p>A simple card with only content.</p>
      </CardContent>
    </Card>
  ),
};

export const Playground: Story = {
  args: { children: "Card content" },
};
