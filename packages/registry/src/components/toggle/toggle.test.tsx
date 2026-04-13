import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("renders a button", async () => {
    const screen = await render(<Toggle>B</Toggle>);
    await expect.element(screen.getByRole("button")).toBeInTheDocument();
  });
  it("renders with scope class", async () => {
    const screen = await render(<Toggle>B</Toggle>);
    await expect.element(screen.getByRole("button")).toHaveClass("sct-toggle");
  });
  it("forwards className", async () => {
    const screen = await render(<Toggle className="custom">B</Toggle>);
    await expect
      .element(screen.getByRole("button"))
      .toHaveClass("sct-toggle custom");
  });
  it("applies data-variant attribute", async () => {
    const screen = await render(<Toggle variant="outline">B</Toggle>);
    await expect
      .element(screen.getByRole("button"))
      .toHaveAttribute("data-variant", "outline");
  });
  it("applies data-size attribute", async () => {
    const screen = await render(<Toggle size="sm">B</Toggle>);
    await expect
      .element(screen.getByRole("button"))
      .toHaveAttribute("data-size", "sm");
  });
  it("defaults to variant=default and size=default", async () => {
    const screen = await render(<Toggle>B</Toggle>);
    const btn = screen.getByRole("button");
    await expect.element(btn).toHaveAttribute("data-variant", "default");
    await expect.element(btn).toHaveAttribute("data-size", "default");
  });
  it("sets aria-pressed when pressed=true", async () => {
    const screen = await render(<Toggle pressed>B</Toggle>);
    await expect
      .element(screen.getByRole("button"))
      .toHaveAttribute("aria-pressed", "true");
  });
});
