import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import "./navigation-menu.css";

export type NavigationMenuProps = React.ComponentProps<typeof BaseNav.Root>;

export function NavigationMenu({ className, ...props }: NavigationMenuProps) {
  return (
    <BaseNav.Root
      data-slot="navigation-menu"
      className={`sct-navigation-menu${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type NavigationMenuListProps = React.ComponentProps<typeof BaseNav.List>;

export function NavigationMenuList({
  className,
  ...props
}: NavigationMenuListProps) {
  return (
    <BaseNav.List
      data-slot="navigation-menu-list"
      className={`sct-navigation-menu-list${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type NavigationMenuItemProps = React.ComponentProps<typeof BaseNav.Item>;

export function NavigationMenuItem({
  className,
  ...props
}: NavigationMenuItemProps) {
  return (
    <BaseNav.Item
      data-slot="navigation-menu-item"
      className={`sct-navigation-menu-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type NavigationMenuTriggerProps = React.ComponentProps<
  typeof BaseNav.Trigger
>;

export function NavigationMenuTrigger({
  className,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <BaseNav.Trigger
      data-slot="navigation-menu-trigger"
      className={`sct-navigation-menu-trigger${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface NavigationMenuContentProps extends React.ComponentProps<
  typeof BaseNav.Content
> {
  positionerProps?: React.ComponentProps<typeof BaseNav.Positioner>;
}

export function NavigationMenuContent({
  className,
  children,
  positionerProps,
  ...props
}: NavigationMenuContentProps) {
  return (
    <BaseNav.Portal>
      <BaseNav.Positioner sideOffset={4} {...positionerProps}>
        <BaseNav.Popup>
          <BaseNav.Content
            data-slot="navigation-menu-content"
            className={`sct-navigation-menu-content${className ? ` ${className}` : ""}`}
            {...props}
          >
            {children}
          </BaseNav.Content>
        </BaseNav.Popup>
      </BaseNav.Positioner>
    </BaseNav.Portal>
  );
}

export type NavigationMenuLinkProps = React.ComponentProps<typeof BaseNav.Link>;

export function NavigationMenuLink({
  className,
  ...props
}: NavigationMenuLinkProps) {
  return (
    <BaseNav.Link
      data-slot="navigation-menu-link"
      className={`sct-navigation-menu-link${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
