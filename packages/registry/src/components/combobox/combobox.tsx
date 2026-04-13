import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import "./combobox.css";

export const Combobox = BaseCombobox.Root;
export type ComboboxProps = React.ComponentProps<typeof BaseCombobox.Root>;

export const ComboboxLabel = BaseCombobox.Label;
export type ComboboxLabelProps = React.ComponentProps<
  typeof BaseCombobox.Label
>;

export function ComboboxInput({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input>) {
  return (
    <BaseCombobox.Input
      data-slot="combobox-input"
      className={`sct-combobox-input${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function ComboboxTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Trigger>) {
  return (
    <BaseCombobox.Trigger
      data-slot="combobox-trigger"
      className={`sct-combobox-trigger${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ComboboxContentProps extends React.HTMLAttributes<HTMLDivElement> {
  positionerProps?: React.ComponentProps<typeof BaseCombobox.Positioner>;
}

export function ComboboxContent({
  className,
  children,
  positionerProps,
  ...props
}: ComboboxContentProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={4} {...positionerProps}>
        <BaseCombobox.Popup
          data-slot="combobox-content"
          className={`sct-combobox-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          <BaseCombobox.List className="sct-combobox-list">
            {children}
          </BaseCombobox.List>
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export interface ComboboxItemProps extends React.ComponentProps<
  typeof BaseCombobox.Item
> {}

export function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxItemProps) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item"
      className={`sct-combobox-item${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseCombobox.ItemIndicator className="sct-combobox-item-indicator">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          fill="none"
          width="14"
          height="14"
        >
          <path
            d="M3 8l4 4 6-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseCombobox.ItemIndicator>
      {children}
    </BaseCombobox.Item>
  );
}

export function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Empty>) {
  return (
    <BaseCombobox.Empty
      data-slot="combobox-empty"
      className={`sct-combobox-empty${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface ComboboxGroupProps extends React.ComponentProps<
  typeof BaseCombobox.Group
> {
  label?: string;
}

export function ComboboxGroup({
  label,
  className,
  children,
  ...props
}: ComboboxGroupProps) {
  return (
    <BaseCombobox.Group
      data-slot="combobox-group"
      className={`sct-combobox-group${className ? ` ${className}` : ""}`}
      {...props}
    >
      {label && (
        <BaseCombobox.GroupLabel className="sct-combobox-group-label">
          {label}
        </BaseCombobox.GroupLabel>
      )}
      {children}
    </BaseCombobox.Group>
  );
}
