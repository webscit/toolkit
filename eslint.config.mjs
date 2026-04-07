// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [{
  files: ['**/*.ts', '**/*.tsx'],
  plugins: { '@typescript-eslint': tseslint },
  languageOptions: { parser: tsparser },
  rules: {
    ...tseslint.configs.recommended.rules,
  },
}, ...storybook.configs["flat/recommended"]];
