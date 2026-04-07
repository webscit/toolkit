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
};
