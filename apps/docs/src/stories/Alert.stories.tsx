import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "@webscit/registry";
import type { AlertProps } from "@webscit/registry";
import {
  Alert as ShadcnAlert,
  AlertTitle as ShadcnAlertTitle,
  AlertDescription as ShadcnAlertDescription,
} from "@/components/ui/alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnAlert>
          <ShadcnAlertTitle>Heads up!</ShadcnAlertTitle>
          <ShadcnAlertDescription>You can add components to your app using the CLI.</ShadcnAlertDescription>
        </ShadcnAlert>
      ),
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Alert variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <ShadcnAlert variant="default">
            <ShadcnAlertTitle>Default</ShadcnAlertTitle>
            <ShadcnAlertDescription>This is a default alert message.</ShadcnAlertDescription>
          </ShadcnAlert>
          <ShadcnAlert variant="destructive">
            <ShadcnAlertTitle>Destructive</ShadcnAlertTitle>
            <ShadcnAlertDescription>Something went wrong. Please try again.</ShadcnAlertDescription>
          </ShadcnAlert>
        </div>
      ),
    },
  },
};

export const Playground: Story = {
  args: { variant: "default" },
  render: (args: AlertProps) => (
    <Alert {...args}>
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>Alert description goes here.</AlertDescription>
    </Alert>
  ),
  parameters: {
    shadcn: {
      render: (args: Record<string, unknown>) => (
        <ShadcnAlert variant={args["variant"] as "default" | "destructive"}>
          <ShadcnAlertTitle>Alert title</ShadcnAlertTitle>
          <ShadcnAlertDescription>Alert description goes here.</ShadcnAlertDescription>
        </ShadcnAlert>
      ),
    },
  },
};
