import "./table.css";

export type TableProps = React.HTMLAttributes<HTMLTableElement>;

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="sct-table-wrapper">
      <table
        data-slot="table"
        className={`sct-table${className ? ` ${className}` : ""}`}
        {...props}
      />
    </div>
  );
}

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={`sct-table-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={`sct-table-body${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={`sct-table-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={`sct-table-row${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={`sct-table-head${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={`sct-table-cell${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={`sct-table-caption${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
