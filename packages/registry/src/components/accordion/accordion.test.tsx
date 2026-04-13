import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

describe("Accordion", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <Accordion data-testid="accordion">
        <AccordionItem>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await expect.element(screen.getByTestId("accordion")).toBeInTheDocument();
  });

  it("sets data-slot on root", async () => {
    const screen = await render(
      <Accordion data-testid="accordion">
        <AccordionItem>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await expect
      .element(screen.getByTestId("accordion"))
      .toHaveAttribute("data-slot", "accordion");
  });

  it("renders trigger as button", async () => {
    const screen = await render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Toggle</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Toggle" }))
      .toBeInTheDocument();
  });

  it("expands content when trigger is clicked", async () => {
    const screen = await render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Toggle</AccordionTrigger>
          <AccordionContent>Expanded text</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    await expect.element(screen.getByText("Expanded text")).toBeInTheDocument();
  });

  it("forwards className on root", async () => {
    const screen = await render(
      <Accordion data-testid="accordion" className="my-class">
        <AccordionItem>
          <AccordionTrigger>Item</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await expect
      .element(screen.getByTestId("accordion"))
      .toHaveClass("sct-accordion my-class");
  });
});
