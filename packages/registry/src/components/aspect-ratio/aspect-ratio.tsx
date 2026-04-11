import "./aspect-ratio.css";

export interface AspectRatioProps extends React.ComponentProps<"div"> {
  ratio?: number;
}

export function AspectRatio({
  ratio = 16 / 9,
  className,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      className={`sct-aspect-ratio${className ? ` ${className}` : ""}`}
      style={{ "--sct-aspect-ratio": String(ratio), ...style } as React.CSSProperties}
      {...props}
    />
  );
}
