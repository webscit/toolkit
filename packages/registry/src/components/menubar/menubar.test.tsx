import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger
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
    await expect
      .element(screen.getByRole("button", { name: "File" }))
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
    await render(
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
    expect(
      document.querySelector("[data-testid='sc']")?.getAttribute("data-slot"),
    ).toBe("menubar-shortcut");
  });
});
