import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import "./sheet.css";

export const Sheet = BaseDialog.Root;
export type SheetProps = React.ComponentProps<typeof BaseDialog.Root>;

export type SheetTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SheetTrigger({ ...props }: SheetTriggerProps) {
  return <BaseDialog.Trigger data-slot="sheet-trigger" {...props} />;
}

export type SheetOverlayProps = React.HTMLAttributes<HTMLDivElement>;

export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <BaseDialog.Backdrop
      data-slot="sheet-overlay"
      className={`sct-sheet-overlay${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SheetContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
}

export function SheetContent({
  side = "right",
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
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={`sct-sheet-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      data-slot="sheet-footer"
      className={`sct-sheet-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SheetTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <BaseDialog.Title
      data-slot="sheet-title"
      className={`sct-sheet-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SheetDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

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

export type SheetCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SheetClose({ ...props }: SheetCloseProps) {
  return <BaseDialog.Close data-slot="sheet-close" {...props} />;
}
