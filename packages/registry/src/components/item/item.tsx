import "./item.css";

export interface ItemProps extends React.ComponentProps<"div"> {
  selected?: boolean;
  disabled?: boolean;
}

export function Item({ selected, disabled, className, ...props }: ItemProps) {
  return (
    <div
      data-slot="item"
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      aria-selected={selected}
      aria-disabled={disabled}
      className={`sct-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
