import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Alert>Alert content</Alert>);
    await expect.element(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(<Alert className="my-class">Content</Alert>);
    await expect
      .element(screen.getByRole("alert"))
      .toHaveClass("sct-alert my-class");
  });

  it("applies correct data-variant attribute", async () => {
    const screen = await render(<Alert variant="destructive">Error!</Alert>);
    await expect
      .element(screen.getByRole("alert"))
      .toHaveAttribute("data-variant", "destructive");
  });

  it("defaults to variant=default", async () => {
    const screen = await render(<Alert>Info</Alert>);
    await expect
      .element(screen.getByRole("alert"))
      .toHaveAttribute("data-variant", "default");
  });

  it("renders title and description", async () => {
    const screen = await render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>,
    );
    await expect.element(screen.getByText("Heads up!")).toBeInTheDocument();
    await expect
      .element(screen.getByText("Something happened."))
      .toBeInTheDocument();
  });
});
