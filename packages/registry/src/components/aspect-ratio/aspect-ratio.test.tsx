import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio", () => {
  it("renders a div with scope class", async () => {
    const screen = await render(<AspectRatio><img alt="test" /></AspectRatio>);
    const el = screen.getByRole("img").element().parentElement!;
    expect(el.className).toBe("sct-aspect-ratio");
  });

  it("forwards className", async () => {
    const screen = await render(<AspectRatio className="my-class"><span /></AspectRatio>);
    const el = document.querySelector(".sct-aspect-ratio")!;
    expect(el.className).toBe("sct-aspect-ratio my-class");
  });

  it("sets --sct-aspect-ratio CSS variable from ratio prop", async () => {
    await render(<AspectRatio ratio={4 / 3} data-testid="ar"><span /></AspectRatio>);
    const el = document.querySelector("[data-testid='ar']") as HTMLElement;
    expect(el.style.getPropertyValue("--sct-aspect-ratio")).toBe("1.3333333333333333");
  });

  it("defaults ratio to 16/9", async () => {
    await render(<AspectRatio data-testid="ar2"><span /></AspectRatio>);
    const el = document.querySelector("[data-testid='ar2']") as HTMLElement;
    expect(el.style.getPropertyValue("--sct-aspect-ratio")).toBe("1.7777777777777777");
  });
});
