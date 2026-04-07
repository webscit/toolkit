import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";

const COMPONENTS_DIR = resolve("src/components");
const OUTPUT_DIR = resolve("registry");
mkdirSync(OUTPUT_DIR, { recursive: true });

const componentNames = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const items = componentNames.map((name) => {
  const dir = join(COMPONENTS_DIR, name);
  const meta = JSON.parse(
    readFileSync(join(dir, "registry.meta.json"), "utf8"),
  );

  const files = readdirSync(dir)
    .filter(
      (f) =>
        (f.endsWith(".tsx") || f.endsWith(".css")) && !f.endsWith(".test.tsx"),
    )
    .map((filename) => ({
      path: `components/${name}/${filename}`,
      type: "registry:component",
      content: readFileSync(join(dir, filename), "utf8"),
    }));

  const item = { name, type: "registry:component", ...meta, files };

  // Write per-component JSON
  writeFileSync(
    join(OUTPUT_DIR, `${name}.json`),
    JSON.stringify(item, null, 2),
  );

  // Return index entry (without content)
  return { ...item, files: files.map(({ content: _, ...f }) => f) };
});

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "webscit-toolkit",
  homepage: "https://webscit.github.io/toolkit",
  items,
};

writeFileSync(
  join(OUTPUT_DIR, "registry.json"),
  JSON.stringify(registry, null, 2),
);
console.log(`✓ registry built: ${items.length} components`);
