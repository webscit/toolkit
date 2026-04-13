import type { Meta, StoryObj } from "@storybook/react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  useToastManager,
  Button,
} from "@webscit/registry";

const meta: Meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const toastManager = useToastManager();
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            title: "Default toast",
            description: "This is a default notification.",
          })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            title: "Success!",
            description: "Operation completed.",
            type: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            title: "Warning",
            description: "Please check your input.",
            type: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            title: "Info",
            description: "New updates available.",
            type: "info",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toastManager.add({
            title: "Error",
            description: "Something went wrong.",
            type: "destructive",
          })
        }
      >
        Destructive
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};
