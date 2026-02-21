import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  use: {
    baseURL: 'https://magento2-demo.magebit.com/',

    headless: true,

    launchOptions: {
      slowMo: 500,
    },

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  reporter: [
    ['html', { open: 'never' }]
  ],
});