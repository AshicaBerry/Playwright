const { test } = require('@playwright/test');
test.describe('JS Popups', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://letcode.in/alert', {
      waitUntil: 'domcontentloaded',
    });
  });
  test('Handling JS Prompt', async ({ page }) => {
    /***
     * First we need to set the event listener and then trigger the action
     *  */
    page.on('dialog', (dialog) => {
      console.log('Message:', dialog.message());
      console.log('Default Value:', dialog.defaultValue());
      console.log('Type:', dialog.type());
      dialog.accept('Hi this is me');
    });
    await page.locator('#prompt').click(); // Triggering the action
    await page.locator('#accept').click();
    await page.locator('#confirm').click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
