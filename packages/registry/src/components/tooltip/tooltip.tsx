import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import "./tooltip.css";

export function TooltipProvider({
  delay = 0,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Provider>) {
  return <BaseTooltip.Provider data-slot="tooltip-provider" delay={delay} {...props} />;
}
export type TooltipProviderProps = React.ComponentProps<
  typeof BaseTooltip.Provider
>;

export function Tooltip({ ...props }: React.ComponentProps<typeof BaseTooltip.Root>) {
  return <BaseTooltip.Root data-slot="tooltip" {...props} />;
}
export type TooltipProps = React.ComponentProps<typeof BaseTooltip.Root>;

export type TooltipTriggerProps = React.ComponentProps<
  typeof BaseTooltip.Trigger
>;
export function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />;
}

export interface TooltipContentProps
  extends React.ComponentProps<typeof BaseTooltip.Popup>,
    Pick<
      React.ComponentProps<typeof BaseTooltip.Positioner>,
      "align" | "alignOffset" | "side" | "sideOffset"
    > {}

export function TooltipContent({
  className,
  children,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <BaseTooltip.Popup
          data-slot="tooltip-content"
          className={`sct-tooltip-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
