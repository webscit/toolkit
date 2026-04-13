import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("ToggleGroup", () => {
  it("renders root with scope class", async () => {
    await render(
      <ToggleGroup data-testid="tg">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(document.querySelector("[data-testid='tg']")?.className).toBe(
      "sct-toggle-group",
    );
  });
  it("forwards className on root", async () => {
    await render(
      <ToggleGroup className="custom" data-testid="tg">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(document.querySelector("[data-testid='tg']")?.className).toBe(
      "sct-toggle-group custom",
    );
  });
  it("renders ToggleGroupItem as a button", async () => {
    const screen = await render(
      <ToggleGroup>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      </ToggleGroup>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Bold" }))
      .toBeInTheDocument();
  });
  it("ToggleGroupItem has scope class", async () => {
    const screen = await render(
      <ToggleGroup>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      </ToggleGroup>,
    );
    await expect
      .element(screen.getByRole("button"))
      .toHaveClass("sct-toggle-group-item");
  });
  it("ToggleGroupItem forwards className", async () => {
    const screen = await render(
      <ToggleGroup>
        <ToggleGroupItem value="bold" className="custom">
          Bold
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    await expect
      .element(screen.getByRole("button"))
      .toHaveClass("sct-toggle-group-item custom");
  });
  it("multiple items can be toggled independently", async () => {
    const screen = await render(
      <ToggleGroup multiple>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    const btnA = screen.getByRole("button", { name: "A" });
    const btnB = screen.getByRole("button", { name: "B" });
    await btnA.click();
    await btnB.click();
    await expect.element(btnA).toHaveAttribute("aria-pressed", "true");
    await expect.element(btnB).toHaveAttribute("aria-pressed", "true");
  });
});
