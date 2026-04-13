import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./sheet";

describe("Sheet", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Open" }))
      .toBeInTheDocument();
  });

  it("sets data-slot on trigger", async () => {
    const screen = await render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Open" }))
      .toHaveAttribute("data-slot", "sheet-trigger");
  });

  it("opens sheet on trigger click", async () => {
    const screen = await render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await expect.element(screen.getByRole("dialog")).toBeInTheDocument();
    await expect.element(screen.getByText("Sheet Title")).toBeInTheDocument();
  });

  it("defaults to right side", async () => {
    const screen = await render(
      <Sheet open>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    await expect
      .element(screen.getByRole("dialog"))
      .toHaveAttribute("data-side", "right");
  });

  it("supports left side", async () => {
    const screen = await render(
      <Sheet open>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    await expect
      .element(screen.getByRole("dialog"))
      .toHaveAttribute("data-side", "left");
  });
});
