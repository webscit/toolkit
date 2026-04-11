import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import "./menubar.css";

export function Menubar({ className, ...props }: React.ComponentProps<typeof BaseMenubar>) {
  return (
    <BaseMenubar
      data-slot="menubar"
      className={`sct-menubar${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export const MenubarMenu = BaseMenu.Root;
export type MenubarMenuProps = React.ComponentProps<typeof BaseMenu.Root>;

export function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof BaseMenu.Trigger>) {
  return (
    <BaseMenu.Trigger
      data-slot="menubar-trigger"
      className={`sct-menubar-trigger${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  positionerProps?: React.ComponentProps<typeof BaseMenu.Positioner>;
}

export function MenubarContent({ className, children, positionerProps, ...props }: MenubarContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={4} {...positionerProps}>
        <BaseMenu.Popup
          data-slot="menubar-content"
          className={`sct-menubar-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export interface MenubarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export function MenubarItem({ className, ...props }: MenubarItemProps) {
  return (
    <BaseMenu.Item
      data-slot="menubar-item"
      className={`sct-menubar-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function MenubarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      data-slot="menubar-separator"
      className={`sct-menubar-separator${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function MenubarLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <BaseMenu.GroupLabel
      data-slot="menubar-label"
      className={`sct-menubar-label${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface MenubarCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export function MenubarCheckboxItem({ className, children, ...props }: MenubarCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={`sct-menubar-item sct-menubar-checkbox-item${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseMenu.CheckboxItemIndicator className="sct-menubar-item-indicator">
        <svg viewBox="0 0 14 14" aria-hidden="true" fill="none" width="14" height="14">
          <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export const MenubarRadioGroup = BaseMenu.RadioGroup;
export type MenubarRadioGroupProps = React.ComponentProps<typeof BaseMenu.RadioGroup>;

export interface MenubarRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export function MenubarRadioItem({ className, children, ...props }: MenubarRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      data-slot="menubar-radio-item"
      className={`sct-menubar-item sct-menubar-radio-item${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseMenu.RadioItemIndicator className="sct-menubar-item-indicator">
        <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" width="16" height="16">
          <circle cx="8" cy="8" r="3" />
        </svg>
      </BaseMenu.RadioItemIndicator>
      {children}
    </BaseMenu.RadioItem>
  );
}

export const MenubarSub = BaseMenu.SubmenuRoot;
export type MenubarSubProps = React.ComponentProps<typeof BaseMenu.SubmenuRoot>;

export function MenubarSubTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="menubar-sub-trigger"
      className={`sct-menubar-item sct-menubar-sub-trigger${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14" className="sct-menubar-chevron">
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </BaseMenu.SubmenuTrigger>
  );
}

export function MenubarSubContent({ className, children, positionerProps, ...props }: MenubarContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner side="right" {...positionerProps}>
        <BaseMenu.Popup
          data-slot="menubar-sub-content"
          className={`sct-menubar-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={`sct-menubar-shortcut${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
