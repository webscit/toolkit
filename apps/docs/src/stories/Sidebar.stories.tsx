import type { Meta, StoryObj } from "@storybook/react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInset,
} from "@webscit/registry";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "500px", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h3 style={{ fontSize: "14px", fontWeight: 600 }}>My App</h3>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Home</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Dashboard</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Settings</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Project Alpha</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Project Beta</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p
            style={{
              fontSize: "12px",
              color: "var(--sct-color-muted-foreground)",
            }}
          >
            v1.0.0
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div style={{ padding: "16px" }}>
          <SidebarTrigger>Toggle</SidebarTrigger>
          <h2 style={{ marginTop: "16px" }}>Main Content</h2>
          <p>This is the main content area next to the sidebar.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const CollapsedByDefault: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Home</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div style={{ padding: "16px" }}>
          <SidebarTrigger>Open</SidebarTrigger>
          <p>Sidebar starts collapsed.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const RightSide: Story = {
  render: () => (
    <SidebarProvider>
      <SidebarInset>
        <div style={{ padding: "16px" }}>
          <SidebarTrigger>Toggle</SidebarTrigger>
          <h2>Main Content</h2>
        </div>
      </SidebarInset>
      <Sidebar side="right">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Details</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Properties</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>History</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};
