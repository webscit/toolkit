import { Popover as BasePopover } from "@base-ui/react/popover";
import "./popover.css";

export const Popover = BasePopover.Root;
export type PopoverProps = React.ComponentProps<typeof BasePopover.Root>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PopoverTrigger({ ...props }: PopoverTriggerProps) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function PopoverContent({
  className,
  children,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner>
        <BasePopover.Popup
          data-slot="popover-content"
          className={`sct-popover-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PopoverClose({ ...props }: PopoverCloseProps) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
}
