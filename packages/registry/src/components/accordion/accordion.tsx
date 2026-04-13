import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import "./accordion.css";

export interface AccordionProps extends React.ComponentProps<
  typeof BaseAccordion.Root
> {
  className?: string;
}

export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <BaseAccordion.Root
      data-slot="accordion"
      className={`sct-accordion${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface AccordionItemProps extends React.ComponentProps<
  typeof BaseAccordion.Item
> {
  className?: string;
}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={`sct-accordion-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccordionTriggerProps extends React.ComponentProps<
  typeof BaseAccordion.Trigger
> {}

export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="sct-accordion-header">
      <BaseAccordion.Trigger
        data-slot="accordion-trigger"
        className={`sct-accordion-trigger${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
        <svg
          className="sct-accordion-chevron"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export type AccordionContentProps = React.ComponentProps<
  typeof BaseAccordion.Panel
>;

export function AccordionContent({
  className,
  ...props
}: AccordionContentProps) {
  return (
    <BaseAccordion.Panel
      data-slot="accordion-content"
      className={`sct-accordion-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
