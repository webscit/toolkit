import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

describe("Collapsible", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Toggle" }))
      .toBeInTheDocument();
  });

  it("sets data-slot on trigger", async () => {
    const screen = await render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Toggle" }))
      .toHaveAttribute("data-slot", "collapsible-trigger");
  });

  it("shows content when opened", async () => {
    const screen = await render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>,
    );
    await expect
      .element(screen.getByText("Visible content"))
      .toBeInTheDocument();
  });

  it("toggles content on trigger click", async () => {
    const screen = await render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Toggle me</CollapsibleContent>
      </Collapsible>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    await expect.element(screen.getByText("Toggle me")).toBeInTheDocument();
  });
});
