import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import "./hover-card.css";

export const HoverCard = BasePreviewCard.Root;
export type HoverCardProps = React.ComponentProps<typeof BasePreviewCard.Root>;

export function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Trigger>) {
  return <BasePreviewCard.Trigger data-slot="hover-card-trigger" {...props} />;
}

export interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  positionerProps?: React.ComponentProps<typeof BasePreviewCard.Positioner>;
}

export function HoverCardContent({
  className,
  children,
  positionerProps,
  ...props
}: HoverCardContentProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner sideOffset={8} {...positionerProps}>
        <BasePreviewCard.Popup
          data-slot="hover-card-content"
          className={`sct-hover-card-content${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}
