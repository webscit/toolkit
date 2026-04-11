import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose } from "./drawer";

describe("Drawer", () => {
  it("renders trigger as a button", async () => {
    const screen = await render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader><DrawerTitle>Title</DrawerTitle><DrawerDescription>Description</DrawerDescription></DrawerHeader>
          <DrawerFooter><DrawerClose>Close</DrawerClose></DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
    await expect.element(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });
  it("popup is not visible before trigger click", async () => {
    await render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent><DrawerTitle>My Drawer</DrawerTitle></DrawerContent>
      </Drawer>
    );
    expect(document.querySelector("[data-slot='drawer-content']")).toBeNull();
  });
  it("opens and shows content when trigger is clicked", async () => {
    const screen = await render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent><DrawerTitle data-testid="title">Settings</DrawerTitle></DrawerContent>
      </Drawer>
    );
    await screen.getByRole("button", { name: "Open" }).click();
    await expect.element(screen.getByTestId("title")).toBeInTheDocument();
  });
});
