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
import { Label as ShadcnLabel } from "@/components/ui/label";
import { Input as ShadcnInput } from "@/components/ui/input";

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
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ width: "350px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <ShadcnLabel htmlFor="shadcn-email">Email</ShadcnLabel>
          <ShadcnInput id="shadcn-email" type="email" placeholder="you@example.com" />
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>We will never share your email.</p>
        </div>
      ),
    },
  },
};

export const WithError: Story = {
  render: () => (
    <Field invalid style={{ width: "350px" }}>
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="Enter username" />
      <FieldError>Username is required.</FieldError>
    </Field>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <div style={{ width: "350px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <ShadcnLabel htmlFor="shadcn-username">Username</ShadcnLabel>
          <ShadcnInput
            id="shadcn-username"
            placeholder="Enter username"
            aria-invalid="true"
            style={{ borderColor: "var(--destructive)" }}
          />
          <p style={{ fontSize: "12px", color: "var(--destructive)" }}>Username is required.</p>
        </div>
      ),
    },
  },
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
  parameters: {
    shadcn: {
      render: () => (
        <fieldset style={{ width: "400px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "16px" }}>
          <legend style={{ fontSize: "14px", fontWeight: 600, padding: "0 4px" }}>Contact Information</legend>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <ShadcnLabel htmlFor="shadcn-first-name">First Name</ShadcnLabel>
              <ShadcnInput id="shadcn-first-name" placeholder="John" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <ShadcnLabel htmlFor="shadcn-last-name">Last Name</ShadcnLabel>
              <ShadcnInput id="shadcn-last-name" placeholder="Doe" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <ShadcnLabel htmlFor="shadcn-contact-email">Email</ShadcnLabel>
              <ShadcnInput id="shadcn-contact-email" type="email" placeholder="john@example.com" />
            </div>
          </div>
        </fieldset>
      ),
    },
  },
};
