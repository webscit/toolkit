import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import "./collapsible.css";

export const Collapsible = BaseCollapsible.Root;
export type CollapsibleProps = React.ComponentProps<
  typeof BaseCollapsible.Root
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function CollapsibleTrigger({ ...props }: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CollapsibleContent({
  className,
  ...props
}: CollapsibleContentProps) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-content"
      className={`sct-collapsible-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
