import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: false,
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000', launchOptions: process.env.PLAYWRIGHT_EDGE ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {} },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: 'npm run dev', env: { VITE_WEB3FORMS_ACCESS_KEY: 'test-key' }, url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI },
});
