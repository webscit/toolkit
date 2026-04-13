import "./kbd.css";

export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={`sct-kbd${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
