import './label.css';

export type LabelProps = React.ComponentProps<'label'>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={`sct-label${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}
