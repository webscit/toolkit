import "./pagination.css";

export function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      className={`sct-pagination${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={`sct-pagination-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={`sct-pagination-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface PaginationLinkProps extends React.ComponentProps<"a"> {
  isActive?: boolean;
}

export function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive || undefined}
      className={`sct-pagination-link${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function PaginationPrevious({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      aria-label="Go to previous page"
      data-slot="pagination-previous"
      className={`sct-pagination-link sct-pagination-previous${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children ?? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Previous</span>
        </>
      )}
    </a>
  );
}

export function PaginationNext({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      aria-label="Go to next page"
      data-slot="pagination-next"
      className={`sct-pagination-link sct-pagination-next${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children ?? (
        <>
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </a>
  );
}

export function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      className={`sct-pagination-ellipsis${className ? ` ${className}` : ""}`}
      {...props}
    >
      …
    </span>
  );
}
