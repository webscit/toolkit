import './input.css';

export type InputProps = React.ComponentProps<'input'>;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`sct-input${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}
