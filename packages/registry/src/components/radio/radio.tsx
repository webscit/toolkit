import { Radio as BaseRadio } from '@base-ui-components/react/radio';
import './radio.css';

export type RadioProps = React.ComponentProps<typeof BaseRadio.Root>;

export function Radio({ className, ...props }: RadioProps) {
  return (
    <BaseRadio.Root
      data-slot="radio"
      className={`sct-radio${className ? ` ${className}` : ''}`}
      {...props}
    >
      <BaseRadio.Indicator data-slot="radio-indicator" className="sct-radio-indicator" />
    </BaseRadio.Root>
  );
}
