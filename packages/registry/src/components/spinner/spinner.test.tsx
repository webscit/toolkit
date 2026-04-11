import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("renders with status role", async () => {
    const screen = await render(<Spinner />);
    await expect.element(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has accessible label", async () => {
    const screen = await render(<Spinner />);
    await expect.element(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("renders with scope class", async () => {
    const screen = await render(<Spinner />);
    await expect.element(screen.getByRole("status")).toHaveClass("sct-spinner");
  });

  it("forwards className", async () => {
    const screen = await render(<Spinner className="custom" />);
    await expect.element(screen.getByRole("status")).toHaveClass("sct-spinner custom");
  });

  it("applies data-size attribute", async () => {
    const screen = await render(<Spinner size="lg" />);
    await expect.element(screen.getByRole("status")).toHaveAttribute("data-size", "lg");
  });

  it("defaults to size=default", async () => {
    const screen = await render(<Spinner />);
    await expect.element(screen.getByRole("status")).toHaveAttribute("data-size", "default");
  });
});
