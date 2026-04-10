import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@webscit/registry";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion style={{ width: "400px" }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          <div>Yes. It adheres to the WAI-ARIA design pattern.</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          <div>Yes. It comes with default styles using CSS scoping.</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          <div>Yes. It uses CSS transitions for smooth expand/collapse.</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Playground: Story = {
  render: () => (
    <Accordion style={{ width: "400px" }}>
      <AccordionItem value="a">
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionContent>
          <div>Content for section A.</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Section B</AccordionTrigger>
        <AccordionContent>
          <div>Content for section B.</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
