import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyAction,
} from "./empty";

describe("Empty", () => {
  it("renders root with scope class", async () => {
    await render(<Empty data-testid="e" />);
    const el = document.querySelector("[data-testid='e']");
    expect(el?.className).toBe("sct-empty");
  });

  it("forwards className on root", async () => {
    await render(<Empty className="custom" data-testid="e" />);
    expect(document.querySelector("[data-testid='e']")?.className).toBe(
      "sct-empty custom",
    );
  });

  it("renders full compound structure", async () => {
    await render(
      <Empty>
        <EmptyIcon data-testid="icon" />
        <EmptyTitle data-testid="title">No results</EmptyTitle>
        <EmptyDescription data-testid="desc">
          Try a different search.
        </EmptyDescription>
        <EmptyAction data-testid="action" />
      </Empty>,
    );
    expect(
      document.querySelector("[data-testid='icon']")?.getAttribute("data-slot"),
    ).toBe("empty-icon");
    await expect
      .element(document.querySelector("[data-testid='title']") as Element)
      .toHaveTextContent("No results");
    await expect
      .element(document.querySelector("[data-testid='desc']") as Element)
      .toHaveTextContent("Try a different search.");
    expect(
      document
        .querySelector("[data-testid='action']")
        ?.getAttribute("data-slot"),
    ).toBe("empty-action");
  });
});
