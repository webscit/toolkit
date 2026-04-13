import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import "./collapsible.css";

export const Collapsible = BaseCollapsible.Root;
export type CollapsibleProps = React.ComponentProps<
  typeof BaseCollapsible.Root
>;

export type CollapsibleTriggerProps = React.ComponentProps<
  typeof BaseCollapsible.Trigger
>;

export function CollapsibleTrigger({ ...props }: CollapsibleTriggerProps) {
  return <BaseCollapsible.Trigger data-slot="collapsible-trigger" {...props} />;
}

export type CollapsibleContentProps = React.ComponentProps<
  typeof BaseCollapsible.Panel
>;

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
