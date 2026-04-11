import { Button as BaseButton } from "@base-ui/react/button";
import "./button.css";

export interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon";
}

export function Button({
  variant = "default",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={`sct-button${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
