import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@webscit/registry';
import type { TabsProps } from '@webscit/registry';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" style={{ width: '400px' }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p style={{ paddingBlock: '8px' }}>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p style={{ paddingBlock: '8px' }}>Change your password here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p style={{ paddingBlock: '8px' }}>Edit your settings here.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">Active</TabsTrigger>
        <TabsTrigger value="b">Also Active</TabsTrigger>
        <TabsTrigger value="c" disabled>Disabled</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Content A</TabsContent>
      <TabsContent value="b">Content B</TabsContent>
      <TabsContent value="c">Content C</TabsContent>
    </Tabs>
  ),
};

export const Playground: Story = {
  args: { defaultValue: 'tab1' },
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
};
