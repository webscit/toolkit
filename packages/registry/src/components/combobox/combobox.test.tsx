import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
} from "./combobox";

const ITEMS = ["Apple", "Banana", "Cherry"];

describe("Combobox", () => {
  it("renders input element", async () => {
    const screen = await render(
      <Combobox>
        <ComboboxInput placeholder="Search fruit…" />
        <ComboboxTrigger>▾</ComboboxTrigger>
        <ComboboxContent>
          {ITEMS.map((f) => (
            <ComboboxItem key={f} value={f}>
              {f}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>,
    );
    await expect
      .element(screen.getByPlaceholder("Search fruit…"))
      .toBeInTheDocument();
  });
  it("renders trigger button", async () => {
    const screen = await render(
      <Combobox>
        <ComboboxInput placeholder="Pick…" />
        <ComboboxTrigger data-testid="trig">▾</ComboboxTrigger>
        <ComboboxContent>
          {ITEMS.map((f) => (
            <ComboboxItem key={f} value={f}>
              {f}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>,
    );
    await expect.element(screen.getByTestId("trig")).toBeInTheDocument();
  });
  it("popup is closed before interaction", async () => {
    await render(
      <Combobox>
        <ComboboxInput placeholder="Pick…" />
        <ComboboxTrigger>▾</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxItem value="a">Alpha</ComboboxItem>
        </ComboboxContent>
      </Combobox>,
    );
    expect(document.querySelector("[data-slot='combobox-content']")).toBeNull();
  });
  it("ComboboxInput has correct data-slot", async () => {
    const screen = await render(
      <Combobox>
        <ComboboxInput placeholder="Search…" />
        <ComboboxTrigger>▾</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxItem value="x">X</ComboboxItem>
        </ComboboxContent>
      </Combobox>,
    );
    await expect
      .element(screen.getByPlaceholder("Search…"))
      .toHaveAttribute("data-slot", "combobox-input");
  });
});
