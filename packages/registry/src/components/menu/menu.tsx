import { Menu as BaseMenu } from "@base-ui/react/menu";
import "./menu.css";

export const Menu = BaseMenu.Root;
export type MenuProps = React.ComponentProps<typeof BaseMenu.Root>;

export type MenuTriggerProps = React.ComponentProps<typeof BaseMenu.Trigger>;
export function MenuTrigger({ ...props }: MenuTriggerProps) {
  return <BaseMenu.Trigger data-slot="menu-trigger" {...props} />;
}

export interface MenuContentProps extends React.ComponentProps<typeof BaseMenu.Popup> {
  positionerProps?: React.ComponentProps<typeof BaseMenu.Positioner>;
}
export function MenuContent({
  className,
  children,
  positionerProps,
  ...props
}: MenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={4} {...positionerProps}>
        <BaseMenu.Popup
          data-slot="menu-content"
          className={`sct-menu-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export interface MenuItemProps extends React.ComponentProps<typeof BaseMenu.Item> {
  inset?: boolean;
}
export function MenuItem({ className, inset, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      data-slot="menu-item"
      data-inset={inset || undefined}
      className={`sct-menu-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type MenuSeparatorProps = React.ComponentProps<typeof BaseMenu.Separator>;
export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      data-slot="menu-separator"
      className={`sct-menu-separator${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type MenuLabelProps = React.ComponentProps<typeof BaseMenu.GroupLabel>;
export function MenuLabel({ className, ...props }: MenuLabelProps) {
  return (
    <BaseMenu.GroupLabel
      data-slot="menu-label"
      className={`sct-menu-label${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type MenuCheckboxItemProps = React.ComponentProps<typeof BaseMenu.CheckboxItem>;
export function MenuCheckboxItem({
  className,
  children,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="menu-checkbox-item"
      className={`sct-menu-item sct-menu-checkbox-item${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseMenu.CheckboxItemIndicator className="sct-menu-item-indicator">
        <svg viewBox="0 0 14 14" aria-hidden="true" fill="none">
          <path
            d="M2 7l4 4 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export function MenuGroup({ className, ...props }: React.ComponentProps<typeof BaseMenu.Group>) {
  return (
    <BaseMenu.Group
      data-slot="menu-group"
      className={`sct-menu-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menu-shortcut"
      className={`sct-menu-shortcut${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export const MenuSub = BaseMenu.SubmenuRoot;
export type MenuSubProps = React.ComponentProps<typeof BaseMenu.SubmenuRoot>;

export function MenuSubTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="menu-sub-trigger"
      className={`sct-menu-item sct-menu-sub-trigger${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14" className="sct-menu-chevron">
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </BaseMenu.SubmenuTrigger>
  );
}

export interface MenuSubContentProps extends React.ComponentProps<typeof BaseMenu.Popup> {
  positionerProps?: React.ComponentProps<typeof BaseMenu.Positioner>;
}

export function MenuSubContent({ className, children, positionerProps, ...props }: MenuSubContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner side="right" {...positionerProps}>
        <BaseMenu.Popup
          data-slot="menu-sub-content"
          className={`sct-menu-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export const MenuRadioGroup = BaseMenu.RadioGroup;
export type MenuRadioGroupProps = React.ComponentProps<
  typeof BaseMenu.RadioGroup
>;

export type MenuRadioItemProps = React.ComponentProps<typeof BaseMenu.RadioItem>;
export function MenuRadioItem({
  className,
  children,
  ...props
}: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      data-slot="menu-radio-item"
      className={`sct-menu-item sct-menu-radio-item${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseMenu.RadioItemIndicator className="sct-menu-item-indicator">
        <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          <circle cx="8" cy="8" r="3" />
        </svg>
      </BaseMenu.RadioItemIndicator>
      {children}
    </BaseMenu.RadioItem>
  );
}
