import './checkbox-group.css';

export interface CheckboxGroupProps extends React.ComponentProps<'fieldset'> {
  legend?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

export function CheckboxGroup({ legend, orientation = 'vertical', className, children, ...props }: CheckboxGroupProps) {
  return (
    <fieldset
      data-slot="checkbox-group"
      data-orientation={orientation}
      className={`sct-checkbox-group${className ? ` ${className}` : ''}`}
      {...props}
    >
      {legend && <legend className="sct-checkbox-group-legend">{legend}</legend>}
      {children}
    </fieldset>
  );
}
