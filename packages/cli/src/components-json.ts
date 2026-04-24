import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const CSS_ENTRY_CANDIDATES = [
  "src/index.css",
  "src/globals.css",
  "src/global.css",
  "src/app.css",
  "src/main.css",
  "src/styles.css",
  "src/style.css",
];

export function findCssEntry(cwd: string, flagValue?: string): string {
  if (flagValue) {
    const abs = resolve(cwd, flagValue);
    if (!existsSync(abs)) {
      throw new Error(`CSS file not found: ${flagValue}`);
    }
    return abs;
  }
  for (const candidate of CSS_ENTRY_CANDIDATES) {
    const abs = join(cwd, candidate);
    if (existsSync(abs)) return abs;
  }
  throw new Error(
    `Could not find a CSS entry file. Pass --css <path> to specify one.\n` +
      `Checked: ${CSS_ENTRY_CANDIDATES.join(", ")}`,
  );
}

export function readTsconfigAliases(cwd: string): {
  prefix: string;
  srcDir: string;
} {
  const tsconfigPath = join(cwd, "tsconfig.json");
  if (!existsSync(tsconfigPath)) {
    throw new Error(
      `tsconfig.json not found. Add a tsconfig.json with path aliases (e.g. "@/*": ["./src/*"]).`,
    );
  }
  const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf8")) as {
    compilerOptions?: { paths?: Record<string, string[]> };
  };
  const paths = tsconfig.compilerOptions?.paths;
  if (!paths) {
    throw new Error(
      `tsconfig.json has no compilerOptions.paths. Add path aliases (e.g. "@/*": ["./src/*"]).`,
    );
  }
  for (const [pattern, targets] of Object.entries(paths)) {
    if (!pattern.endsWith("/*")) continue;
    const target = targets[0];
    if (!target?.endsWith("/*")) continue;
    const prefix = pattern.slice(0, -2);
    const srcDir = target.slice(0, -2).replace(/^\.\//, "");
    return { prefix, srcDir };
  }
  throw new Error(
    `tsconfig.json has no wildcard path alias (e.g. "@/*": ["./src/*"]). Add one to continue.`,
  );
}

export function createComponentsJson(
  cwd: string,
  cssRelPath: string,
  prefix: string,
  registryUrl: string,
): void {
  const content = {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "default",
    rsc: false,
    tsx: true,
    tailwind: {
      config: "",
      css: cssRelPath,
      baseColor: "neutral",
      cssVariables: true,
      prefix: "",
    },
    aliases: {
      components: `${prefix}/components`,
      utils: `${prefix}/lib/utils`,
      ui: `${prefix}/components/ui`,
      lib: `${prefix}/lib`,
      hooks: `${prefix}/hooks`,
    },
    registries: {
      "@webscit": `${registryUrl}/{name}.json`,
    },
  };
  writeFileSync(join(cwd, "components.json"), JSON.stringify(content, null, 2) + "\n");
}

export function patchComponentsJsonRegistries(
  cwd: string,
  registryUrl: string,
): void {
  const path = join(cwd, "components.json");
  const content = JSON.parse(readFileSync(path, "utf8")) as Record<
    string,
    unknown
  >;
  const existing = (content.registries ?? {}) as Record<string, string>;
  existing["@webscit"] = `${registryUrl}/{name}.json`;
  content.registries = existing;
  writeFileSync(path, JSON.stringify(content, null, 2) + "\n");
}
