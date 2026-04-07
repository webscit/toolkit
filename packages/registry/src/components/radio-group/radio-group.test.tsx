import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { RadioGroup } from "./radio-group";

describe("RadioGroup", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <RadioGroup aria-label="Options">children</RadioGroup>,
    );
    await expect.element(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <RadioGroup aria-label="Options" className="my-class">
        children
      </RadioGroup>,
    );
    await expect
      .element(screen.getByRole("radiogroup"))
      .toHaveClass("sct-radio-group my-class");
  });

  it("sets data-orientation attribute", async () => {
    const screen = await render(
      <RadioGroup aria-label="Options" orientation="horizontal">
        children
      </RadioGroup>,
    );
    await expect
      .element(screen.getByRole("radiogroup"))
      .toHaveAttribute("data-orientation", "horizontal");
  });

  it("defaults to vertical orientation", async () => {
    const screen = await render(
      <RadioGroup aria-label="Options">children</RadioGroup>,
    );
    await expect
      .element(screen.getByRole("radiogroup"))
      .toHaveAttribute("data-orientation", "vertical");
  });
});
