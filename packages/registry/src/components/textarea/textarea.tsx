import './textarea.css';

export type TextareaProps = React.ComponentProps<'textarea'>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={`sct-textarea${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}
