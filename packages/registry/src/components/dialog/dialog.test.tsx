import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";

describe("Dialog", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await expect.element(screen.getByText("Open")).toBeInTheDocument();
  });

  it("opens dialog on trigger click", async () => {
    const screen = await render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>My Dialog</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await screen.getByText("Open").click();
    await expect.element(screen.getByRole("dialog")).toBeInTheDocument();
    await expect.element(screen.getByText("My Dialog")).toBeInTheDocument();
  });

  it("dialog content has data-slot attribute", async () => {
    const screen = await render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await screen.getByText("Open").click();
    await expect
      .element(screen.getByRole("dialog"))
      .toHaveAttribute("data-slot", "dialog-content");
  });
});
