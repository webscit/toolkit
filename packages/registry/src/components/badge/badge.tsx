import "./badge.css";

export interface BadgeProps extends React.ComponentProps<"span"> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
}

export function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={`sct-badge${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
