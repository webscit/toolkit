import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { ScrollArea, ScrollBar } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <ScrollArea data-testid="scroll">
        <div>Content</div>
      </ScrollArea>,
    );
    await expect.element(screen.getByTestId("scroll")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <ScrollArea data-testid="scroll">
        <div>Content</div>
      </ScrollArea>,
    );
    await expect
      .element(screen.getByTestId("scroll"))
      .toHaveAttribute("data-slot", "scroll-area");
  });

  it("forwards className after scope anchor", async () => {
    const screen = await render(
      <ScrollArea data-testid="scroll" className="my-class">
        <div>Content</div>
      </ScrollArea>,
    );
    await expect
      .element(screen.getByTestId("scroll"))
      .toHaveClass("sct-scroll-area my-class");
  });
});

// ScrollBar must be placed outside the Viewport (sibling) inside a Root that has
// actual overflow, because BaseScrollArea.Scrollbar returns null when no overflow.
function ScrollBarTestRoot({
  children,
  orientation = "vertical",
}: {
  children: React.ReactNode;
  orientation?: "vertical" | "horizontal";
}) {
  const isHorizontal = orientation === "horizontal";
  return (
    <BaseScrollArea.Root style={{ height: "100px", width: "100px" }}>
      <BaseScrollArea.Viewport style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            height: isHorizontal ? "50px" : "1000px",
            width: isHorizontal ? "1000px" : "50px",
          }}
        >
          Content
        </div>
      </BaseScrollArea.Viewport>
      {children}
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  );
}

describe("ScrollBar", () => {
  it("renders inside ScrollArea without crashing", async () => {
    const screen = await render(
      <ScrollBarTestRoot>
        <ScrollBar data-testid="bar" />
      </ScrollBarTestRoot>,
    );
    await expect.element(screen.getByTestId("bar")).toBeInTheDocument();
  });

  it("defaults to vertical orientation", async () => {
    const screen = await render(
      <ScrollBarTestRoot>
        <ScrollBar data-testid="bar" />
      </ScrollBarTestRoot>,
    );
    await expect
      .element(screen.getByTestId("bar"))
      .toHaveAttribute("data-orientation", "vertical");
  });

  it("supports horizontal orientation", async () => {
    const screen = await render(
      <ScrollBarTestRoot orientation="horizontal">
        <ScrollBar data-testid="bar" orientation="horizontal" />
      </ScrollBarTestRoot>,
    );
    await expect
      .element(screen.getByTestId("bar"))
      .toHaveAttribute("data-orientation", "horizontal");
  });
});
