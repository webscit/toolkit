import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import './tooltip.css';

export const TooltipProvider = BaseTooltip.Provider;
export type TooltipProviderProps = React.ComponentProps<typeof BaseTooltip.Provider>;

export const Tooltip = BaseTooltip.Root;
export type TooltipProps = React.ComponentProps<typeof BaseTooltip.Root>;

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {}
export function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />;
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  positionerProps?: React.ComponentProps<typeof BaseTooltip.Positioner>;
}
export function TooltipContent({ className, children, positionerProps, ...props }: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner sideOffset={4} {...positionerProps}>
        <BaseTooltip.Popup
          data-slot="tooltip-content"
          className={`sct-tooltip-content${className ? ` ${className}` : ''}`}
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
