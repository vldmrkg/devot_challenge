import { defineConfig } from '@playwright/test';


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  reporter: [['list'], ['html', { open: 'never' }], ['junit', { outputFile: './test-results/junit/results.xml' }] ],
  globalTimeout: 120 * 60 * 1000,  // minutes
  timeout: 2 * 60 * 1000,    // minutes

  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10000,

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://practice.expandtesting.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'retain-on-failure',

    // Don't show browser
    headless: true,

    /* Screenshot on failure. */
    screenshot: "only-on-failure",

    /* default viewport */
    viewport: {height: 1080, width: 1920},

    // video: {
    //   mode: 'retain-on-failure',
    //   size: { width: 640, height: 480 }
    // },

    launchOptions: {
      // 1
      // args: ["--start-maximized"],
      args: ["--viewport=1920x1080"],

    },

  },

  /* Configure projects for major browsers */
  projects: [
  
    {
      name: 'chromium',
      use: { 
       // ...devices['Desktop Chrome'],
        channel: 'chromium',
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
          // viewport: null,
        
      },

   },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { 
    //     ...devices['Desktop Chrome'], 
    //     channel: 'chrome',
    //     viewport: { width: 1920, height: 1080 },
    //   },

    // },
  ],

});
