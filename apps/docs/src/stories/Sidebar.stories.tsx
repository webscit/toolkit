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
import {
  SidebarProvider as ShadcnSidebarProvider,
  Sidebar as ShadcnSidebar,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarContent as ShadcnSidebarContent,
  SidebarFooter as ShadcnSidebarFooter,
  SidebarTrigger as ShadcnSidebarTrigger,
  SidebarGroup as ShadcnSidebarGroup,
  SidebarGroupLabel as ShadcnSidebarGroupLabel,
  SidebarGroupContent as ShadcnSidebarGroupContent,
  SidebarMenu as ShadcnSidebarMenu,
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarMenuButton as ShadcnSidebarMenuButton,
  SidebarInset as ShadcnSidebarInset,
} from "@/components/ui/sidebar";

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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSidebarProvider>
          <ShadcnSidebar side="right">
            <ShadcnSidebarHeader>
              <h3 style={{ fontSize: "14px", fontWeight: 600 }}>My App</h3>
            </ShadcnSidebarHeader>
            <ShadcnSidebarContent>
              <ShadcnSidebarGroup>
                <ShadcnSidebarGroupLabel>Navigation</ShadcnSidebarGroupLabel>
                <ShadcnSidebarGroupContent>
                  <ShadcnSidebarMenu>
                    <ShadcnSidebarMenuItem>
                      <ShadcnSidebarMenuButton isActive>
                        Home
                      </ShadcnSidebarMenuButton>
                    </ShadcnSidebarMenuItem>
                    <ShadcnSidebarMenuItem>
                      <ShadcnSidebarMenuButton>
                        Dashboard
                      </ShadcnSidebarMenuButton>
                    </ShadcnSidebarMenuItem>
                    <ShadcnSidebarMenuItem>
                      <ShadcnSidebarMenuButton>
                        Settings
                      </ShadcnSidebarMenuButton>
                    </ShadcnSidebarMenuItem>
                  </ShadcnSidebarMenu>
                </ShadcnSidebarGroupContent>
              </ShadcnSidebarGroup>
              <ShadcnSidebarGroup>
                <ShadcnSidebarGroupLabel>Projects</ShadcnSidebarGroupLabel>
                <ShadcnSidebarGroupContent>
                  <ShadcnSidebarMenu>
                    <ShadcnSidebarMenuItem>
                      <ShadcnSidebarMenuButton>
                        Project Alpha
                      </ShadcnSidebarMenuButton>
                    </ShadcnSidebarMenuItem>
                    <ShadcnSidebarMenuItem>
                      <ShadcnSidebarMenuButton>
                        Project Beta
                      </ShadcnSidebarMenuButton>
                    </ShadcnSidebarMenuItem>
                  </ShadcnSidebarMenu>
                </ShadcnSidebarGroupContent>
              </ShadcnSidebarGroup>
            </ShadcnSidebarContent>
            <ShadcnSidebarFooter>
              <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                v1.0.0
              </p>
            </ShadcnSidebarFooter>
          </ShadcnSidebar>
          <ShadcnSidebarInset>
            <div style={{ padding: "16px" }}>
              <ShadcnSidebarTrigger />
              <h2 style={{ marginTop: "16px" }}>Main Content</h2>
              <p>This is the main content area next to the sidebar.</p>
            </div>
          </ShadcnSidebarInset>
        </ShadcnSidebarProvider>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSidebarProvider defaultOpen={false}>
          <ShadcnSidebar side="right">
            <ShadcnSidebarContent>
              <ShadcnSidebarGroup>
                <ShadcnSidebarGroupContent>
                  <ShadcnSidebarMenu>
                    <ShadcnSidebarMenuItem>
                      <ShadcnSidebarMenuButton>Home</ShadcnSidebarMenuButton>
                    </ShadcnSidebarMenuItem>
                  </ShadcnSidebarMenu>
                </ShadcnSidebarGroupContent>
              </ShadcnSidebarGroup>
            </ShadcnSidebarContent>
          </ShadcnSidebar>
          <ShadcnSidebarInset>
            <div style={{ padding: "16px" }}>
              <ShadcnSidebarTrigger />
              <p>Sidebar starts collapsed.</p>
            </div>
          </ShadcnSidebarInset>
        </ShadcnSidebarProvider>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSidebarProvider>
          <ShadcnSidebarInset>
            <div style={{ padding: "16px" }}>
              <ShadcnSidebarTrigger />
              <h2>Main Content</h2>
            </div>
          </ShadcnSidebarInset>
          <ShadcnSidebar side="left">
            <ShadcnSidebarContent>
              <ShadcnSidebarGroup>
                <ShadcnSidebarGroupLabel>Details</ShadcnSidebarGroupLabel>
                <ShadcnSidebarGroupContent>
                  <ShadcnSidebarMenu>
                    <ShadcnSidebarMenuItem>
                      <ShadcnSidebarMenuButton>
                        Properties
                      </ShadcnSidebarMenuButton>
                    </ShadcnSidebarMenuItem>
                    <ShadcnSidebarMenuItem>
                      <ShadcnSidebarMenuButton>History</ShadcnSidebarMenuButton>
                    </ShadcnSidebarMenuItem>
                  </ShadcnSidebarMenu>
                </ShadcnSidebarGroupContent>
              </ShadcnSidebarGroup>
            </ShadcnSidebarContent>
          </ShadcnSidebar>
        </ShadcnSidebarProvider>
      ),
    },
  },
};
