import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";

describe("HoverCard", () => {
  it("renders trigger element", async () => {
    const screen = await render(
      <HoverCard>
        <HoverCardTrigger data-testid="trigger">Hover me</HoverCardTrigger>
        <HoverCardContent>
          <p>Details</p>
        </HoverCardContent>
      </HoverCard>,
    );
    await expect.element(screen.getByTestId("trigger")).toBeInTheDocument();
  });
  it("trigger has correct data-slot", async () => {
    const screen = await render(
      <HoverCard>
        <HoverCardTrigger data-testid="trigger">Hover me</HoverCardTrigger>
        <HoverCardContent>
          <p>Details</p>
        </HoverCardContent>
      </HoverCard>,
    );
    await expect
      .element(screen.getByTestId("trigger"))
      .toHaveAttribute("data-slot", "hover-card-trigger");
  });
  it("popup is not visible before hover", async () => {
    await render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>
          <p data-testid="content">Details</p>
        </HoverCardContent>
      </HoverCard>,
    );
    expect(
      document.querySelector("[data-slot='hover-card-content']"),
    ).toBeNull();
  });
});
