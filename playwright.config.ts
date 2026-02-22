import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 60000,

  use: {
      baseURL: 'https://magento2-demo.magebit.com/',
      headless: false,
      actionTimeout: 15000,
      navigationTimeout: 30000,
      launchOptions: {
        slowMo: 2000,
      },

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  reporter: [
    ['html', { open: 'never' }]
  ],
});