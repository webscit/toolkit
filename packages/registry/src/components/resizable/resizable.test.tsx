import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable";

describe("ResizablePanelGroup", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <ResizablePanelGroup orientation="horizontal" data-testid="group">
        <ResizablePanel>Panel 1</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Panel 2</ResizablePanel>
      </ResizablePanelGroup>,
    );
    await expect.element(screen.getByTestId("group")).toBeInTheDocument();
  });

  it("sets data-slot on group", async () => {
    const screen = await render(
      <ResizablePanelGroup orientation="horizontal" data-testid="group">
        <ResizablePanel>Panel 1</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Panel 2</ResizablePanel>
      </ResizablePanelGroup>,
    );
    await expect
      .element(screen.getByTestId("group"))
      .toHaveAttribute("data-slot", "resizable-panel-group");
  });

  it("renders panels with content", async () => {
    const screen = await render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    );
    await expect.element(screen.getByText("Left")).toBeInTheDocument();
    await expect.element(screen.getByText("Right")).toBeInTheDocument();
  });

  it("renders handle with separator role", async () => {
    const screen = await render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel>A</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>B</ResizablePanel>
      </ResizablePanelGroup>,
    );
    await expect.element(screen.getByRole("separator")).toBeInTheDocument();
  });
});
