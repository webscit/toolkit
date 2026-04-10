import type { Meta, StoryObj } from "@storybook/react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldSeparator,
  Input,
} from "@webscit/registry";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field style={{ width: "350px" }}>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
      <FieldDescription>We will never share your email.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field invalid style={{ width: "350px" }}>
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="Enter username" />
      <FieldError>Username is required.</FieldError>
    </Field>
  ),
};

export const FieldSetExample: Story = {
  render: () => (
    <FieldSet style={{ width: "400px" }}>
      <FieldLegend>Contact Information</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <Input placeholder="John" />
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <Input placeholder="Doe" />
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="john@example.com" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
