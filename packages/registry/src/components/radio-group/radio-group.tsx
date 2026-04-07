import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import './radio-group.css';

export interface RadioGroupProps extends React.ComponentProps<typeof BaseRadioGroup> {
  orientation?: 'horizontal' | 'vertical';
}

export function RadioGroup({ orientation = 'vertical', className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      data-orientation={orientation}
      className={`sct-radio-group${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}
