import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@webscit/registry";
import { Slider as ShadcnSlider } from "@/components/ui/slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Slider defaultValue={50} />
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{width:"300px"}}>
          <ShadcnSlider defaultValue={[50]} />
        </div>
      ),
    },
  },
};

export const Range: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Slider defaultValue={25} min={0} max={100} />
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{width:"300px"}}>
          <ShadcnSlider defaultValue={[25]} min={0} max={100} />
        </div>
      ),
    },
  },
};

export const Playground: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Slider defaultValue={75} min={0} max={100} step={5} />
    </div>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{width:"300px"}}>
          <ShadcnSlider defaultValue={[75]} min={0} max={100} step={5} />
        </div>
      ),
    },
  },
};
