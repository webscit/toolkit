// packages/cli/src/prompts.ts
import { select } from "@inquirer/prompts";
import {
  defaultThemeConfig,
  NEUTRAL_CHOICES,
  PRIMARY_CHOICES,
  RADIUS_CHOICES,
  SIZING_CHOICES,
  FONT_CHOICES,
  type ThemeConfig,
  type NeutralName,
  type PrimaryName,
  type FontName,
  type RadiusChoice,
  type SizingChoice,
} from "@webscit/tokens";

export interface PromptQuestion {
  name:
    | "neutral"
    | "primary"
    | "radius"
    | "sizing"
    | "fontText"
    | "fontHeading";
  message: string;
  choices: readonly string[];
  default: string;
}

export function buildPromptPlan(defaults: ThemeConfig): PromptQuestion[] {
  const headingChoices: readonly string[] = ["inherit", ...FONT_CHOICES];
  const headingDefault =
    defaults.font.heading === "inherit" ? "inherit" : defaults.font.heading;
  return [
    {
      name: "neutral",
      message: "Neutral color",
      choices: NEUTRAL_CHOICES,
      default: defaults.neutral,
    },
    {
      name: "primary",
      message: "Primary color",
      choices: PRIMARY_CHOICES,
      default: defaults.primary,
    },
    {
      name: "radius",
      message: "Border radius",
      choices: RADIUS_CHOICES,
      default: defaults.radius,
    },
    {
      name: "sizing",
      message: "Sizing (drives spacing and font size)",
      choices: SIZING_CHOICES,
      default: defaults.sizing,
    },
    {
      name: "fontText",
      message: "Text font",
      choices: FONT_CHOICES,
      default: defaults.font.text,
    },
    {
      name: "fontHeading",
      message: "Heading font",
      choices: headingChoices,
      default: headingDefault,
    },
  ];
}

export interface FlatAnswers {
  neutral: NeutralName;
  primary: PrimaryName;
  radius: RadiusChoice;
  sizing: SizingChoice;
  fontText: FontName;
  fontHeading: FontName | "inherit";
}

export function assembleConfig(answers: FlatAnswers): ThemeConfig {
  return {
    neutral: answers.neutral,
    primary: answers.primary,
    radius: answers.radius,
    sizing: answers.sizing,
    font: {
      text: answers.fontText,
      heading: answers.fontHeading,
      mono: "system-mono",
    },
    advanced: {},
  };
}

export async function runThemePrompts(defaults?: ThemeConfig): Promise<ThemeConfig> {
  const base = defaults ?? defaultThemeConfig();
  const plan = buildPromptPlan(base);
  const answers: Partial<FlatAnswers> = {};
  for (const q of plan) {
    const value = await select({
      message: q.message,
      choices: q.choices.map((c) => ({ name: c, value: c })),
      default: q.default,
    });
    (answers as Record<string, unknown>)[q.name] = value;
  }
  return assembleConfig(answers as FlatAnswers);
}
