import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./table";

describe("Table", () => {
  it("renders a complete table without crashing", async () => {
    const screen = await render(
      <Table>
        <TableCaption>A test table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );
    await expect.element(screen.getByRole("table")).toBeInTheDocument();
  });

  it("sets data-slot on table", async () => {
    const screen = await render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await expect
      .element(screen.getByRole("table"))
      .toHaveAttribute("data-slot", "table");
  });

  it("forwards className on table", async () => {
    const screen = await render(
      <Table className="my-class">
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await expect
      .element(screen.getByRole("table"))
      .toHaveClass("sct-table my-class");
  });

  it("renders column headers with correct role", async () => {
    const screen = await render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Val</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const th = screen.getByText("Col");
    await expect.element(th).toBeInTheDocument();
    await expect.element(th).toHaveProperty("tagName", "TH");
  });

  it("renders caption", async () => {
    const screen = await render(
      <Table>
        <TableCaption>My caption</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await expect.element(screen.getByRole("caption")).toBeInTheDocument();
  });
});
