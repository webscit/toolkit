import "./native-select.css";

export function NativeSelect({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="native-select"
      className={`sct-native-select${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
