import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import "./sheet.css";

export const Sheet = BaseDialog.Root;
export type SheetProps = React.ComponentProps<typeof BaseDialog.Root>;

export type SheetTriggerProps = React.ComponentProps<typeof BaseDialog.Trigger>;

export function SheetTrigger({ ...props }: SheetTriggerProps) {
  return <BaseDialog.Trigger data-slot="sheet-trigger" {...props} />;
}

export type SheetOverlayProps = React.ComponentProps<
  typeof BaseDialog.Backdrop
>;

export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <BaseDialog.Backdrop
      data-slot="sheet-overlay"
      className={`sct-sheet-overlay${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SheetContentProps extends React.ComponentProps<
  typeof BaseDialog.Popup
> {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}

export function SheetContent({
  side = "right",
  showCloseButton = false,
  className,
  children,
  ...props
}: SheetContentProps) {
  return (
    <BaseDialog.Portal>
      <SheetOverlay />
      <BaseDialog.Popup
        data-slot="sheet-content"
        data-side={side}
        className={`sct-sheet-content${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
        {showCloseButton && (
          <BaseDialog.Close
            data-slot="sheet-close"
            className="sct-sheet-close-icon"
          />
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export type SheetHeaderProps = React.ComponentProps<"div">;

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={`sct-sheet-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SheetFooterProps = React.ComponentProps<"div">;

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      data-slot="sheet-footer"
      className={`sct-sheet-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SheetTitleProps = React.ComponentProps<typeof BaseDialog.Title>;

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <BaseDialog.Title
      data-slot="sheet-title"
      className={`sct-sheet-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SheetDescriptionProps = React.ComponentProps<
  typeof BaseDialog.Description
>;

export function SheetDescription({
  className,
  ...props
}: SheetDescriptionProps) {
  return (
    <BaseDialog.Description
      data-slot="sheet-description"
      className={`sct-sheet-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SheetCloseProps = React.ComponentProps<typeof BaseDialog.Close>;

export function SheetClose({ ...props }: SheetCloseProps) {
  return <BaseDialog.Close data-slot="sheet-close" {...props} />;
}
