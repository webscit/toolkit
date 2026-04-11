import "./spinner.css";

export interface SpinnerProps extends React.ComponentProps<"span"> {
  size?: "sm" | "default" | "lg";
}

export function Spinner({ size = "default", className, ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      data-size={size}
      className={`sct-spinner${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
