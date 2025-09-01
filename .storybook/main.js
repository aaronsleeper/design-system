/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  viteFinal: async config => {
    // Add SCSS support
    config.css = {
      preprocessorOptions: {
        scss: {
          sourceMap: true,
        },
      },
    };

    return config;
  },
};

export default config;
