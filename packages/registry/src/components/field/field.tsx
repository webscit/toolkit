import { Field as BaseField } from "@base-ui/react/field";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { Separator } from "../separator/separator";
import "./field.css";

// --- Field (single field) ---

export interface FieldProps
  extends React.ComponentProps<typeof BaseField.Root> {
  className?: string;
}

export function Field({ className, ...props }: FieldProps) {
  return (
    <BaseField.Root
      data-slot="field"
      className={`sct-field${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface FieldLabelProps
  extends React.ComponentProps<typeof BaseField.Label> {
  className?: string;
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      data-slot="field-label"
      className={`sct-field-label${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type FieldDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export function FieldDescription({
  className,
  ...props
}: FieldDescriptionProps) {
  return (
    <BaseField.Description
      data-slot="field-description"
      className={`sct-field-description${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type FieldErrorProps = React.HTMLAttributes<HTMLDivElement>;

export function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <BaseField.Error
      data-slot="field-error"
      className={`sct-field-error${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export const FieldValidity = BaseField.Validity;
export type FieldValidityProps = React.ComponentProps<typeof BaseField.Validity>;

// --- Fieldset ---

export interface FieldSetProps
  extends React.ComponentProps<typeof BaseFieldset.Root> {
  className?: string;
}

export function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <BaseFieldset.Root
      data-slot="fieldset"
      className={`sct-fieldset${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type FieldLegendProps = React.ComponentProps<
  typeof BaseFieldset.Legend
>;

export function FieldLegend({ className, ...props }: FieldLegendProps) {
  return (
    <BaseFieldset.Legend
      data-slot="field-legend"
      className={`sct-field-legend${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// --- Layout helpers ---

export type FieldGroupProps = React.HTMLAttributes<HTMLDivElement>;

export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={`sct-field-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type FieldContentProps = React.HTMLAttributes<HTMLDivElement>;

export function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      data-slot="field-content"
      className={`sct-field-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type FieldSeparatorProps = React.ComponentProps<typeof Separator>;

export function FieldSeparator(props: FieldSeparatorProps) {
  return <Separator data-slot="field-separator" {...props} />;
}
