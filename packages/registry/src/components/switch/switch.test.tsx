import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Switch />);
    await expect.element(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(<Switch className="my-class" />);
    await expect
      .element(screen.getByRole("switch"))
      .toHaveClass("sct-switch my-class");
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(<Switch />);
    await expect
      .element(screen.getByRole("switch"))
      .toHaveAttribute("data-slot", "switch");
  });

  it("can be toggled", async () => {
    const screen = await render(<Switch />);
    const sw = screen.getByRole("switch");
    await sw.click();
    await expect.element(sw).toHaveAttribute("data-checked");
  });

  it("disabled state applies data-disabled", async () => {
    const screen = await render(<Switch disabled />);
    await expect
      .element(screen.getByRole("switch"))
      .toHaveAttribute("data-disabled");
  });
});
