import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { ButtonGroup } from "./button-group";

describe("ButtonGroup", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <ButtonGroup>
        <button>A</button>
        <button>B</button>
      </ButtonGroup>,
    );
    await expect.element(screen.getByRole("group")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <ButtonGroup>
        <button>A</button>
      </ButtonGroup>,
    );
    await expect
      .element(screen.getByRole("group"))
      .toHaveAttribute("data-slot", "button-group");
  });

  it("defaults to horizontal orientation", async () => {
    const screen = await render(
      <ButtonGroup>
        <button>A</button>
      </ButtonGroup>,
    );
    await expect
      .element(screen.getByRole("group"))
      .toHaveAttribute("data-orientation", "horizontal");
  });

  it("supports vertical orientation", async () => {
    const screen = await render(
      <ButtonGroup orientation="vertical">
        <button>A</button>
      </ButtonGroup>,
    );
    await expect
      .element(screen.getByRole("group"))
      .toHaveAttribute("data-orientation", "vertical");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <ButtonGroup className="my-class">
        <button>A</button>
      </ButtonGroup>,
    );
    await expect
      .element(screen.getByRole("group"))
      .toHaveClass("sct-button-group my-class");
  });
});
