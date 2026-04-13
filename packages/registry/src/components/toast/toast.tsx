import { Toast as BaseToast } from "@base-ui/react/toast";
import "./toast.css";

export const useToastManager = BaseToast.useToastManager;
export const createToastManager = BaseToast.createToastManager;

export const ToastProvider = BaseToast.Provider;
export type ToastProviderProps = React.ComponentProps<
  typeof BaseToast.Provider
>;

export type ToastViewportProps = React.HTMLAttributes<HTMLDivElement>;

export function ToastViewport({ className, ...props }: ToastViewportProps) {
  return (
    <BaseToast.Viewport
      data-slot="toast-viewport"
      className={`sct-toast-viewport${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type ToastProps = React.ComponentProps<typeof BaseToast.Root>;

export function Toast({ className, ...props }: ToastProps) {
  const variant = props.toast?.type ?? "default";
  return (
    <BaseToast.Root
      data-slot="toast"
      data-variant={variant}
      className={`sct-toast${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type ToastContentProps = React.HTMLAttributes<HTMLDivElement>;

export function ToastContent({ className, ...props }: ToastContentProps) {
  return (
    <BaseToast.Content
      data-slot="toast-content"
      className={`sct-toast-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type ToastTitleProps = React.HTMLAttributes<HTMLDivElement>;

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <BaseToast.Title
      data-slot="toast-title"
      className={`sct-toast-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type ToastDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return (
    <BaseToast.Description
      data-slot="toast-description"
      className={`sct-toast-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type ToastCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ToastClose({ ...props }: ToastCloseProps) {
  return (
    <BaseToast.Close
      data-slot="toast-close"
      // Override aria-hidden so Close is always accessible
      aria-hidden={false}
      {...props}
    />
  );
}

export type ToastActionProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ToastAction({ ...props }: ToastActionProps) {
  return <BaseToast.Action data-slot="toast-action" {...props} />;
}
