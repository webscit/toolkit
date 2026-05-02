import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import "./separator.css";

export type SeparatorProps = SeparatorPrimitive.Props;

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={`sct-separator${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
