import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { ScrollArea, ScrollBar } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <ScrollArea data-testid="scroll">
        <div>Content</div>
      </ScrollArea>,
    );
    await expect.element(screen.getByTestId("scroll")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <ScrollArea data-testid="scroll">
        <div>Content</div>
      </ScrollArea>,
    );
    await expect
      .element(screen.getByTestId("scroll"))
      .toHaveAttribute("data-slot", "scroll-area");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <ScrollArea data-testid="scroll" className="my-class">
        <div>Content</div>
      </ScrollArea>,
    );
    await expect
      .element(screen.getByTestId("scroll"))
      .toHaveClass("sct-scroll-area my-class");
  });
});

describe("ScrollBar", () => {
  it("renders without crashing", async () => {
    const screen = await render(<ScrollBar data-testid="bar" />);
    await expect.element(screen.getByTestId("bar")).toBeInTheDocument();
  });

  it("defaults to vertical orientation", async () => {
    const screen = await render(<ScrollBar data-testid="bar" />);
    await expect
      .element(screen.getByTestId("bar"))
      .toHaveAttribute("data-orientation", "vertical");
  });

  it("supports horizontal orientation", async () => {
    const screen = await render(
      <ScrollBar data-testid="bar" orientation="horizontal" />,
    );
    await expect
      .element(screen.getByTestId("bar"))
      .toHaveAttribute("data-orientation", "horizontal");
  });
});
