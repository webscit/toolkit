import "./breadcrumb.css";

export function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={`sct-breadcrumb${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={`sct-breadcrumb-list${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={`sct-breadcrumb-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={`sct-breadcrumb-link${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      data-slot="breadcrumb-page"
      className={`sct-breadcrumb-page${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  className,
  children,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={`sct-breadcrumb-separator${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children ?? "/"}
    </li>
  );
}

export function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-ellipsis"
      className={`sct-breadcrumb-ellipsis${className ? ` ${className}` : ""}`}
      {...props}
    >
      …
    </span>
  );
}
