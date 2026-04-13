import "./skeleton.css";

export type SkeletonProps = React.ComponentProps<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={`sct-skeleton${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
