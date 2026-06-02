import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'node dist/src/main',
    url: 'http://localhost:3000/api/persons',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
