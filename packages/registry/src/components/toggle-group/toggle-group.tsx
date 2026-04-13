import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import "./toggle-group.css";

export type ToggleGroupProps = React.ComponentProps<typeof BaseToggleGroup>;

export function ToggleGroup({ className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      data-slot="toggle-group"
      className={`sct-toggle-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ToggleGroupItemProps extends React.ComponentProps<
  typeof BaseToggle
> {
  value: string;
}

export function ToggleGroupItem({ className, ...props }: ToggleGroupItemProps) {
  return (
    <BaseToggle
      data-slot="toggle-group-item"
      className={`sct-toggle-group-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
