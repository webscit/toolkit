import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Slider } from "./slider";

describe("Slider", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Slider defaultValue={50} />);
    await expect.element(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("sets data-slot on root", async () => {
    const screen = await render(
      <Slider defaultValue={50} data-testid="slider" />,
    );
    await expect
      .element(screen.getByTestId("slider"))
      .toHaveAttribute("data-slot", "slider");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <Slider defaultValue={50} className="my-class" data-testid="slider" />,
    );
    await expect
      .element(screen.getByTestId("slider"))
      .toHaveClass("sct-slider my-class");
  });

  it("renders with min and max attributes", async () => {
    const screen = await render(
      <Slider defaultValue={25} min={0} max={100} />,
    );
    const slider = screen.getByRole("slider");
    await expect.element(slider).toHaveAttribute("min", "0");
    await expect.element(slider).toHaveAttribute("max", "100");
  });
});
