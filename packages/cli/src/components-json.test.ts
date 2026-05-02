import { describe, it, expect } from "vitest";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  findCssEntry,
  readTsconfigAliases,
  createComponentsJson,
  patchComponentsJsonRegistries,
} from "./components-json.js";

function makeTmpDir(): string {
  return mkdtempSync(join(tmpdir(), "webscit-cjson-test-"));
}

describe("findCssEntry", () => {
  it("returns the absolute path when --css flag points to an existing file", () => {
    const cwd = makeTmpDir();
    mkdirSync(join(cwd, "src"), { recursive: true });
    writeFileSync(join(cwd, "src", "custom.css"), "");

    const result = findCssEntry(cwd, "src/custom.css");
    expect(result).toBe(join(cwd, "src", "custom.css"));
  });

  it("throws when --css flag points to a missing file", () => {
    const cwd = makeTmpDir();
    expect(() => findCssEntry(cwd, "src/missing.css")).toThrow(
      "CSS file not found",
    );
  });

  it("finds src/index.css when no flag is given", () => {
    const cwd = makeTmpDir();
    mkdirSync(join(cwd, "src"), { recursive: true });
    writeFileSync(join(cwd, "src", "index.css"), "");

    expect(findCssEntry(cwd)).toBe(join(cwd, "src", "index.css"));
  });

  it("finds src/globals.css as a fallback", () => {
    const cwd = makeTmpDir();
    mkdirSync(join(cwd, "src"), { recursive: true });
    writeFileSync(join(cwd, "src", "globals.css"), "");

    expect(findCssEntry(cwd)).toBe(join(cwd, "src", "globals.css"));
  });

  it("throws with helpful message when no candidate exists", () => {
    const cwd = makeTmpDir();
    expect(() => findCssEntry(cwd)).toThrow(
      "Could not find a CSS entry file. Pass --css <path>",
    );
  });
});

describe("readTsconfigAliases", () => {
  it("extracts prefix and srcDir from @/* paths alias", () => {
    const cwd = makeTmpDir();
    writeFileSync(
      join(cwd, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: { paths: { "@/*": ["./src/*"] } },
      }),
    );

    expect(readTsconfigAliases(cwd)).toEqual({ prefix: "@", srcDir: "src" });
  });

  it("extracts prefix and srcDir from ~/* alias", () => {
    const cwd = makeTmpDir();
    writeFileSync(
      join(cwd, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: { paths: { "~/*": ["./app/*"] } },
      }),
    );

    expect(readTsconfigAliases(cwd)).toEqual({ prefix: "~", srcDir: "app" });
  });

  it("throws when tsconfig.json is absent", () => {
    const cwd = makeTmpDir();
    expect(() => readTsconfigAliases(cwd)).toThrow("tsconfig.json not found");
  });

  it("throws when compilerOptions.paths is missing", () => {
    const cwd = makeTmpDir();
    writeFileSync(
      join(cwd, "tsconfig.json"),
      JSON.stringify({ compilerOptions: {} }),
    );
    expect(() => readTsconfigAliases(cwd)).toThrow(
      "tsconfig.json has no compilerOptions.paths",
    );
  });

  it("throws when no wildcard alias is found", () => {
    const cwd = makeTmpDir();
    writeFileSync(
      join(cwd, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: { paths: { "@/utils": ["./src/utils"] } },
      }),
    );
    expect(() => readTsconfigAliases(cwd)).toThrow("no wildcard path alias");
  });
});

describe("createComponentsJson", () => {
  it("writes a well-formed components.json", () => {
    const cwd = makeTmpDir();
    createComponentsJson(cwd, "src/index.css", "@", "https://example.com/r");

    const content = JSON.parse(
      readFileSync(join(cwd, "components.json"), "utf8"),
    );
    expect(content.$schema).toBe("https://ui.shadcn.com/schema.json");
    expect(content.tailwind.css).toBe("src/index.css");
    expect(content.aliases.components).toBe("@/components");
    expect(content.aliases.utils).toBe("@/lib/utils");
    expect(content.aliases.ui).toBe("@/components/ui");
    expect(content.aliases.lib).toBe("@/lib");
    expect(content.aliases.hooks).toBe("@/hooks");
    expect(content.registries["@webscit"]).toBe(
      "https://example.com/r/{name}.json",
    );
  });

  it("uses the provided prefix in all alias values", () => {
    const cwd = makeTmpDir();
    createComponentsJson(cwd, "app/globals.css", "~", "https://example.com/r");

    const content = JSON.parse(
      readFileSync(join(cwd, "components.json"), "utf8"),
    );
    expect(content.aliases.components).toBe("~/components");
    expect(content.aliases.lib).toBe("~/lib");
  });
});

describe("patchComponentsJsonRegistries", () => {
  it("adds @webscit when registries is absent", () => {
    const cwd = makeTmpDir();
    writeFileSync(
      join(cwd, "components.json"),
      JSON.stringify({ style: "default" }),
    );

    patchComponentsJsonRegistries(cwd, "https://example.com/r");

    const content = JSON.parse(
      readFileSync(join(cwd, "components.json"), "utf8"),
    );
    expect(content.registries["@webscit"]).toBe(
      "https://example.com/r/{name}.json",
    );
    expect(content.style).toBe("default");
  });

  it("updates an existing @webscit entry without removing other registries", () => {
    const cwd = makeTmpDir();
    writeFileSync(
      join(cwd, "components.json"),
      JSON.stringify({
        registries: {
          "@webscit": "https://old.example.com/r/{name}.json",
          "@other": "https://other.example.com/{name}.json",
        },
      }),
    );

    patchComponentsJsonRegistries(cwd, "https://new.example.com/r");

    const content = JSON.parse(
      readFileSync(join(cwd, "components.json"), "utf8"),
    );
    expect(content.registries["@webscit"]).toBe(
      "https://new.example.com/r/{name}.json",
    );
    expect(content.registries["@other"]).toBe(
      "https://other.example.com/{name}.json",
    );
  });

  it("preserves all other top-level fields", () => {
    const cwd = makeTmpDir();
    const original = {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "default",
      tailwind: { css: "src/index.css" },
    };
    writeFileSync(join(cwd, "components.json"), JSON.stringify(original));

    patchComponentsJsonRegistries(cwd, "https://example.com/r");

    const content = JSON.parse(
      readFileSync(join(cwd, "components.json"), "utf8"),
    );
    expect(content.style).toBe("default");
    expect(content.tailwind.css).toBe("src/index.css");
    expect(existsSync(join(cwd, "components.json"))).toBe(true);
  });
});
