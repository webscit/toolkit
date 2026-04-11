import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Item } from "./item";

describe("Item", () => {
  it("renders with scope class", async () => {
    await render(<Item data-testid="it">Label</Item>);
    expect(document.querySelector("[data-testid='it']")?.className).toBe("sct-item");
  });

  it("forwards className", async () => {
    await render(<Item className="custom" data-testid="it">Label</Item>);
    expect(document.querySelector("[data-testid='it']")?.className).toBe("sct-item custom");
  });

  it("sets data-selected when selected=true", async () => {
    await render(<Item selected data-testid="it">Label</Item>);
    expect(document.querySelector("[data-testid='it']")?.hasAttribute("data-selected")).toBe(true);
  });

  it("does not set data-selected when selected=false", async () => {
    await render(<Item data-testid="it">Label</Item>);
    expect(document.querySelector("[data-testid='it']")?.hasAttribute("data-selected")).toBe(false);
  });

  it("sets data-disabled when disabled=true", async () => {
    await render(<Item disabled data-testid="it">Label</Item>);
    expect(document.querySelector("[data-testid='it']")?.hasAttribute("data-disabled")).toBe(true);
  });
});
