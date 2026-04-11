import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import "./toggle.css";

export interface ToggleProps extends React.ComponentProps<typeof BaseToggle> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

export function Toggle({
  variant = "default",
  size = "default",
  className,
  ...props
}: ToggleProps) {
  return (
    <BaseToggle
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={`sct-toggle${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
