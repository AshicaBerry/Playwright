const { test, expect } = require('@playwright/test');

test.describe('Basic Test Functionality:20', () => {
  test('Test should pass:1', async ({ page }, testInfo) => {
    await page.goto('https://playwright.dev/', {
      waitUntil: 'domcontentloaded',
    });
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright');
    const name = 'test123';
    const email = 'test123@gmail.com';
    const path = testInfo.outputPath('landingpage.png');
    await page.screenshot({
      path,
    });
    testInfo.attachments.push({
      name: {
        SuperAdminName: name,
        SuperAdminEmail: email,
        name: 'landinPageScreenshot',
        path,
        contentType: 'image/png',
      },
      contentType: 'application/json',
    });
    testInfo.attachments.push({
      name: {
        testSuperAdminName: name,
        testSuperAdminEmail: email,
        name: 'testlandinPageScreenshot',
        path,
        contentType: 'image/png',
      },
      contentType: 'application/json',
    });
    console.log(testInfo.title);
    console.log(testInfo.attachments);
  });

  test('Test should fail:2', async ({ page }) => {
    await page.goto('https://www.google.com', {
      waitUntil: 'domcontentloaded',
    });
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright');
  });
});
