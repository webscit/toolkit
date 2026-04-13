import { Slider as BaseSlider } from "@base-ui/react/slider";
import "./slider.css";

export type SliderProps = React.ComponentProps<typeof BaseSlider.Root>;

export function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderProps) {
  const thumbCount = Array.isArray(value)
    ? value.length
    : Array.isArray(defaultValue)
      ? defaultValue.length
      : 1;

  return (
    <BaseSlider.Root
      data-slot="slider"
      className={`sct-slider${className ? ` ${className}` : ""}`}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <BaseSlider.Control
        data-slot="slider-control"
        className="sct-slider-control"
      >
        <BaseSlider.Track data-slot="slider-track" className="sct-slider-track">
          <BaseSlider.Indicator
            data-slot="slider-range"
            className="sct-slider-range"
          />
        </BaseSlider.Track>
        {Array.from({ length: thumbCount }, (_, index) => (
          <BaseSlider.Thumb
            data-slot="slider-thumb"
            key={index}
            className="sct-slider-thumb"
          />
        ))}
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
