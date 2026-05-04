import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import "@webscit/tokens/tokens.css";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Checkbox />);
    await expect.element(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(<Checkbox className="my-class" />);
    await expect
      .element(screen.getByRole("checkbox"))
      .toHaveClass("sct-checkbox my-class");
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(<Checkbox />);
    await expect
      .element(screen.getByRole("checkbox"))
      .toHaveAttribute("data-slot", "checkbox");
  });

  it("can be checked", async () => {
    const screen = await render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    await checkbox.click();
    await expect.element(checkbox).toHaveAttribute("data-checked");
  });

  it("disabled state applies data-disabled", async () => {
    const screen = await render(<Checkbox disabled />);
    await expect
      .element(screen.getByRole("checkbox"))
      .toHaveAttribute("data-disabled");
  });
});
