import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Separator } from "./separator";

describe("Separator", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Separator />);
    await expect.element(screen.getByRole("none")).toBeInTheDocument();
  });

  it("renders as separator role when not decorative", async () => {
    const screen = await render(<Separator decorative={false} />);
    await expect.element(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(<Separator decorative={false} />);
    await expect
      .element(screen.getByRole("separator"))
      .toHaveAttribute("data-slot", "separator");
  });

  it("defaults to horizontal orientation", async () => {
    const screen = await render(<Separator decorative={false} />);
    await expect
      .element(screen.getByRole("separator"))
      .toHaveAttribute("data-orientation", "horizontal");
  });

  it("supports vertical orientation", async () => {
    const screen = await render(
      <Separator orientation="vertical" decorative={false} />,
    );
    await expect
      .element(screen.getByRole("separator"))
      .toHaveAttribute("data-orientation", "vertical");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <Separator decorative={false} className="my-class" />,
    );
    await expect
      .element(screen.getByRole("separator"))
      .toHaveClass("sct-separator my-class");
  });
});
