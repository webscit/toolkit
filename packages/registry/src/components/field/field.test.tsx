import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldSeparator,
} from "./field";

describe("Field", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <Field data-testid="field">
        <FieldLabel>Name</FieldLabel>
        <input />
      </Field>,
    );
    await expect.element(screen.getByTestId("field")).toBeInTheDocument();
  });

  it("sets data-slot attribute", async () => {
    const screen = await render(
      <Field data-testid="field">
        <FieldLabel>Name</FieldLabel>
      </Field>,
    );
    await expect
      .element(screen.getByTestId("field"))
      .toHaveAttribute("data-slot", "field");
  });

  it("renders label", async () => {
    const screen = await render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <input type="email" />
      </Field>,
    );
    await expect.element(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders description", async () => {
    const screen = await render(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <FieldDescription>Enter your full name</FieldDescription>
        <input />
      </Field>,
    );
    await expect
      .element(screen.getByText("Enter your full name"))
      .toBeInTheDocument();
  });

  it("renders error message", async () => {
    // match={true} forces FieldError to always render regardless of validity state
    const screen = await render(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <input />
        <FieldError match={true}>This field is required</FieldError>
      </Field>,
    );
    await expect
      .element(screen.getByText("This field is required"))
      .toBeInTheDocument();
  });
});

describe("FieldSet", () => {
  it("renders fieldset with legend", async () => {
    const screen = await render(
      <FieldSet>
        <FieldLegend>Contact Info</FieldLegend>
      </FieldSet>,
    );
    await expect.element(screen.getByRole("group")).toBeInTheDocument();
    await expect
      .element(screen.getByText("Contact Info"))
      .toBeInTheDocument();
  });
});

describe("FieldGroup", () => {
  it("renders with data-slot", async () => {
    const screen = await render(<FieldGroup data-testid="fg" />);
    await expect
      .element(screen.getByTestId("fg"))
      .toHaveAttribute("data-slot", "field-group");
  });
});

describe("FieldContent", () => {
  it("renders with data-slot", async () => {
    const screen = await render(<FieldContent data-testid="fc" />);
    await expect
      .element(screen.getByTestId("fc"))
      .toHaveAttribute("data-slot", "field-content");
  });
});

describe("FieldSeparator", () => {
  it("renders separator", async () => {
    const screen = await render(<FieldSeparator />);
    await expect.element(screen.getByRole("none")).toBeInTheDocument();
  });
});
