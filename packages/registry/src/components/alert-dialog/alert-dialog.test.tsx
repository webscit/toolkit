import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";

describe("AlertDialog", () => {
  it("renders trigger without crashing", async () => {
    const screen = await render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Delete" }))
      .toBeInTheDocument();
  });

  it("sets data-slot on trigger", async () => {
    const screen = await render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Sure?</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Delete" }))
      .toHaveAttribute("data-slot", "alert-dialog-trigger");
  });

  it("opens dialog on trigger click", async () => {
    const screen = await render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await expect.element(screen.getByRole("alertdialog")).toBeInTheDocument();
    await expect
      .element(screen.getByText("Confirm deletion"))
      .toBeInTheDocument();
  });
});
