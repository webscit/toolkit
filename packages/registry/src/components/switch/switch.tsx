import { Switch as BaseSwitch } from "@base-ui/react/switch";
import "./switch.css";

export type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root> & {
  size?: "sm" | "default";
};

export function Switch({ className, size = "default", ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      data-size={size !== "default" ? size : undefined}
      className={`sct-switch${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseSwitch.Thumb data-slot="switch-thumb" className="sct-switch-thumb" />
    </BaseSwitch.Root>
  );
}
