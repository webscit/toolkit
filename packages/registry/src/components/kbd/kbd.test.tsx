import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Kbd } from "./kbd";

describe("Kbd", () => {
  it("renders a kbd element", async () => {
    await render(<Kbd>⌘K</Kbd>);
    const el = document.querySelector("kbd");
    expect(el).not.toBeNull();
  });

  it("renders with scope class", async () => {
    await render(<Kbd>Enter</Kbd>);
    expect(document.querySelector("kbd")?.className).toBe("sct-kbd");
  });

  it("forwards className", async () => {
    await render(<Kbd className="custom">Tab</Kbd>);
    expect(document.querySelector("kbd")?.className).toBe("sct-kbd custom");
  });

  it("renders children text", async () => {
    const screen = await render(<Kbd>Ctrl</Kbd>);
    await expect.element(screen.getByText("Ctrl")).toBeInTheDocument();
  });
});
