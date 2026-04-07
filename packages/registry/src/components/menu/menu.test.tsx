import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "./menu";

describe("Menu", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <Menu>
        <MenuTrigger>Open Menu</MenuTrigger>
        <MenuContent>
          <MenuItem>Item 1</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await expect.element(screen.getByText("Open Menu")).toBeInTheDocument();
  });

  it("trigger has correct aria attributes", async () => {
    const screen = await render(
      <Menu>
        <MenuTrigger>Open Menu</MenuTrigger>
        <MenuContent>
          <MenuItem>Item 1</MenuItem>
        </MenuContent>
      </Menu>,
    );
    const trigger = screen.getByText("Open Menu");
    await expect.element(trigger).toHaveAttribute("aria-haspopup", "menu");
    await expect.element(trigger).toHaveAttribute("data-slot", "menu-trigger");
  });

  it("menu opens on click and shows items", async () => {
    const screen = await render(
      <Menu>
        <MenuTrigger>Open Menu</MenuTrigger>
        <MenuContent>
          <MenuItem>Item 1</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await screen.getByText("Open Menu").click();

    await expect.element(screen.getByRole("menu")).toBeInTheDocument();
  });
});
