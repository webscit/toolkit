import { Input as InputPrimitive } from "@base-ui/react/input";
import "./input.css";

export type InputProps = React.ComponentProps<typeof InputPrimitive>;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={`sct-input${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
