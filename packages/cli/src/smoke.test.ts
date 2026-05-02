import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createServer, type Server } from "node:http";
import { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, execSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../../..");
const registryDir = join(repoRoot, "packages/registry/registry");
const cliEntry = join(repoRoot, "packages/cli/dist/index.js");

const MIME: Record<string, string> = {
  ".json": "application/json; charset=utf-8",
};

function startRegistryServer(): Promise<{ url: string; server: Server }> {
  return new Promise((resolveReady, reject) => {
    const server = createServer((req, res) => {
      const url = req.url ?? "/";
      const safePath = url.split("?")[0]!.replace(/^\/+/, "");
      const filePath = join(registryDir, safePath);
      if (!filePath.startsWith(registryDir) || !existsSync(filePath)) {
        res.statusCode = 404;
        res.end("not found");
        return;
      }
      res.setHeader(
        "content-type",
        MIME[extname(filePath)] ?? "application/octet-stream",
      );
      res.end(readFileSync(filePath));
    });
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as AddressInfo;
      resolveReady({ url: `http://127.0.0.1:${port}`, server });
    });
  });
}

function writeProjectFixture(
  cwd: string,
  registryUrl: string,
  opts: { includeComponentsJson?: boolean } = {},
): void {
  writeFileSync(
    join(cwd, "package.json"),
    JSON.stringify(
      {
        name: "webscit-smoke-fixture",
        version: "0.0.0",
        private: true,
        type: "module",
        dependencies: { react: "^19.0.0", "react-dom": "^19.0.0" },
      },
      null,
      2,
    ),
  );
  mkdirSync(join(cwd, "src", "components", "ui"), { recursive: true });
  mkdirSync(join(cwd, "src", "lib"), { recursive: true });
  writeFileSync(join(cwd, "src", "index.css"), "body { color: red; }\n");
  writeFileSync(
    join(cwd, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
          jsx: "react-jsx",
          module: "ESNext",
          moduleResolution: "bundler",
          target: "ES2022",
        },
        include: ["src"],
      },
      null,
      2,
    ),
  );
  if (opts.includeComponentsJson !== false) {
    writeFileSync(
      join(cwd, "components.json"),
      JSON.stringify(
        {
          $schema: "https://ui.shadcn.com/schema.json",
          style: "default",
          rsc: false,
          tsx: true,
          tailwind: {
            config: "",
            css: "src/index.css",
            baseColor: "neutral",
            cssVariables: true,
            prefix: "",
          },
          aliases: {
            components: "@/components",
            utils: "@/lib/utils",
            ui: "@/components/ui",
            lib: "@/lib",
            hooks: "@/hooks",
          },
          registries: { "@webscit": registryUrl + "/{name}.json" },
        },
        null,
        2,
      ),
    );
  }
}

describe("CLI smoke test against a local registry server", () => {
  let server: Server;
  let registryUrl: string;
  const tmpRoots: string[] = [];

  beforeAll(async () => {
    if (!existsSync(cliEntry)) {
      execSync(
        "npm run build -w packages/tokens -w packages/registry -w packages/cli",
        { cwd: repoRoot, stdio: "inherit" },
      );
    }
    if (!existsSync(join(registryDir, "card.json"))) {
      execSync("npm run build -w packages/registry", {
        cwd: repoRoot,
        stdio: "inherit",
      });
    }
    ({ server, url: registryUrl } = await startRegistryServer());
  }, 120_000);

  afterAll(async () => {
    await new Promise<void>((r) => server.close(() => r()));
    for (const dir of tmpRoots) rmSync(dir, { recursive: true, force: true });
  });

  function makeProject(opts: { includeComponentsJson?: boolean } = {}): string {
    const cwd = mkdtempSync(join(tmpdir(), "webscit-smoke-"));
    tmpRoots.push(cwd);
    writeProjectFixture(cwd, registryUrl, opts);
    return cwd;
  }

  function runCli(cwd: string, args: string[]): string {
    try {
      return execFileSync("node", [cliEntry, ...args], {
        cwd,
        env: {
          ...process.env,
          WEBSCIT_REGISTRY_URL: registryUrl,
          CI: "true",
          FORCE_COLOR: "0",
          NO_COLOR: "1",
        },
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (err) {
      const e = err as { stdout?: string; stderr?: string; message: string };
      throw new Error(
        `CLI failed (${args.join(" ")}):\n--stdout--\n${e.stdout ?? ""}\n--stderr--\n${e.stderr ?? ""}\n--msg--\n${e.message}`,
      );
    }
  }

  it("creates components.json and copies tokens when starting from scratch", () => {
    const cwd = makeProject({ includeComponentsJson: false });

    const output = runCli(cwd, ["init"]);

    expect(output).toContain("Created components.json");
    const cfg = JSON.parse(readFileSync(join(cwd, "components.json"), "utf8"));
    expect(cfg.tailwind.css).toBe("src/index.css");
    expect(cfg.aliases.components).toBe("@/components");
    expect(cfg.registries["@webscit"]).toContain("/{name}.json");

    expect(existsSync(join(cwd, "src/tokens.css"))).toBe(true);
    expect(existsSync(join(cwd, "src/tokens-dark.css"))).toBe(true);
    expect(existsSync(join(cwd, "src/theme.css"))).toBe(true);

    const entry = readFileSync(join(cwd, "src/index.css"), "utf8");
    expect(
      entry.startsWith(
        '@import "./tokens.css";\n' +
          '@import "./tokens-dark.css";\n' +
          '@import "./theme.css";\n',
      ),
    ).toBe(true);
  });

  it("copies tokens and injects imports when run in a project that already has components.json", () => {
    const cwd = makeProject();

    const output = runCli(cwd, ["init"]);

    expect(output).toContain("components.json already exists");
    expect(existsSync(join(cwd, "src/tokens.css"))).toBe(true);
    expect(existsSync(join(cwd, "src/tokens-dark.css"))).toBe(true);
    expect(existsSync(join(cwd, "src/theme.css"))).toBe(true);

    const entry = readFileSync(join(cwd, "src/index.css"), "utf8");
    expect(
      entry.startsWith(
        '@import "./tokens.css";\n' +
          '@import "./tokens-dark.css";\n' +
          '@import "./theme.css";\n',
      ),
    ).toBe(true);
    expect(entry).toContain("body { color: red; }");

    const tokens = readFileSync(join(cwd, "src/tokens.css"), "utf8");
    expect(tokens).toContain("@layer design-tokens");
    expect(tokens).toContain("--sct-");
  });

  it("is idempotent on re-run", () => {
    const cwd = makeProject();

    runCli(cwd, ["init"]);
    const afterFirst = readFileSync(join(cwd, "src/index.css"), "utf8");
    const secondOutput = runCli(cwd, ["init"]);
    const afterSecond = readFileSync(join(cwd, "src/index.css"), "utf8");

    expect(afterSecond).toBe(afterFirst);
    expect(secondOutput).toContain("No imports needed");
  });

  it("add fetches a component from the local registry", () => {
    const cwd = makeProject();
    runCli(cwd, ["init"]);

    runCli(cwd, ["add", "card"]);

    const cardTsx = join(cwd, "src/components/card/card.tsx");
    const cardCss = join(cwd, "src/components/card/card.css");
    expect(existsSync(cardTsx)).toBe(true);
    expect(existsSync(cardCss)).toBe(true);

    expect(readFileSync(cardTsx, "utf8")).toContain("export function Card");
    expect(readFileSync(cardCss, "utf8")).toContain("@scope (.sct-card)");
  }, 180_000);
});
