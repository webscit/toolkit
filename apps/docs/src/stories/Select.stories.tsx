import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "@webscit/registry";
import {
  Select as ShadcnSelect,
  SelectTrigger as ShadcnSelectTrigger,
  SelectValue as ShadcnSelectValue,
  SelectContent as ShadcnSelectContent,
  SelectItem as ShadcnSelectItem,
  SelectLabel as ShadcnSelectLabel,
  SelectSeparator as ShadcnSelectSeparator,
} from "@/components/ui/select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: "200px" }}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSelect>
          <ShadcnSelectTrigger style={{ width: "200px" }}>
            <ShadcnSelectValue placeholder="Select a fruit" />
          </ShadcnSelectTrigger>
          <ShadcnSelectContent>
            <ShadcnSelectItem value="apple">Apple</ShadcnSelectItem>
            <ShadcnSelectItem value="banana">Banana</ShadcnSelectItem>
            <ShadcnSelectItem value="cherry">Cherry</ShadcnSelectItem>
          </ShadcnSelectContent>
        </ShadcnSelect>
      ),
    },
  },
};

export const WithGroupLabel: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: "220px" }}>
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>North America</SelectLabel>
        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
        <SelectSeparator />
        <SelectLabel>Europe</SelectLabel>
        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
        <SelectItem value="cet">Central European Time (CET)</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSelect>
          <ShadcnSelectTrigger style={{ width: "220px" }}>
            <ShadcnSelectValue placeholder="Select a timezone" />
          </ShadcnSelectTrigger>
          <ShadcnSelectContent>
            <ShadcnSelectLabel>North America</ShadcnSelectLabel>
            <ShadcnSelectItem value="est">
              Eastern Standard Time (EST)
            </ShadcnSelectItem>
            <ShadcnSelectItem value="cst">
              Central Standard Time (CST)
            </ShadcnSelectItem>
            <ShadcnSelectSeparator />
            <ShadcnSelectLabel>Europe</ShadcnSelectLabel>
            <ShadcnSelectItem value="gmt">
              Greenwich Mean Time (GMT)
            </ShadcnSelectItem>
            <ShadcnSelectItem value="cet">
              Central European Time (CET)
            </ShadcnSelectItem>
          </ShadcnSelectContent>
        </ShadcnSelect>
      ),
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger style={{ width: "200px" }}>
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSelect disabled>
          <ShadcnSelectTrigger style={{ width: "200px" }}>
            <ShadcnSelectValue placeholder="Disabled select" />
          </ShadcnSelectTrigger>
          <ShadcnSelectContent>
            <ShadcnSelectItem value="a">Option A</ShadcnSelectItem>
          </ShadcnSelectContent>
        </ShadcnSelect>
      ),
    },
  },
};

export const Playground: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: "200px" }}>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
        <SelectItem value="3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnSelect>
          <ShadcnSelectTrigger style={{ width: "200px" }}>
            <ShadcnSelectValue placeholder="Select an option" />
          </ShadcnSelectTrigger>
          <ShadcnSelectContent>
            <ShadcnSelectItem value="1">Option 1</ShadcnSelectItem>
            <ShadcnSelectItem value="2">Option 2</ShadcnSelectItem>
            <ShadcnSelectItem value="3">Option 3</ShadcnSelectItem>
          </ShadcnSelectContent>
        </ShadcnSelect>
      ),
    },
  },
};
