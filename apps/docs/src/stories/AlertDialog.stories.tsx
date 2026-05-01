import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from "@webscit/registry";
import {
  AlertDialog as ShadcnAlertDialog,
  AlertDialogTrigger as ShadcnAlertDialogTrigger,
  AlertDialogContent as ShadcnAlertDialogContent,
  AlertDialogHeader as ShadcnAlertDialogHeader,
  AlertDialogFooter as ShadcnAlertDialogFooter,
  AlertDialogTitle as ShadcnAlertDialogTitle,
  AlertDialogDescription as ShadcnAlertDialogDescription,
  AlertDialogAction as ShadcnAlertDialogAction,
  AlertDialogCancel as ShadcnAlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button as ShadcnButton } from "@/components/ui/button";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button variant="destructive">Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnAlertDialog>
          <ShadcnAlertDialogTrigger asChild>
            <ShadcnButton variant="destructive">Delete Account</ShadcnButton>
          </ShadcnAlertDialogTrigger>
          <ShadcnAlertDialogContent>
            <ShadcnAlertDialogHeader>
              <ShadcnAlertDialogTitle>
                Are you absolutely sure?
              </ShadcnAlertDialogTitle>
              <ShadcnAlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </ShadcnAlertDialogDescription>
            </ShadcnAlertDialogHeader>
            <ShadcnAlertDialogFooter>
              <ShadcnAlertDialogCancel>Cancel</ShadcnAlertDialogCancel>
              <ShadcnAlertDialogAction>Continue</ShadcnAlertDialogAction>
            </ShadcnAlertDialogFooter>
          </ShadcnAlertDialogContent>
        </ShadcnAlertDialog>
      ),
    },
  },
};
