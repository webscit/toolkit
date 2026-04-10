import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import "./alert-dialog.css";

export const AlertDialog = BaseAlertDialog.Root;
export type AlertDialogProps = React.ComponentProps<
  typeof BaseAlertDialog.Root
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertDialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AlertDialogTrigger({ ...props }: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

export type AlertDialogOverlayProps = React.HTMLAttributes<HTMLDivElement>;

export function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogOverlayProps) {
  return (
    <BaseAlertDialog.Backdrop
      data-slot="alert-dialog-overlay"
      className={`sct-alert-dialog-overlay${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type AlertDialogContentProps = React.HTMLAttributes<HTMLDivElement>;

export function AlertDialogContent({
  className,
  children,
  ...props
}: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <AlertDialogOverlay />
      <BaseAlertDialog.Popup
        data-slot="alert-dialog-content"
        className={`sct-alert-dialog-content${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
}

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function AlertDialogHeader({
  className,
  ...props
}: AlertDialogHeaderProps) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={`sct-alert-dialog-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function AlertDialogFooter({
  className,
  ...props
}: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={`sct-alert-dialog-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type AlertDialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      data-slot="alert-dialog-title"
      className={`sct-alert-dialog-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type AlertDialogDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      data-slot="alert-dialog-description"
      className={`sct-alert-dialog-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertDialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AlertDialogAction({ ...props }: AlertDialogActionProps) {
  return <button data-slot="alert-dialog-action" {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertDialogCancelProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AlertDialogCancel({ ...props }: AlertDialogCancelProps) {
  return <BaseAlertDialog.Close data-slot="alert-dialog-cancel" {...props} />;
}
