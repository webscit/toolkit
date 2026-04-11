import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { DirectionProvider, useDirection } from "./direction";

function DirectionConsumer() {
  const dir = useDirection();
  return <span data-testid="dir-value">{dir}</span>;
}

describe("DirectionProvider", () => {
  it("provides ltr direction by default", async () => {
    await render(
      <DirectionProvider direction="ltr">
        <DirectionConsumer />
      </DirectionProvider>
    );
    const el = document.querySelector("[data-testid='dir-value']");
    expect(el?.textContent).toBe("ltr");
  });

  it("provides rtl direction when set", async () => {
    await render(
      <DirectionProvider direction="rtl">
        <DirectionConsumer />
      </DirectionProvider>
    );
    const el = document.querySelector("[data-testid='dir-value']");
    expect(el?.textContent).toBe("rtl");
  });
});
