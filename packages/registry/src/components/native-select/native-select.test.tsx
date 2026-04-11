import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { NativeSelect } from "./native-select";

describe("NativeSelect", () => {
  it("renders a select element", async () => {
    const screen = await render(
      <NativeSelect>
        <option value="a">Option A</option>
      </NativeSelect>
    );
    await expect.element(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders with scope class on select", async () => {
    const screen = await render(
      <NativeSelect>
        <option value="a">A</option>
      </NativeSelect>
    );
    await expect.element(screen.getByRole("combobox")).toHaveClass("sct-native-select");
  });

  it("forwards className", async () => {
    const screen = await render(
      <NativeSelect className="custom">
        <option value="a">A</option>
      </NativeSelect>
    );
    await expect.element(screen.getByRole("combobox")).toHaveClass("sct-native-select custom");
  });

  it("forwards disabled prop", async () => {
    const screen = await render(
      <NativeSelect disabled>
        <option value="a">A</option>
      </NativeSelect>
    );
    await expect.element(screen.getByRole("combobox")).toBeDisabled();
  });
});
