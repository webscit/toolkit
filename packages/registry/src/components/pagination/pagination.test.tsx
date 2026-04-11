import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination";

describe("Pagination", () => {
  it("renders a navigation landmark", async () => {
    const screen = await render(
      <Pagination><PaginationContent /></Pagination>
    );
    await expect.element(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("PaginationLink sets aria-current=page when isActive", async () => {
    const screen = await render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    await expect.element(screen.getByText("2")).toHaveAttribute("aria-current", "page");
  });

  it("PaginationLink does not set aria-current when not active", async () => {
    const screen = await render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const link = screen.getByText("1");
    await expect.element(link).not.toHaveAttribute("aria-current");
  });

  it("PaginationPrevious has accessible label", async () => {
    const screen = await render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    await expect.element(screen.getByRole("link", { name: /previous/i })).toBeInTheDocument();
  });

  it("PaginationNext has accessible label", async () => {
    const screen = await render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    await expect.element(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("PaginationEllipsis is aria-hidden", async () => {
    await render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const el = document.querySelector("[data-slot='pagination-ellipsis']");
    expect(el?.getAttribute("aria-hidden")).toBe("true");
  });
});
