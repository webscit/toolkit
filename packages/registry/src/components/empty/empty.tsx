import "./empty.css";

export function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={`sct-empty${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function EmptyIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-icon"
      className={`sct-empty-icon${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function EmptyTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-title"
      className={`sct-empty-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={`sct-empty-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function EmptyAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-action"
      className={`sct-empty-action${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
