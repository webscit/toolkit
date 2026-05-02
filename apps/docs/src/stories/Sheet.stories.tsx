import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  Button,
} from "@webscit/registry";
import {
  Sheet as ShadcnSheet,
  SheetTrigger as ShadcnSheetTrigger,
  SheetContent as ShadcnSheetContent,
  SheetHeader as ShadcnSheetHeader,
  SheetFooter as ShadcnSheetFooter,
  SheetTitle as ShadcnSheetTitle,
  SheetDescription as ShadcnSheetDescription,
  SheetClose as ShadcnSheetClose,
} from "@/components/ui/sheet";
import { Button as ShadcnButton } from "@/components/ui/button";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <div style={{ padding: "16px 0" }}>
          <p>Sheet content goes here.</p>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSheet>
          <ShadcnSheetTrigger>
            <ShadcnButton variant="outline">Open Sheet</ShadcnButton>
          </ShadcnSheetTrigger>
          <ShadcnSheetContent>
            <ShadcnSheetHeader>
              <ShadcnSheetTitle>Edit Profile</ShadcnSheetTitle>
              <ShadcnSheetDescription>
                Make changes to your profile here.
              </ShadcnSheetDescription>
            </ShadcnSheetHeader>
            <div style={{ padding: "16px 0" }}>
              <p>Sheet content goes here.</p>
            </div>
            <ShadcnSheetFooter>
              <ShadcnSheetClose>
                <ShadcnButton variant="outline">Cancel</ShadcnButton>
              </ShadcnSheetClose>
              <ShadcnButton>Save changes</ShadcnButton>
            </ShadcnSheetFooter>
          </ShadcnSheetContent>
        </ShadcnSheet>
      ),
    },
  },
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Sheet</SheetTitle>
        </SheetHeader>
        <p>This sheet slides from the left.</p>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSheet>
          <ShadcnSheetTrigger>
            <ShadcnButton variant="outline">Open Left</ShadcnButton>
          </ShadcnSheetTrigger>
          <ShadcnSheetContent side="left">
            <ShadcnSheetHeader>
              <ShadcnSheetTitle>Left Sheet</ShadcnSheetTitle>
            </ShadcnSheetHeader>
            <p>This sheet slides from the left.</p>
          </ShadcnSheetContent>
        </ShadcnSheet>
      ),
    },
  },
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top Sheet</SheetTitle>
        </SheetHeader>
        <p>This sheet slides from the top.</p>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSheet>
          <ShadcnSheetTrigger>
            <ShadcnButton variant="outline">Open Top</ShadcnButton>
          </ShadcnSheetTrigger>
          <ShadcnSheetContent side="top">
            <ShadcnSheetHeader>
              <ShadcnSheetTitle>Top Sheet</ShadcnSheetTitle>
            </ShadcnSheetHeader>
            <p>This sheet slides from the top.</p>
          </ShadcnSheetContent>
        </ShadcnSheet>
      ),
    },
  },
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Sheet</SheetTitle>
        </SheetHeader>
        <p>This sheet slides from the bottom.</p>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSheet>
          <ShadcnSheetTrigger>
            <ShadcnButton variant="outline">Open Bottom</ShadcnButton>
          </ShadcnSheetTrigger>
          <ShadcnSheetContent side="bottom">
            <ShadcnSheetHeader>
              <ShadcnSheetTitle>Bottom Sheet</ShadcnSheetTitle>
            </ShadcnSheetHeader>
            <p>This sheet slides from the bottom.</p>
          </ShadcnSheetContent>
        </ShadcnSheet>
      ),
    },
  },
};
