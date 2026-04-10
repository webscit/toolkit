import {
  Group as PanelGroup,
  Panel,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";
import type { ComponentProps } from "react";
import "./resizable.css";

export interface ResizablePanelGroupProps
  extends ComponentProps<typeof PanelGroup> {
  "data-testid"?: string;
  direction?: "horizontal" | "vertical";
}

export function ResizablePanelGroup({
  className,
  "data-testid": testId,
  id,
  ...props
}: ResizablePanelGroupProps) {
  // react-resizable-panels sets data-testid from the id prop.
  // Forward data-testid as id so tests can locate the element.
  const resolvedId = id ?? testId;
  return (
    <PanelGroup
      id={resolvedId}
      data-slot="resizable-panel-group"
      className={`sct-resizable-panel-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type ResizablePanelProps = ComponentProps<typeof Panel>;

export function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return (
    <Panel
      data-slot="resizable-panel"
      className={`sct-resizable-panel${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type ResizableHandleProps = ComponentProps<typeof PanelResizeHandle>;

export function ResizableHandle({
  className,
  ...props
}: ResizableHandleProps) {
  return (
    <PanelResizeHandle
      data-slot="resizable-handle"
      className={`sct-resizable-handle${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
