import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import "./scroll-area.css";

export type ScrollAreaProps = React.ComponentProps<typeof BaseScrollArea.Root>;

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root
      data-slot="scroll-area"
      className={`sct-scroll-area${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseScrollArea.Viewport
        data-slot="scroll-area-viewport"
        className="sct-scroll-area-viewport"
      >
        {children}
      </BaseScrollArea.Viewport>
      <ScrollBar />
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  );
}

export interface ScrollBarProps
  extends React.ComponentProps<typeof BaseScrollArea.Scrollbar> {
  orientation?: "vertical" | "horizontal";
}

export function ScrollBar({
  orientation = "vertical",
  className,
  ...props
}: ScrollBarProps) {
  return (
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={`sct-scroll-bar${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseScrollArea.Thumb
        data-slot="scroll-area-thumb"
        className="sct-scroll-area-thumb"
      />
    </BaseScrollArea.Scrollbar>
  );
}
