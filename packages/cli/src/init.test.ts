import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runToolkitInit } from "./init.js";

function makeFixture(): { cwd: string; cssPath: string } {
  const cwd = mkdtempSync(join(tmpdir(), "webscit-init-"));
  const cssDir = join(cwd, "src", "app");
  mkdirSync(cssDir, { recursive: true });
  const cssPath = join(cssDir, "globals.css");
  writeFileSync(cssPath, "body { color: red; }\n");
  writeFileSync(
    join(cwd, "components.json"),
    JSON.stringify({ tailwind: { css: "src/app/globals.css" } }),
  );
  return { cwd, cssPath };
}

const tokenBundle = {
  tokensCss: "/* light */",
  tokensDarkCss: "/* dark */",
  themeCss: "/* base */",
};

describe("runToolkitInit", () => {
  it("copies the three token CSS files next to the CSS entry", () => {
    const { cwd } = makeFixture();

    runToolkitInit(cwd, tokenBundle);

    expect(readFileSync(join(cwd, "src/app/tokens.css"), "utf8")).toBe("/* light */");
    expect(readFileSync(join(cwd, "src/app/tokens-dark.css"), "utf8")).toBe("/* dark */");
    expect(readFileSync(join(cwd, "src/app/theme.css"), "utf8")).toBe("/* base */");
  });

  it("skips files that already exist without overwriting", () => {
    const { cwd } = makeFixture();
    const existing = join(cwd, "src/app/tokens.css");
    writeFileSync(existing, "/* user-customized */");

    const result = runToolkitInit(cwd, tokenBundle);

    expect(readFileSync(existing, "utf8")).toBe("/* user-customized */");
    expect(result.filesSkipped).toContain(existing);
    expect(result.filesWritten).not.toContain(existing);
    expect(result.filesWritten).toContain(join(cwd, "src/app/tokens-dark.css"));
    expect(result.filesWritten).toContain(join(cwd, "src/app/theme.css"));
  });

  it("prepends @import lines for the three token files to the CSS entry", () => {
    const { cwd, cssPath } = makeFixture();

    const result = runToolkitInit(cwd, tokenBundle);

    const content = readFileSync(cssPath, "utf8");
    expect(content.startsWith(
      '@import "./tokens.css";\n' +
      '@import "./tokens-dark.css";\n' +
      '@import "./theme.css";\n'
    )).toBe(true);
    expect(content).toContain("body { color: red; }");
    expect(result.importsInjected).toEqual([
      '@import "./tokens.css";',
      '@import "./tokens-dark.css";',
      '@import "./theme.css";',
    ]);
  });

  it("does not duplicate @import lines when run twice", () => {
    const { cwd, cssPath } = makeFixture();

    runToolkitInit(cwd, tokenBundle);
    const afterFirst = readFileSync(cssPath, "utf8");
    const secondResult = runToolkitInit(cwd, tokenBundle);
    const afterSecond = readFileSync(cssPath, "utf8");

    expect(afterSecond).toBe(afterFirst);
    expect(secondResult.importsInjected).toEqual([]);
  });
});
