import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Progress } from "./progress";

describe("Progress", () => {
  it("renders with progressbar role", async () => {
    const screen = await render(<Progress value={50} max={100} />);
    await expect.element(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders with scope class", async () => {
    const screen = await render(<Progress value={30} max={100} />);
    await expect
      .element(screen.getByRole("progressbar"))
      .toHaveClass("sct-progress");
  });

  it("forwards className", async () => {
    const screen = await render(
      <Progress value={30} max={100} className="custom" />,
    );
    await expect
      .element(screen.getByRole("progressbar"))
      .toHaveClass("sct-progress custom");
  });

  it("renders track and indicator sub-elements", async () => {
    await render(<Progress value={60} max={100} />);
    expect(
      document.querySelector("[data-slot='progress-track']"),
    ).not.toBeNull();
    expect(
      document.querySelector("[data-slot='progress-indicator']"),
    ).not.toBeNull();
  });

  it("renders indeterminate state when value is null", async () => {
    await render(<Progress value={null} max={100} />);
    const root = document.querySelector("[data-slot='progress']");
    expect(root?.hasAttribute("data-indeterminate")).toBe(true);
  });
});
