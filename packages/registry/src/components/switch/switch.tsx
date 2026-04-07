import { Switch as BaseSwitch } from '@base-ui/react/switch';
import './switch.css';

export type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={`sct-switch${className ? ` ${className}` : ''}`}
      {...props}
    >
      <BaseSwitch.Thumb data-slot="switch-thumb" className="sct-switch-thumb" />
    </BaseSwitch.Root>
  );
}
