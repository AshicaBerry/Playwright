const { devices } = require('@playwright/test');
const { expect } = require('@playwright/test');

// const { executablePath } = require('./BaseHelper').demoBrowser();
// const chromium = require('chrome-aws-lambda');
// // const { demoBrowser } = require('./BaseHelper');
// const path = chromium.executablePath;
// const executablePath = process.platform === 'linux' ? path : '';
// ('/root/.cache/ms-playwright/chromium-1005/chrome-linux/chrome');
// console.log('executable path altered::', executablePath);
// const { chromium } = require('playwright-core');
// const bundledChromium = require('chrome-aws-lambda');
const config = {
  // forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: 0,
  // expect: {
  timeout: 90 * 1000,
  globalTimeout: 90000,
  // },
  testMatch: [
    '**/tests/*.spec.js',
    // '**/jsfiles/login2.spec.js',
    // '**/jsfiles/signup.spec.js',
  ],
  // outputDir: '/tmp/test-artifacts',
  use: {
    trace: 'on-first-retry',
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'on',
    // channel: 'chrome',
    // launchOptions: {
    // 	executablePath: '/tmp/chromium',
    headless: false,
    // 	args: [
    // 		'--allow-no-sandbox-job',
    // 		'--no-sandbox',
    // 		'--disable-setuid-sandbox',
    // 		'--disable-dev-shm-usage',
    // 	],
    // },
    // launchOptions: {
    // 	headless: true,
    // 	executablePath: '/usr/bin/google-chrome',
    // 	args: ['--no-sandbox', '--no-zygote'],
    // },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    // 	name: 'firefox',
    // 	use: { ...devices['Desktop Firefox'] },
    // },
    // {
    // 	name: 'webkit',
    // 	use: { ...devices['Desktop Safari'] },
    // },
  ],

  reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],
  // reporter : 'line',
  // reporter: [ ['html', { outputFolder: 'my-report' , open : 'always'},] ],
  reporter: [
    [
      'json',
      {
        outputFile: '/tmp/results.json',
      },
    ],
    // ['./my-reporter.js'],
    ['html', { outputFolder: '/tmp/test-report', open: 'never' }],
  ],
};
//'/tmp/test-report'

module.exports = config;
