import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import "./context-menu.css";

export const ContextMenu = BaseContextMenu.Root;
export type ContextMenuProps = React.ComponentProps<
  typeof BaseContextMenu.Root
>;

export function ContextMenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Trigger>) {
  return (
    <BaseContextMenu.Trigger
      data-slot="context-menu-trigger"
      className={`sct-context-menu-trigger${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  positionerProps?: React.ComponentProps<typeof BaseContextMenu.Positioner>;
}

export function ContextMenuContent({
  className,
  children,
  positionerProps,
  ...props
}: ContextMenuContentProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner {...positionerProps}>
        <BaseContextMenu.Popup
          data-slot="context-menu-content"
          className={`sct-context-menu-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

export type ContextMenuItemProps = React.ComponentProps<
  typeof BaseContextMenu.Item
>;

export function ContextMenuItem({ className, ...props }: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
      data-slot="context-menu-item"
      className={`sct-context-menu-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Separator>) {
  return (
    <BaseContextMenu.Separator
      data-slot="context-menu-separator"
      className={`sct-context-menu-separator${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function ContextMenuLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <BaseContextMenu.GroupLabel
      data-slot="context-menu-label"
      className={`sct-context-menu-label${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type ContextMenuCheckboxItemProps = React.ComponentProps<
  typeof BaseContextMenu.CheckboxItem
>;

export function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <BaseContextMenu.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={`sct-context-menu-item sct-context-menu-checkbox-item${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseContextMenu.CheckboxItemIndicator className="sct-context-menu-item-indicator">
        <svg
          viewBox="0 0 14 14"
          aria-hidden="true"
          fill="none"
          width="14"
          height="14"
        >
          <path
            d="M2 7l4 4 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseContextMenu.CheckboxItemIndicator>
      {children}
    </BaseContextMenu.CheckboxItem>
  );
}

export const ContextMenuRadioGroup = BaseContextMenu.RadioGroup;
export type ContextMenuRadioGroupProps = React.ComponentProps<
  typeof BaseContextMenu.RadioGroup
>;

export type ContextMenuRadioItemProps = React.ComponentProps<
  typeof BaseContextMenu.RadioItem
>;

export function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ContextMenuRadioItemProps) {
  return (
    <BaseContextMenu.RadioItem
      data-slot="context-menu-radio-item"
      className={`sct-context-menu-item sct-context-menu-radio-item${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseContextMenu.RadioItemIndicator className="sct-context-menu-item-indicator">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          fill="currentColor"
          width="16"
          height="16"
        >
          <circle cx="8" cy="8" r="3" />
        </svg>
      </BaseContextMenu.RadioItemIndicator>
      {children}
    </BaseContextMenu.RadioItem>
  );
}

export const ContextMenuSub = BaseContextMenu.SubmenuRoot;
export type ContextMenuSubProps = React.ComponentProps<
  typeof BaseContextMenu.SubmenuRoot
>;

export function ContextMenuSubTrigger({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <BaseContextMenu.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      className={`sct-context-menu-item sct-context-menu-sub-trigger${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        width="14"
        height="14"
        className="sct-context-menu-chevron"
      >
        <path
          d="M6 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </BaseContextMenu.SubmenuTrigger>
  );
}

export function ContextMenuSubContent({
  className,
  children,
  positionerProps,
  ...props
}: ContextMenuContentProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner side="right" {...positionerProps}>
        <BaseContextMenu.Popup
          data-slot="context-menu-sub-content"
          className={`sct-context-menu-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}
