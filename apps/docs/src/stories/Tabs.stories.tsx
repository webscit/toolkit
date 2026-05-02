import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@webscit/registry";
import type { TabsProps } from "@webscit/registry";
import {
  Tabs as ShadcnTabs,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
  TabsContent as ShadcnTabsContent,
} from "@/components/ui/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" style={{ width: "400px" }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p style={{ paddingBlock: "8px" }}>
          Make changes to your account here.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p style={{ paddingBlock: "8px" }}>Change your password here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p style={{ paddingBlock: "8px" }}>Edit your settings here.</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnTabs defaultValue="account" style={{ width: "400px" }}>
          <ShadcnTabsList>
            <ShadcnTabsTrigger value="account">Account</ShadcnTabsTrigger>
            <ShadcnTabsTrigger value="password">Password</ShadcnTabsTrigger>
            <ShadcnTabsTrigger value="settings">Settings</ShadcnTabsTrigger>
          </ShadcnTabsList>
          <ShadcnTabsContent value="account">
            <p style={{ paddingBlock: "8px" }}>
              Make changes to your account here.
            </p>
          </ShadcnTabsContent>
          <ShadcnTabsContent value="password">
            <p style={{ paddingBlock: "8px" }}>Change your password here.</p>
          </ShadcnTabsContent>
          <ShadcnTabsContent value="settings">
            <p style={{ paddingBlock: "8px" }}>Edit your settings here.</p>
          </ShadcnTabsContent>
        </ShadcnTabs>
      ),
    },
  },
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">Active</TabsTrigger>
        <TabsTrigger value="b">Also Active</TabsTrigger>
        <TabsTrigger value="c" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="a">Content A</TabsContent>
      <TabsContent value="b">Content B</TabsContent>
      <TabsContent value="c">Content C</TabsContent>
    </Tabs>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnTabs defaultValue="a">
          <ShadcnTabsList>
            <ShadcnTabsTrigger value="a">Active</ShadcnTabsTrigger>
            <ShadcnTabsTrigger value="b">Also Active</ShadcnTabsTrigger>
            <ShadcnTabsTrigger value="c" disabled>
              Disabled
            </ShadcnTabsTrigger>
          </ShadcnTabsList>
          <ShadcnTabsContent value="a">Content A</ShadcnTabsContent>
          <ShadcnTabsContent value="b">Content B</ShadcnTabsContent>
          <ShadcnTabsContent value="c">Content C</ShadcnTabsContent>
        </ShadcnTabs>
      ),
    },
  },
};

export const Playground: Story = {
  args: { defaultValue: "tab1" },
  render: (args: TabsProps) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
    </Tabs>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnTabs defaultValue="tab1">
          <ShadcnTabsList>
            <ShadcnTabsTrigger value="tab1">Tab 1</ShadcnTabsTrigger>
            <ShadcnTabsTrigger value="tab2">Tab 2</ShadcnTabsTrigger>
          </ShadcnTabsList>
          <ShadcnTabsContent value="tab1">Content for Tab 1</ShadcnTabsContent>
          <ShadcnTabsContent value="tab2">Content for Tab 2</ShadcnTabsContent>
        </ShadcnTabs>
      ),
    },
  },
};
