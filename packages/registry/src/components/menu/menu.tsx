import { Menu as BaseMenu } from '@base-ui/react/menu';
import './menu.css';

export const Menu = BaseMenu.Root;
export type MenuProps = React.ComponentProps<typeof BaseMenu.Root>;

export interface MenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export function MenuTrigger({ ...props }: MenuTriggerProps) {
  return <BaseMenu.Trigger data-slot="menu-trigger" {...props} />;
}

export interface MenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  positionerProps?: React.ComponentProps<typeof BaseMenu.Positioner>;
}
export function MenuContent({ className, children, positionerProps, ...props }: MenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={4} {...positionerProps}>
        <BaseMenu.Popup
          data-slot="menu-content"
          className={`sct-menu-content${className ? ` ${className}` : ''}`}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  closeOnClick?: boolean;
}
export function MenuItem({ className, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      data-slot="menu-item"
      className={`sct-menu-item${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface MenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}
export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <div
      role="separator"
      data-slot="menu-separator"
      className={`sct-menu-separator${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}
export function MenuLabel({ className, ...props }: MenuLabelProps) {
  return (
    <BaseMenu.GroupLabel
      data-slot="menu-label"
      className={`sct-menu-label${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface MenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  closeOnClick?: boolean;
}
export function MenuCheckboxItem({ className, children, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="menu-checkbox-item"
      className={`sct-menu-item sct-menu-checkbox-item${className ? ` ${className}` : ''}`}
      {...props}
    >
      <BaseMenu.CheckboxItemIndicator className="sct-menu-item-indicator">
        <svg viewBox="0 0 14 14" aria-hidden="true" fill="none">
          <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export const MenuRadioGroup = BaseMenu.RadioGroup;
export type MenuRadioGroupProps = React.ComponentProps<typeof BaseMenu.RadioGroup>;

export interface MenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  closeOnClick?: boolean;
}
export function MenuRadioItem({ className, children, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      data-slot="menu-radio-item"
      className={`sct-menu-item sct-menu-radio-item${className ? ` ${className}` : ''}`}
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
