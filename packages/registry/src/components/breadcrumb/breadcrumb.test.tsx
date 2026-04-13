import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb";

describe("Breadcrumb", () => {
  it("renders a nav landmark", async () => {
    const screen = await render(
      <Breadcrumb>
        <BreadcrumbList />
      </Breadcrumb>,
    );
    await expect.element(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("BreadcrumbList renders an ordered list", async () => {
    const screen = await render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    const list = document.querySelector("ol");
    expect(list).not.toBeNull();
  });

  it("BreadcrumbPage has aria-current=page", async () => {
    const screen = await render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    await expect
      .element(screen.getByText("Current"))
      .toHaveAttribute("aria-current", "page");
  });

  it("BreadcrumbSeparator renders a default slash", async () => {
    await render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>,
    );
    const sep = document.querySelector("[data-slot='breadcrumb-separator']");
    expect(sep?.textContent).toBe("/");
  });

  it("BreadcrumbEllipsis renders ellipsis text", async () => {
    await render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    const el = document.querySelector("[data-slot='breadcrumb-ellipsis']");
    expect(el?.textContent).toBe("…");
  });

  it("Breadcrumb forwards className", async () => {
    const screen = await render(
      <Breadcrumb className="custom">
        <BreadcrumbList />
      </Breadcrumb>,
    );
    await expect
      .element(screen.getByRole("navigation"))
      .toHaveClass("sct-breadcrumb custom");
  });
});
