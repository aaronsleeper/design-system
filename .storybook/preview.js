import '../src/tokens/index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    config: {},
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: 'light-theme', color: '#ffffff' },
      { name: 'dark', class: 'dark-theme', color: '#000000' },
      { name: 'high-contrast', class: 'high-contrast-theme', color: '#000000' },
    ],
  },
};
