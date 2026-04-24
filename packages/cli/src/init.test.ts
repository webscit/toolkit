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
});
