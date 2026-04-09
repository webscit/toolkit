import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { InputGroup, InputGroupAddon } from "./input-group";

describe("InputGroup", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <InputGroup data-testid="ig">
        <input />
      </InputGroup>,
    );
    await expect.element(screen.getByTestId("ig")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <InputGroup data-testid="ig">
        <input />
      </InputGroup>,
    );
    await expect
      .element(screen.getByTestId("ig"))
      .toHaveAttribute("data-slot", "input-group");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <InputGroup data-testid="ig" className="my-class">
        <input />
      </InputGroup>,
    );
    await expect
      .element(screen.getByTestId("ig"))
      .toHaveClass("sct-input-group my-class");
  });
});

describe("InputGroupAddon", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <InputGroupAddon data-testid="addon">$</InputGroupAddon>,
    );
    await expect.element(screen.getByTestId("addon")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <InputGroupAddon data-testid="addon">$</InputGroupAddon>,
    );
    await expect
      .element(screen.getByTestId("addon"))
      .toHaveAttribute("data-slot", "input-group-addon");
  });
});
