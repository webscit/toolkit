import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import "./radio-group.css";

export type RadioGroupProps = React.ComponentProps<typeof BaseRadioGroup>;

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      className={`sct-radio-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type RadioGroupItemProps = React.ComponentProps<typeof BaseRadio.Root>;

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <BaseRadio.Root
      data-slot="radio-group-item"
      className={`sct-radio-group-item${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseRadio.Indicator
        data-slot="radio-group-indicator"
        className="sct-radio-group-indicator"
      >
        <span className="sct-radio-group-indicator-icon" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  );
}
