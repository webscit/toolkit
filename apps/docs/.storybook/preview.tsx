import '@webscit/tokens/tokens.css';
import '@webscit/tokens/tokens-dark.css';
import type { Preview } from '@storybook/react';
import React from 'react';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset['theme'] =
        context.globals['theme'] === 'dark' ? 'dark' : '';
      return <Story />;
    },
  ],
};
export default preview;
