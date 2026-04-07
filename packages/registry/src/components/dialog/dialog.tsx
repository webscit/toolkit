import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import './dialog.css';

export const Dialog = BaseDialog.Root;
export type DialogProps = React.ComponentProps<typeof BaseDialog.Root>;

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogPortal(props: React.ComponentProps<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal {...props} />;
}

export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}
export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <BaseDialog.Backdrop
      data-slot="dialog-overlay"
      className={`sct-dialog-overlay${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <DialogOverlay />
      <BaseDialog.Popup
        data-slot="dialog-content"
        className={`sct-dialog-content${className ? ` ${className}` : ''}`}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={`sct-dialog-header${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={`sct-dialog-footer${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      className={`sct-dialog-title${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      className={`sct-dialog-description${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export function DialogClose({ className, ...props }: DialogCloseProps) {
  return (
    <BaseDialog.Close
      data-slot="dialog-close"
      className={`sct-dialog-close${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}
