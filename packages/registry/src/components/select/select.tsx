import { Select as BaseSelect } from "@base-ui/react/select";
import "./select.css";

export const Select = BaseSelect.Root;
export type SelectProps = React.ComponentProps<typeof BaseSelect.Root>;

export type SelectTriggerProps = React.ComponentProps<typeof BaseSelect.Trigger>;
export function SelectTrigger({
  className,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      className={`sct-select-trigger${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
      <BaseSelect.Icon className="sct-select-icon">
        <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export type SelectValueProps = React.ComponentProps<typeof BaseSelect.Value>;
export function SelectValue({ ...props }: SelectValueProps) {
  return <BaseSelect.Value data-slot="select-value" {...props} />;
}

export interface SelectContentProps extends React.ComponentProps<typeof BaseSelect.Popup> {
  positionerProps?: React.ComponentProps<typeof BaseSelect.Positioner>;
}
export function SelectContent({
  className,
  children,
  positionerProps,
  ...props
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={4} {...positionerProps}>
        <BaseSelect.Popup
          data-slot="select-content"
          className={`sct-select-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export type SelectItemProps = React.ComponentProps<typeof BaseSelect.Item>;
export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
      className={`sct-select-item${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseSelect.ItemIndicator className="sct-select-item-indicator">
        <svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
          <path
            d="M3 8l4 4 6-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

export function SelectGroup({ className, ...props }: React.ComponentProps<typeof BaseSelect.Group>) {
  return (
    <BaseSelect.Group
      data-slot="select-group"
      className={`sct-select-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof BaseSelect.ScrollUpArrow>) {
  return (
    <BaseSelect.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={`sct-select-scroll-button${className ? ` ${className}` : ""}`}
      {...props}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" width="14" height="14">
        <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </BaseSelect.ScrollUpArrow>
  );
}

export function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof BaseSelect.ScrollDownArrow>) {
  return (
    <BaseSelect.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={`sct-select-scroll-button${className ? ` ${className}` : ""}`}
      {...props}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" width="14" height="14">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </BaseSelect.ScrollDownArrow>
  );
}

export type SelectSeparatorProps = React.ComponentProps<typeof BaseSelect.Separator>;
export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <BaseSelect.Separator
      data-slot="select-separator"
      className={`sct-select-separator${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SelectLabelProps = React.ComponentProps<typeof BaseSelect.GroupLabel>;
export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <BaseSelect.GroupLabel
      data-slot="select-label"
      className={`sct-select-label${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
