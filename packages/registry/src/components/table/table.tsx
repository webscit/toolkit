import "./table.css";

export type TableProps = React.ComponentProps<"table">;

export function Table({ className, ...props }: TableProps) {
  return (
    <div data-slot="table-container" className="sct-table-wrapper">
      <table
        data-slot="table"
        className={`sct-table${className ? ` ${className}` : ""}`}
        {...props}
      />
    </div>
  );
}

export type TableHeaderProps = React.ComponentProps<"thead">;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={`sct-table-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableBodyProps = React.ComponentProps<"tbody">;

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={`sct-table-body${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableFooterProps = React.ComponentProps<"tfoot">;

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={`sct-table-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableRowProps = React.ComponentProps<"tr">;

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={`sct-table-row${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableHeadProps = React.ComponentProps<"th">;

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={`sct-table-head${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableCellProps = React.ComponentProps<"td">;

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={`sct-table-cell${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableCaptionProps = React.ComponentProps<"caption">;

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={`sct-table-caption${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
