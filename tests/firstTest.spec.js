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
    const pathone = testInfo.outputPath('landingpageone.png');
    await page.screenshot({
      pathone,
    });
    const pathtwo = testInfo.outputPath('landingpagetwo.png');
    await page.screenshot({
      pathtwo,
    });
    testInfo.attachments.push({
      name: {
        SuperAdminName: name,
        SuperAdminEmail: email,
        name: 'landinPageScreenshot',
        pathone,
        contentType: 'image/png',
      },
      contentType: 'application/json',
    });
    testInfo.attachments.push({
      name: {
        testSuperAdminName: name,
        testSuperAdminEmail: email,
        name: 'testlandinPageScreenshot',
        pathtwo,
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
