import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import "@webscit/tokens/tokens.css";
import { Button } from "./button";

describe("Button", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Button>Click me</Button>);
    await expect.element(screen.getByRole("button")).toBeInTheDocument();
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(<Button className="my-class">Click</Button>);
    await expect
      .element(screen.getByRole("button"))
      .toHaveClass("sct-button my-class");
  });

  it("applies correct data-variant attribute", async () => {
    const screen = await render(<Button variant="destructive">Delete</Button>);
    await expect
      .element(screen.getByRole("button"))
      .toHaveAttribute("data-variant", "destructive");
  });

  it("applies correct data-size attribute", async () => {
    const screen = await render(<Button size="lg">Large</Button>);
    await expect
      .element(screen.getByRole("button"))
      .toHaveAttribute("data-size", "lg");
  });

  it("defaults to variant=default and size=default", async () => {
    const screen = await render(<Button>Default</Button>);
    const btn = screen.getByRole("button");
    await expect.element(btn).toHaveAttribute("data-variant", "default");
    await expect.element(btn).toHaveAttribute("data-size", "default");
  });

  it("passes disabled prop", async () => {
    const screen = await render(<Button disabled>Disabled</Button>);
    await expect.element(screen.getByRole("button")).toBeDisabled();
  });

  it("resolves the core --sct-* tokens used by Button", async () => {
    const screen = await render(<Button>resolves</Button>);
    const el = screen.container.querySelector(".sct-button") as HTMLElement;
    const styles = window.getComputedStyle(el);
    // Token names referenced in button.css; these must resolve to non-empty values.
    for (const name of [
      "--sct-color-primary",
      "--sct-color-primary-foreground",
      "--sct-color-ring",
      "--sct-radius-md",
      "--sct-font-size-sm",
      "--sct-font-weight-medium",
    ]) {
      expect(styles.getPropertyValue(name).trim()).not.toBe("");
    }
  });
});
