import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./command";

describe("Command", () => {
  it("renders root with scope class", async () => {
    await render(<Command data-testid="cmd" />);
    expect(document.querySelector("[data-testid='cmd']")?.className).toBe(
      "sct-command",
    );
  });

  it("CommandInput renders an input", async () => {
    const screen = await render(
      <Command>
        <CommandInput placeholder="Search…" />
      </Command>,
    );
    await expect
      .element(screen.getByPlaceholder("Search…"))
      .toBeInTheDocument();
  });

  it("CommandList renders with listbox role", async () => {
    await render(
      <Command>
        <CommandList data-testid="list" />
      </Command>,
    );
    expect(
      document.querySelector("[data-testid='list']")?.getAttribute("role"),
    ).toBe("listbox");
  });

  it("CommandItem renders with option role", async () => {
    const screen = await render(
      <Command>
        <CommandList>
          <CommandItem value="copy">Copy</CommandItem>
        </CommandList>
      </Command>,
    );
    await expect
      .element(screen.getByRole("option", { name: "Copy" }))
      .toBeInTheDocument();
  });

  it("CommandItem is hidden when search does not match its value", async () => {
    const screen = await render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem value="copy">Copy</CommandItem>
          <CommandItem value="paste">Paste</CommandItem>
        </CommandList>
      </Command>,
    );
    const input = screen.getByPlaceholder("Search");
    await input.fill("copy");
    // 'paste' item should no longer be in the DOM
    const pasteEl = document.querySelector("[data-value='paste']");
    expect(pasteEl).toBeNull();
  });

  it("CommandItem is visible when search matches its value", async () => {
    const screen = await render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem value="copy">Copy</CommandItem>
        </CommandList>
      </Command>,
    );
    const input = screen.getByPlaceholder("Search");
    await input.fill("cop");
    const copyEl = document.querySelector("[data-value='copy']");
    expect(copyEl).not.toBeNull();
  });

  it("CommandGroup renders heading", async () => {
    const screen = await render(
      <Command>
        <CommandList>
          <CommandGroup heading="Actions">
            <CommandItem value="cut">Cut</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    await expect.element(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("CommandShortcut renders with slot", async () => {
    await render(
      <Command>
        <CommandList>
          <CommandItem value="x">
            <span>Cut</span>
            <CommandShortcut data-testid="sc">⌘X</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>,
    );
    expect(
      document.querySelector("[data-testid='sc']")?.getAttribute("data-slot"),
    ).toBe("command-shortcut");
  });
});
