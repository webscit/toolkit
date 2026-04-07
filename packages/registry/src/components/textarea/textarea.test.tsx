import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Textarea />);
    await expect.element(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(<Textarea className="my-class" />);
    await expect
      .element(screen.getByRole("textbox"))
      .toHaveClass("sct-textarea my-class");
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(<Textarea />);
    await expect
      .element(screen.getByRole("textbox"))
      .toHaveAttribute("data-slot", "textarea");
  });

  it("passes disabled prop", async () => {
    const screen = await render(<Textarea disabled />);
    await expect.element(screen.getByRole("textbox")).toBeDisabled();
  });
});
