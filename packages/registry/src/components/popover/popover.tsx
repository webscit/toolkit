import { Popover as BasePopover } from "@base-ui/react/popover";
import "./popover.css";

export const Popover = BasePopover.Root;
export type PopoverProps = React.ComponentProps<typeof BasePopover.Root>;

export type PopoverTriggerProps = React.ComponentProps<
  typeof BasePopover.Trigger
>;

export function PopoverTrigger({ ...props }: PopoverTriggerProps) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

export interface PopoverContentProps
  extends
    React.ComponentProps<typeof BasePopover.Popup>,
    Pick<
      React.ComponentProps<typeof BasePopover.Positioner>,
      "align" | "alignOffset" | "side" | "sideOffset"
    > {}

export function PopoverContent({
  className,
  children,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
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

export type PopoverHeaderProps = React.ComponentProps<"div">;

export function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return (
    <div
      data-slot="popover-header"
      className={`sct-popover-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type PopoverTitleProps = React.ComponentProps<typeof BasePopover.Title>;

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      data-slot="popover-title"
      className={`sct-popover-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type PopoverDescriptionProps = React.ComponentProps<
  typeof BasePopover.Description
>;

export function PopoverDescription({
  className,
  ...props
}: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      data-slot="popover-description"
      className={`sct-popover-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type PopoverCloseProps = React.ComponentProps<typeof BasePopover.Close>;

export function PopoverClose({ ...props }: PopoverCloseProps) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
}
