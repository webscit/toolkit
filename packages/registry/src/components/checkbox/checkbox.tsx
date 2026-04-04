import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
import './checkbox.css';

export type CheckboxProps = React.ComponentProps<typeof BaseCheckbox.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={`sct-checkbox${className ? ` ${className}` : ''}`}
      {...props}
    >
      <BaseCheckbox.Indicator data-slot="checkbox-indicator" className="sct-checkbox-indicator">
        <svg viewBox="0 0 14 14" aria-hidden="true">
          <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
