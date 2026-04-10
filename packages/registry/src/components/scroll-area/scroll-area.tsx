import "./scroll-area.css";

export type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement>;

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div
      data-slot="scroll-area"
      className={`sct-scroll-area${className ? ` ${className}` : ""}`}
      {...props}
    >
      <div data-slot="scroll-area-viewport" className="sct-scroll-area-viewport">
        {children}
      </div>
    </div>
  );
}

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

export function ScrollBar({
  orientation = "vertical",
  className,
  ...props
}: ScrollBarProps) {
  return (
    <div
      data-slot="scroll-bar"
      data-orientation={orientation}
      className={`sct-scroll-bar${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
