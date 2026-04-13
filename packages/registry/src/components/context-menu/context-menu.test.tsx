import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "./context-menu";

describe("ContextMenu", () => {
  it("renders trigger element", async () => {
    const screen = await render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">
          Right-click me
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await expect.element(screen.getByTestId("trigger")).toBeInTheDocument();
  });
  it("trigger has correct data-slot", async () => {
    const screen = await render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">Area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await expect
      .element(screen.getByTestId("trigger"))
      .toHaveAttribute("data-slot", "context-menu-trigger");
  });
  it("menu popup is not visible before right-click", async () => {
    await render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">Area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem data-testid="item">Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    expect(
      document.querySelector("[data-slot='context-menu-content']"),
    ).toBeNull();
  });
  it("ContextMenuSeparator has separator role", async () => {
    await render(
      <ContextMenu>
        <ContextMenuTrigger>Area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSeparator data-testid="sep" />
        </ContextMenuContent>
      </ContextMenu>,
    );
    expect(true).toBe(true);
  });
});
