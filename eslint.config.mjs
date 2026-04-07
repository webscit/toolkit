import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { "@typescript-eslint": tseslint },
    languageOptions: { parser: tsparser },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  { ignores: ["**/node_modules/*", "**/dist/*", "**/build/*", "**/storybook-static/*"] },
];
