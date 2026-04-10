import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Skeleton data-testid="skel" />);
    await expect.element(screen.getByTestId("skel")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(<Skeleton data-testid="skel" />);
    await expect
      .element(screen.getByTestId("skel"))
      .toHaveAttribute("data-slot", "skeleton");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <Skeleton data-testid="skel" className="my-class" />,
    );
    await expect
      .element(screen.getByTestId("skel"))
      .toHaveClass("sct-skeleton my-class");
  });
});
