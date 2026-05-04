// packages/tokens/src/generate/tokens.test.ts
import { describe, it, expect } from "vitest";
import { defaultThemeConfig } from "./config.js";
import { generatePalettes, SCALE_STEPS } from "./palettes.js";
import { generateTokenDocuments } from "./tokens.js";

const cfg = defaultThemeConfig();
const palettes = generatePalettes(cfg);
const docs = generateTokenDocuments(cfg, palettes);

function get(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

describe("generateTokenDocuments — light", () => {
  it("emits all 11 color steps for every role", () => {
    const colors = get(docs.light, "sct.color") as Record<string, unknown>;
    for (const role of [
      "primary",
      "neutral",
      "success",
      "info",
      "warning",
      "destructive",
    ]) {
      const scale = colors[role] as Record<string, unknown>;
      for (const step of SCALE_STEPS) {
        const token = scale[String(step)] as { $type: string; $value: string };
        expect(token.$type).toBe("color");
        expect(token.$value).toMatch(/^#[0-9a-fA-F]{6}$/);
      }
    }
  });

  it("emits semantic aliases as references to scale steps", () => {
    const primary = get(docs.light, "sct.color.primary") as {
      $type: string;
      $value: string;
    };
    expect(primary.$type).toBe("color");
    expect(primary.$value).toBe("{sct.color.primary.600}");

    const ring = get(docs.light, "sct.color.ring") as { $value: string };
    expect(ring.$value).toBe("{sct.color.primary.500}");

    const fg = get(docs.light, "sct.color.foreground") as { $value: string };
    expect(fg.$value).toBe("{sct.color.neutral.950}");
  });

  it("emits spacing base + calc()-derived scale", () => {
    const base = get(docs.light, "sct.spacing") as {
      $type: string;
      $value: string;
    };
    expect(base.$type).toBe("dimension");
    expect(base.$value).toBe("0.25rem");

    const space2 = get(docs.light, "sct.space.2") as { $value: string };
    expect(space2.$value).toBe("calc(var(--sct-spacing) * 2)");
  });

  it("emits font-size base + calc()-derived scale", () => {
    const base = get(docs.light, "sct.font.size.base") as { $value: string };
    expect(base.$value).toBe("1rem");
    const xs = get(docs.light, "sct.font.size.xs") as { $value: string };
    expect(xs.$value).toBe("calc(var(--sct-font-size-base) * 0.75)");
  });

  it("emits radius base + calc()-derived scale (medium)", () => {
    const base = get(docs.light, "sct.radius") as { $value: string };
    expect(base.$value).toBe("0.5rem");
    const md = get(docs.light, "sct.radius.md") as { $value: string };
    expect(md.$value).toBe("calc(var(--sct-radius) * 1)");
    const full = get(docs.light, "sct.radius.full") as {
      $value: string;
    };
    expect(full.$value).toBe("9999px");
  });

  it("emits border widths in px", () => {
    const w1 = get(docs.light, "sct.border-width.1") as {
      $type: string;
      $value: string;
    };
    expect(w1.$type).toBe("dimension");
    expect(w1.$value).toBe("1px");
  });

  it("emits font families: text, heading (inherit shim), mono, sans (compat)", () => {
    const text = get(docs.light, "sct.font.family.text") as {
      $type: string;
      $value: string;
    };
    expect(text.$type).toBe("fontFamily");
    expect(text.$value.length).toBeGreaterThan(0);

    const heading = get(docs.light, "sct.font.family.heading") as {
      $value: string;
    };
    expect(heading.$value).toBe("var(--sct-font-family-text)");

    const sans = get(docs.light, "sct.font.family.sans") as { $value: string };
    expect(sans.$value).toBe("var(--sct-font-family-text)");
  });

  it("explicit heading font emits a real stack, not the inherit shim", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.font.heading = "serif";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    const heading = get(docs2.light, "sct.font.family.heading") as {
      $value: string;
    };
    expect(heading.$value).not.toBe("var(--sct-font-family-text)");
    expect(heading.$value).toMatch(/serif/);
  });
});

describe("generateTokenDocuments — radius edge cases", () => {
  it("radius='none' makes the base 0", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.radius = "none";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    const base = get(docs2.light, "sct.radius") as { $value: string };
    expect(base.$value).toBe("0");
    const md = get(docs2.light, "sct.radius.md") as { $value: string };
    expect(md.$value).toBe("calc(var(--sct-radius) * 1)");
    const full = get(docs2.light, "sct.radius.full") as {
      $value: string;
    };
    expect(full.$value).toBe("9999px");
  });

  it("radius='full' replaces all scale entries with 9999px", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.radius = "full";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    for (const name of ["sm", "md", "lg", "xl", "full"]) {
      const tok = get(docs2.light, `sct.radius.${name}`) as {
        $value: string;
      };
      expect(tok.$value).toBe("9999px");
    }
  });
});

describe("generateTokenDocuments — sizing", () => {
  it("sizing='small' shrinks spacing and font-size base", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.sizing = "small";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    expect(
      (get(docs2.light, "sct.spacing") as { $value: string }).$value,
    ).toBe("0.2rem");
    expect(
      (get(docs2.light, "sct.font.size.base") as { $value: string }).$value,
    ).toBe("0.875rem");
  });

  it("sizing='large' grows spacing and font-size base", () => {
    const cfg2 = defaultThemeConfig();
    cfg2.sizing = "large";
    const docs2 = generateTokenDocuments(cfg2, palettes);
    expect(
      (get(docs2.light, "sct.spacing") as { $value: string }).$value,
    ).toBe("0.3rem");
    expect(
      (get(docs2.light, "sct.font.size.base") as { $value: string }).$value,
    ).toBe("1.0625rem");
  });
});

describe("generateTokenDocuments — compatibility shims", () => {
  it("emits font weights", () => {
    const w = get(docs.light, "sct.font.weight.medium") as { $value: string };
    expect(w.$value).toBe("500");
  });

  it("emits line heights", () => {
    const lh = get(docs.light, "sct.line-height.normal") as {
      $value: string;
    };
    expect(lh.$value).toBe("1.4");
  });

  it("emits shadows", () => {
    const xs = get(docs.light, "sct.shadow.xs") as { $value: string };
    expect(xs.$value).toContain("rgba(");
  });

  it("emits --sct-space-9 (button height)", () => {
    const space9 = get(docs.light, "sct.space.9") as { $value: string };
    expect(space9.$value).toBe("calc(var(--sct-spacing) * 9)");
  });

  it("emits component dimensions", () => {
    const sidebar = get(docs.light, "sct.sidebar.width") as { $value: string };
    expect(sidebar.$value).toBe("256px");
    const progress = get(docs.light, "sct.progress.height") as {
      $value: string;
    };
    expect(progress.$value).toBe("0.5rem");
  });
});

describe("generateTokenDocuments — dark", () => {
  it("dark document only contains color tokens", () => {
    const sct = (docs.dark as { sct: Record<string, unknown> }).sct;
    expect(Object.keys(sct)).toEqual(["color"]);
  });

  it("dark color scales differ from light", () => {
    const lightP500 = (
      get(docs.light, "sct.color.primary.500") as { $value: string }
    ).$value;
    const darkP500 = (
      get(docs.dark, "sct.color.primary.500") as { $value: string }
    ).$value;
    expect(darkP500).not.toBe(lightP500);
  });

  it("dark uses the same semantic alias map (refs)", () => {
    const ring = get(docs.dark, "sct.color.ring") as { $value: string };
    expect(ring.$value).toBe("{sct.color.primary.500}");
    const fg = get(docs.dark, "sct.color.foreground") as { $value: string };
    expect(fg.$value).toBe("{sct.color.neutral.950}");
  });
});
