import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
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
} from "./sidebar";

describe("SidebarProvider", () => {
  it("renders children", async () => {
    const screen = await render(
      <SidebarProvider>
        <div data-testid="child">Hello</div>
      </SidebarProvider>,
    );
    await expect.element(screen.getByTestId("child")).toBeInTheDocument();
  });
});

describe("Sidebar", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar collapsible="none" data-testid="sidebar">
          <SidebarContent>Nav content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect.element(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar collapsible="none" data-testid="sidebar">
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect
      .element(screen.getByTestId("sidebar"))
      .toHaveAttribute("data-slot", "sidebar");
  });

  it("defaults to left side", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar collapsible="none" data-testid="sidebar">
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect
      .element(screen.getByTestId("sidebar"))
      .toHaveAttribute("data-side", "left");
  });
});

describe("SidebarTrigger", () => {
  it("renders a button", async () => {
    const screen = await render(
      <SidebarProvider defaultOpen={false}>
        <SidebarTrigger>Toggle</SidebarTrigger>
        <Sidebar collapsible="none">
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Toggle" }))
      .toBeInTheDocument();
  });
});

describe("Sidebar sections", () => {
  it("renders header, content, footer", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader data-testid="header">Header</SidebarHeader>
          <SidebarContent data-testid="content">Content</SidebarContent>
          <SidebarFooter data-testid="footer">Footer</SidebarFooter>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect.element(screen.getByTestId("header")).toBeInTheDocument();
    await expect.element(screen.getByTestId("content")).toBeInTheDocument();
    await expect.element(screen.getByTestId("footer")).toBeInTheDocument();
  });
});

describe("SidebarMenu", () => {
  it("renders menu items", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
      </SidebarProvider>,
    );
    await expect.element(screen.getByText("Home")).toBeInTheDocument();
    await expect.element(screen.getByText("Navigation")).toBeInTheDocument();
  });
});

describe("SidebarInset", () => {
  it("renders with data-slot", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
        <SidebarInset data-testid="inset">Main content</SidebarInset>
      </SidebarProvider>,
    );
    await expect
      .element(screen.getByTestId("inset"))
      .toHaveAttribute("data-slot", "sidebar-inset");
  });
});

describe("SidebarSeparator", () => {
  it("renders separator", async () => {
    const screen = await render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarSeparator />
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    await expect.element(screen.getByRole("separator")).toBeInTheDocument();
  });
});
