import "./alert.css";

export interface AlertProps extends React.ComponentProps<"div"> {
  variant?: "default" | "destructive";
}

export function Alert({
  variant = "default",
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      data-variant={variant}
      className={`sct-alert${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertTitleProps extends React.ComponentProps<"div"> {}
export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={`sct-alert-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertDescriptionProps extends React.ComponentProps<"div"> {}
export function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={`sct-alert-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertActionProps extends React.ComponentProps<"div"> {}
export function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div
      data-slot="alert-action"
      className={`sct-alert-action${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
