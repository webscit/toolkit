import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import "./drawer.css";

export const Drawer = BaseDrawer.Root;
export type DrawerProps = React.ComponentProps<typeof BaseDrawer.Root>;

export function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof BaseDrawer.Trigger>) {
  return <BaseDrawer.Trigger data-slot="drawer-trigger" {...props} />;
}

export interface DrawerContentProps extends React.ComponentProps<
  typeof BaseDrawer.Popup
> {
  side?: "left" | "right" | "top" | "bottom";
}

export function DrawerContent({
  className,
  side = "right",
  children,
  ...props
}: DrawerContentProps) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className="sct-drawer-backdrop" />
      <BaseDrawer.Popup
        role="dialog"
        aria-modal="true"
        data-slot="drawer-content"
        data-side={side}
        className={`sct-drawer-content${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
      </BaseDrawer.Popup>
    </BaseDrawer.Portal>
  );
}

export function DrawerHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={`sct-drawer-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function DrawerFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={`sct-drawer-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title
      data-slot="drawer-title"
      className={`sct-drawer-title${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Description>) {
  return (
    <BaseDrawer.Description
      data-slot="drawer-description"
      className={`sct-drawer-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function DrawerClose({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Close>) {
  return (
    <BaseDrawer.Close
      data-slot="drawer-close"
      className={`sct-drawer-close${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
