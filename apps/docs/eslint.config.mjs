// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

export default [
  {
    extends: ["../../eslint.config.mjs"],
  },
  ...storybook.configs["flat/recommended"],
];
