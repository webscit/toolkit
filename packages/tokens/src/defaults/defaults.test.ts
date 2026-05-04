// packages/tokens/src/defaults/defaults.test.ts
import { describe, it, expect } from "vitest";
import { NEUTRAL_CHOICES, NEUTRAL_KEY_COLORS } from "./neutrals.js";
import {
  PRIMARY_CHOICES,
  PRIMARY_KEY_COLORS,
  FIXED_ROLE_KEY_COLORS,
} from "./primaries.js";
import { FONT_CHOICES, FONT_FAMILY_STACKS } from "./fonts.js";

const HEX = /^#[0-9a-fA-F]{6}$/;

describe("defaults", () => {
  it("every neutral choice has a hex key color", () => {
    for (const name of NEUTRAL_CHOICES) {
      expect(NEUTRAL_KEY_COLORS[name]).toMatch(HEX);
    }
  });

  it("every primary choice has a hex key color", () => {
    for (const name of PRIMARY_CHOICES) {
      expect(PRIMARY_KEY_COLORS[name]).toMatch(HEX);
    }
  });

  it("fixed roles have hex key colors", () => {
    expect(FIXED_ROLE_KEY_COLORS.success).toMatch(HEX);
    expect(FIXED_ROLE_KEY_COLORS.warning).toMatch(HEX);
    expect(FIXED_ROLE_KEY_COLORS.destructive).toMatch(HEX);
  });

  it("every font choice has a non-empty family stack", () => {
    for (const name of FONT_CHOICES) {
      expect(FONT_FAMILY_STACKS[name].length).toBeGreaterThan(0);
    }
  });
});
