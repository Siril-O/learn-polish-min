import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  timeout: 30000,
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:4178', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: [
    {
      command: 'npm run dev -- --port 4178 --strictPort',
      url: 'http://127.0.0.1:4178',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'node tests/serve-production.js',
      url: 'http://127.0.0.1:4179/learn_pollish_minimalistic/',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
