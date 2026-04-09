import "./input-group.css";

export type InputGroupProps = React.HTMLAttributes<HTMLDivElement>;

export function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={`sct-input-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type InputGroupAddonProps = React.HTMLAttributes<HTMLDivElement>;

export function InputGroupAddon({
  className,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      data-slot="input-group-addon"
      className={`sct-input-group-addon${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
