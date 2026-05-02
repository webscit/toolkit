import type { Meta, StoryObj } from "@storybook/react";
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
} from "@webscit/registry";
import {
  DropdownMenu as ShadcnMenu,
  DropdownMenuTrigger as ShadcnMenuTrigger,
  DropdownMenuContent as ShadcnMenuContent,
  DropdownMenuItem as ShadcnMenuItem,
  DropdownMenuSeparator as ShadcnMenuSeparator,
  DropdownMenuLabel as ShadcnMenuLabel,
  DropdownMenuCheckboxItem as ShadcnMenuCheckboxItem,
  DropdownMenuRadioGroup as ShadcnMenuRadioGroup,
  DropdownMenuRadioItem as ShadcnMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button as ShadcnButton } from "@/components/ui/button";

const meta = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>Open Menu</MenuTrigger>
      <MenuContent>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuSeparator />
        <MenuItem>Logout</MenuItem>
      </MenuContent>
    </Menu>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnMenu>
          <ShadcnMenuTrigger>
            <ShadcnButton variant="outline">Open Menu</ShadcnButton>
          </ShadcnMenuTrigger>
          <ShadcnMenuContent>
            <ShadcnMenuItem>Profile</ShadcnMenuItem>
            <ShadcnMenuItem>Settings</ShadcnMenuItem>
            <ShadcnMenuSeparator />
            <ShadcnMenuItem>Logout</ShadcnMenuItem>
          </ShadcnMenuContent>
        </ShadcnMenu>
      ),
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>My Account</MenuTrigger>
      <MenuContent>
        <MenuLabel>My Account</MenuLabel>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Billing</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuSeparator />
        <MenuItem>Logout</MenuItem>
      </MenuContent>
    </Menu>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnMenu>
          <ShadcnMenuTrigger>
            <ShadcnButton variant="outline">My Account</ShadcnButton>
          </ShadcnMenuTrigger>
          <ShadcnMenuContent>
            <ShadcnMenuLabel>My Account</ShadcnMenuLabel>
            <ShadcnMenuItem>Profile</ShadcnMenuItem>
            <ShadcnMenuItem>Billing</ShadcnMenuItem>
            <ShadcnMenuItem>Settings</ShadcnMenuItem>
            <ShadcnMenuSeparator />
            <ShadcnMenuItem>Logout</ShadcnMenuItem>
          </ShadcnMenuContent>
        </ShadcnMenu>
      ),
    },
  },
};

export const WithCheckboxItems: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>View</MenuTrigger>
      <MenuContent>
        <MenuLabel>Panels</MenuLabel>
        <MenuCheckboxItem defaultChecked>Status Bar</MenuCheckboxItem>
        <MenuCheckboxItem>Activity Bar</MenuCheckboxItem>
        <MenuCheckboxItem defaultChecked>Panel</MenuCheckboxItem>
      </MenuContent>
    </Menu>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnMenu>
          <ShadcnMenuTrigger>
            <ShadcnButton variant="outline">View</ShadcnButton>
          </ShadcnMenuTrigger>
          <ShadcnMenuContent>
            <ShadcnMenuLabel>Panels</ShadcnMenuLabel>
            <ShadcnMenuCheckboxItem checked>Status Bar</ShadcnMenuCheckboxItem>
            <ShadcnMenuCheckboxItem>Activity Bar</ShadcnMenuCheckboxItem>
            <ShadcnMenuCheckboxItem checked>Panel</ShadcnMenuCheckboxItem>
          </ShadcnMenuContent>
        </ShadcnMenu>
      ),
    },
  },
};

export const WithRadioItems: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>Position</MenuTrigger>
      <MenuContent>
        <MenuLabel>Panel Position</MenuLabel>
        <MenuRadioGroup defaultValue="bottom">
          <MenuRadioItem value="top">Top</MenuRadioItem>
          <MenuRadioItem value="bottom">Bottom</MenuRadioItem>
          <MenuRadioItem value="right">Right</MenuRadioItem>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnMenu>
          <ShadcnMenuTrigger>
            <ShadcnButton variant="outline">Position</ShadcnButton>
          </ShadcnMenuTrigger>
          <ShadcnMenuContent>
            <ShadcnMenuLabel>Panel Position</ShadcnMenuLabel>
            <ShadcnMenuRadioGroup value="bottom">
              <ShadcnMenuRadioItem value="top">Top</ShadcnMenuRadioItem>
              <ShadcnMenuRadioItem value="bottom">Bottom</ShadcnMenuRadioItem>
              <ShadcnMenuRadioItem value="right">Right</ShadcnMenuRadioItem>
            </ShadcnMenuRadioGroup>
          </ShadcnMenuContent>
        </ShadcnMenu>
      ),
    },
  },
};
