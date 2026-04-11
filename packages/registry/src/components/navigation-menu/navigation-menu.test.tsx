import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./navigation-menu";

describe("NavigationMenu", () => {
  it("renders root with navigation role", async () => {
    const screen = await render(
      <NavigationMenu>
        <NavigationMenuList />
      </NavigationMenu>
    );
    await expect.element(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders root with scope class", async () => {
    const screen = await render(
      <NavigationMenu>
        <NavigationMenuList />
      </NavigationMenu>
    );
    await expect.element(screen.getByRole("navigation")).toHaveClass("sct-navigation-menu");
  });

  it("forwards className on root", async () => {
    const screen = await render(
      <NavigationMenu className="custom">
        <NavigationMenuList />
      </NavigationMenu>
    );
    await expect.element(screen.getByRole("navigation")).toHaveClass("sct-navigation-menu custom");
  });

  it("renders a NavigationMenuLink as an anchor", async () => {
    const screen = await render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    await expect.element(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
  });

  it("renders NavigationMenuTrigger as a button", async () => {
    const screen = await render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent><p>Content</p></NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    await expect.element(screen.getByRole("button", { name: /products/i })).toBeInTheDocument();
  });
});
