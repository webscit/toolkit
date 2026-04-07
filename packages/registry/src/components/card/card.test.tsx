import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

import { locators, type Locator } from "vitest/browser";

declare module "vitest/browser" {
  interface LocatorSelectors {
    getBySlot(slot: string): Locator;
  }
}

locators.extend({
  getBySlot(slot: string) {
    return `[data-slot="${slot}"]`;
  },
});

describe("Card", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Card>content</Card>);
    await expect.element(screen.getByText("content")).toBeInTheDocument();
  });

  it("forwards className", async () => {
    const screen = await render(<Card className="my-class">content</Card>);
    await expect
      .element(screen.getByText("content"))
      .toHaveClass("sct-card my-class");
  });

  it("renders full card composition", async () => {
    const screen = await render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    await expect.element(screen.getByText("Title")).toBeInTheDocument();
    await expect.element(screen.getByText("Description")).toBeInTheDocument();
    await expect.element(screen.getByText("Content")).toBeInTheDocument();
    await expect.element(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("sets data-slot on each part", async () => {
    const screen = await render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    await expect
      .element(screen.getBySlot("card-title").getByText("Title"))
      .toBeInTheDocument();
    await expect
      .element(screen.getBySlot("card-content").getByText("Content"))
      .toBeInTheDocument();
    await expect
      .element(screen.getBySlot("card-footer").getByText("Footer"))
      .toBeInTheDocument();
  });
});
