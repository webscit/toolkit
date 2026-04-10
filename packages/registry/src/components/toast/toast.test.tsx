import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Toast as BaseToast } from "@base-ui/react/toast";
import {
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./toast";

// Helper: wrap in provider with a fake toast object
function renderToast(
  ui: React.ReactNode,
  type?: string,
) {
  const toast = {
    id: "test-toast",
    title: "Test",
    type,
  };
  return render(
    <ToastProvider>
      <ToastViewport data-testid="viewport">
        <BaseToast.Root toast={toast}>
          {ui}
        </BaseToast.Root>
      </ToastViewport>
    </ToastProvider>,
  );
}

describe("ToastProvider", () => {
  it("renders children", async () => {
    const screen = await render(
      <ToastProvider>
        <div data-testid="child">Hello</div>
      </ToastProvider>,
    );
    await expect.element(screen.getByTestId("child")).toBeInTheDocument();
  });
});

describe("ToastViewport", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <ToastProvider>
        <ToastViewport data-testid="viewport" />
      </ToastProvider>,
    );
    await expect.element(screen.getByTestId("viewport")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <ToastProvider>
        <ToastViewport data-testid="viewport" />
      </ToastProvider>,
    );
    await expect
      .element(screen.getByTestId("viewport"))
      .toHaveAttribute("data-slot", "toast-viewport");
  });
});

describe("Toast sub-components", () => {
  it("renders ToastTitle", async () => {
    const screen = await renderToast(
      <BaseToast.Content>
        <ToastTitle>Success!</ToastTitle>
      </BaseToast.Content>,
    );
    await expect.element(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("renders ToastDescription", async () => {
    const screen = await renderToast(
      <BaseToast.Content>
        <ToastDescription>Details here</ToastDescription>
      </BaseToast.Content>,
    );
    await expect.element(screen.getByText("Details here")).toBeInTheDocument();
  });

  it("renders ToastClose", async () => {
    const screen = await renderToast(
      <BaseToast.Content>
        <ToastClose>Dismiss</ToastClose>
      </BaseToast.Content>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Dismiss" }))
      .toBeInTheDocument();
  });

  it("renders ToastAction", async () => {
    const screen = await renderToast(
      <BaseToast.Content>
        <ToastAction>Undo</ToastAction>
      </BaseToast.Content>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Undo" }))
      .toBeInTheDocument();
  });
});
