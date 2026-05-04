// packages/cli/src/theme-command.test.ts
import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runThemeCommand } from "./theme-command.js";

function fixture(theme?: object): string {
  const cwd = mkdtempSync(join(tmpdir(), "webscit-theme-cmd-"));
  mkdirSync(join(cwd, "src", "app"), { recursive: true });
  writeFileSync(join(cwd, "src/app/globals.css"), "body{}\n");
  writeFileSync(
    join(cwd, "components.json"),
    JSON.stringify(
      { tailwind: { css: "src/app/globals.css" }, ...(theme ? { theme } : {}) },
      null,
      2,
    ),
  );
  return cwd;
}

describe("runThemeCommand", () => {
  it("regenerates and overwrites the three CSS files", async () => {
    const cwd = fixture({
      neutral: "slate",
      primary: "blue",
      radius: "medium",
      sizing: "medium",
      font: { text: "system", heading: "inherit", mono: "system-mono" },
    });
    // Pre-populate with bogus content to verify overwrite behavior.
    writeFileSync(join(cwd, "src/app/tokens.css"), "/* old */");

    const result = await runThemeCommand(cwd);

    const tokens = readFileSync(join(cwd, "src/app/tokens.css"), "utf8");
    expect(tokens).toContain("@layer design-tokens");
    expect(tokens).not.toBe("/* old */");
    expect(result.filesOverwritten).toContain(join(cwd, "src/app/tokens.css"));
  });

  it("errors if components.json has no theme section", async () => {
    const cwd = fixture(); // no theme
    await expect(runThemeCommand(cwd)).rejects.toThrow(/theme/i);
  });
});
