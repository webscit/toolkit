import "../src/index.css";
import "@webscit/tokens/tokens.css";
import "@webscit/tokens/tokens-dark.css";
import type { Preview } from "@storybook/react";
import React from "react";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
      },
    },
    compareShadcn: {
      description: "Show shadcn/ui equivalent side-by-side",
      defaultValue: "off",
      toolbar: {
        title: "Compare with shadcn/ui",
        items: [
          { value: "off", title: "Hide comparison", icon: "eye" },
          { value: "on", title: "Show shadcn/ui", icon: "eyeclose" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset["theme"] =
        context.globals["theme"] === "dark" ? "dark" : "";
      return <Story />;
    },
    (Story, context) => {
      const compare = context.globals["compareShadcn"] === "on";
      const shadcnRender = (
        context.parameters as {
          shadcn?: {
            render?: (args: Record<string, unknown>) => React.ReactNode;
          };
        }
      ).shadcn?.render;

      if (!compare || !shadcnRender) return <Story />;

      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#6b7280",
                marginBottom: "12px",
              }}
            >
              sci-ui toolkit
            </p>
            <Story />
          </div>
          <div className="shadcn">
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#6b7280",
                marginBottom: "12px",
              }}
            >
              shadcn/ui
            </p>
            {shadcnRender(context.args as Record<string, unknown>)}
          </div>
        </div>
      );
    },
  ],
};
export default preview;
