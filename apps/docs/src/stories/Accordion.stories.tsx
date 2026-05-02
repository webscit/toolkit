import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@webscit/registry";
import {
  Accordion as ShadcnAccordion,
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger as ShadcnAccordionTrigger,
  AccordionContent as ShadcnAccordionContent,
} from "@/components/ui/accordion";

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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnAccordion style={{ width: "400px" }}>
          <ShadcnAccordionItem value="item-1">
            <ShadcnAccordionTrigger>Is it accessible?</ShadcnAccordionTrigger>
            <ShadcnAccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </ShadcnAccordionContent>
          </ShadcnAccordionItem>
          <ShadcnAccordionItem value="item-2">
            <ShadcnAccordionTrigger>Is it styled?</ShadcnAccordionTrigger>
            <ShadcnAccordionContent>
              Yes. It comes with default styles that match your other
              components.
            </ShadcnAccordionContent>
          </ShadcnAccordionItem>
          <ShadcnAccordionItem value="item-3">
            <ShadcnAccordionTrigger>Is it animated?</ShadcnAccordionTrigger>
            <ShadcnAccordionContent>
              Yes. It uses CSS transitions for smooth expand/collapse.
            </ShadcnAccordionContent>
          </ShadcnAccordionItem>
        </ShadcnAccordion>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnAccordion style={{ width: "400px" }}>
          <ShadcnAccordionItem value="a">
            <ShadcnAccordionTrigger>Section A</ShadcnAccordionTrigger>
            <ShadcnAccordionContent>
              Content for section A.
            </ShadcnAccordionContent>
          </ShadcnAccordionItem>
          <ShadcnAccordionItem value="b">
            <ShadcnAccordionTrigger>Section B</ShadcnAccordionTrigger>
            <ShadcnAccordionContent>
              Content for section B.
            </ShadcnAccordionContent>
          </ShadcnAccordionItem>
        </ShadcnAccordion>
      ),
    },
  },
};
