import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "./menubar";

describe("Menubar", () => {
  it("renders root with scope class", async () => {
    await render(
      <Menubar data-testid="mb">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
    expect(document.querySelector("[data-testid='mb']")?.className).toBe(
      "sct-menubar",
    );
  });
  it("forwards className on root", async () => {
    await render(
      <Menubar className="custom" data-testid="mb">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
    expect(document.querySelector("[data-testid='mb']")?.className).toBe(
      "sct-menubar custom",
    );
  });
  it("renders MenubarTrigger as a button", async () => {
    const screen = await render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
    // Base UI renders the trigger with role="menuitem" inside a menubar context
    await expect
      .element(screen.getByRole("menuitem", { name: "File" }))
      .toBeInTheDocument();
  });
  it("popup is closed before trigger click", async () => {
    await render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem data-testid="item">Copy</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
    expect(document.querySelector("[data-slot='menubar-content']")).toBeNull();
  });
  it("MenubarShortcut renders with correct slot", async () => {
    const screen = await render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>F</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <MenubarShortcut data-testid="sc">⌘N</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
    // MenubarContent is in a Portal — open the menu first so the shortcut renders
    await userEvent.click(screen.getByRole("menuitem", { name: "F" }));
    await expect
      .element(screen.getByTestId("sc"))
      .toHaveAttribute("data-slot", "menubar-shortcut");
  });
});
