import { Select as BaseSelect } from '@base-ui-components/react/select';
import './select.css';

export const Select = BaseSelect.Root;
export type SelectProps = React.ComponentProps<typeof BaseSelect.Root>;

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      className={`sct-select-trigger${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
      <BaseSelect.Icon className="sct-select-icon">
        <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}
export function SelectValue({ ...props }: SelectValueProps) {
  return <BaseSelect.Value data-slot="select-value" {...props} />;
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  positionerProps?: React.ComponentProps<typeof BaseSelect.Positioner>;
}
export function SelectContent({ className, children, positionerProps, ...props }: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={4} {...positionerProps}>
        <BaseSelect.Popup
          data-slot="select-content"
          className={`sct-select-content${className ? ` ${className}` : ''}`}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}
export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
      className={`sct-select-item${className ? ` ${className}` : ''}`}
      {...props}
    >
      <BaseSelect.ItemIndicator className="sct-select-item-indicator">
        <svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
          <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

export interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}
export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <div
      role="separator"
      data-slot="select-separator"
      className={`sct-select-separator${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}
export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <BaseSelect.GroupLabel
      data-slot="select-label"
      className={`sct-select-label${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}
