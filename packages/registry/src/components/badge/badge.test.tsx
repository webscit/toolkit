import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Badge>New</Badge>);
    await expect.element(screen.getByText("New")).toBeInTheDocument();
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(<Badge className="my-class">New</Badge>);
    await expect
      .element(screen.getByText("New"))
      .toHaveClass("sct-badge my-class");
  });

  it("applies correct data-variant attribute", async () => {
    const screen = await render(<Badge variant="destructive">Error</Badge>);
    await expect
      .element(screen.getByText("Error"))
      .toHaveAttribute("data-variant", "destructive");
  });

  it("defaults to variant=default", async () => {
    const screen = await render(<Badge>Default</Badge>);
    await expect
      .element(screen.getByText("Default"))
      .toHaveAttribute("data-variant", "default");
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(<Badge>Badge</Badge>);
    await expect
      .element(screen.getByText("Badge"))
      .toHaveAttribute("data-slot", "badge");
  });
});
