import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Button,
} from "@webscit/registry";
import {
  Dialog as ShadcnDialog,
  DialogTrigger as ShadcnDialogTrigger,
  DialogContent as ShadcnDialogContent,
  DialogHeader as ShadcnDialogHeader,
  DialogFooter as ShadcnDialogFooter,
  DialogTitle as ShadcnDialogTitle,
  DialogDescription as ShadcnDialogDescription,
  DialogClose as ShadcnDialogClose,
} from "@/components/ui/dialog";
import { Button as ShadcnButton } from "@/components/ui/button";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnDialog>
          <ShadcnDialogTrigger>
            <ShadcnButton variant="outline">Open Dialog</ShadcnButton>
          </ShadcnDialogTrigger>
          <ShadcnDialogContent>
            <ShadcnDialogHeader>
              <ShadcnDialogTitle>Are you sure?</ShadcnDialogTitle>
              <ShadcnDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </ShadcnDialogDescription>
            </ShadcnDialogHeader>
            <ShadcnDialogFooter>
              <ShadcnDialogClose>
                <ShadcnButton variant="outline">Cancel</ShadcnButton>
              </ShadcnDialogClose>
              <ShadcnButton variant="destructive">Delete Account</ShadcnButton>
            </ShadcnDialogFooter>
          </ShadcnDialogContent>
        </ShadcnDialog>
      ),
    },
  },
};

export const Playground: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description here.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnDialog>
          <ShadcnDialogTrigger>
            <ShadcnButton variant="outline">Open</ShadcnButton>
          </ShadcnDialogTrigger>
          <ShadcnDialogContent>
            <ShadcnDialogHeader>
              <ShadcnDialogTitle>Dialog Title</ShadcnDialogTitle>
              <ShadcnDialogDescription>
                Dialog description here.
              </ShadcnDialogDescription>
            </ShadcnDialogHeader>
            <ShadcnDialogFooter>
              <ShadcnDialogClose>
                <ShadcnButton variant="outline">Close</ShadcnButton>
              </ShadcnDialogClose>
            </ShadcnDialogFooter>
          </ShadcnDialogContent>
        </ShadcnDialog>
      ),
    },
  },
};
