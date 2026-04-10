import { Slider as BaseSlider } from "@base-ui/react/slider";
import "./slider.css";

export interface SliderProps
  extends React.ComponentProps<typeof BaseSlider.Root> {
  className?: string;
}

export function Slider({ className, ...props }: SliderProps) {
  return (
    <BaseSlider.Root
      data-slot="slider"
      className={`sct-slider${className ? ` ${className}` : ""}`}
      {...props}
    >
      <BaseSlider.Control data-slot="slider-control" className="sct-slider-control">
        <BaseSlider.Track data-slot="slider-track" className="sct-slider-track">
          <BaseSlider.Indicator
            data-slot="slider-range"
            className="sct-slider-range"
          />
          <BaseSlider.Thumb
            data-slot="slider-thumb"
            className="sct-slider-thumb"
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
