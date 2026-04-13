import { Progress as BaseProgress } from "@base-ui/react/progress";
import "./progress.css";

export type ProgressProps = React.ComponentProps<typeof BaseProgress.Root>;

export function Progress({ className, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root
      data-slot="progress"
      className={`sct-progress${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseProgress.Track
        data-slot="progress-track"
        className="sct-progress-track"
      >
        <BaseProgress.Indicator
          data-slot="progress-indicator"
          className="sct-progress-indicator"
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
