import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "./popover";

describe("Popover", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Open" }))
      .toBeInTheDocument();
  });

  it("sets data-slot on trigger", async () => {
    const screen = await render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Open" }))
      .toHaveAttribute("data-slot", "popover-trigger");
  });

  it("opens popover on trigger click", async () => {
    const screen = await render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <p>Popover body</p>
        </PopoverContent>
      </Popover>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await expect.element(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("renders close button inside content", async () => {
    const screen = await render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Close" }))
      .toBeInTheDocument();
  });
});
