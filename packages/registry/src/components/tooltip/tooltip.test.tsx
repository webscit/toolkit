import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

describe("Tooltip", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await expect.element(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    const screen = await render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await screen.getByText("Hover me").hover();
    await expect.element(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  it("tooltip content has data-slot attribute", async () => {
    const screen = await render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await screen.getByText("Hover me").hover();
    const tooltip = screen.getByText("Tooltip text");
    await expect
      .element(tooltip)
      .toHaveAttribute("data-slot", "tooltip-content");
  });
});
