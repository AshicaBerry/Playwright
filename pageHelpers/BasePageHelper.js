const { expect } = require('@playwright/test');

exports.BasePageHelperPom = class BasePageHelperPom {
  constructor(page) {
    this.page = page;
  }
  async checkElementToBeVisible(element) {
    const locator = this.page.locator(element);
    await expect(locator).toBeVisible();
    return locator;
  }

  async checkiFrameToBeVisible(frameName, frameElement) {
    const locator = this.page.frameLocator(frameName).locator(frameElement);
    await expect(locator).toBeVisible({ timeout: 90000 });
    return locator;
  }

  async sendTextToiFrameElement(frameName, frameElement, text) {
    const locator = await this.checkiFrameToBeVisible(frameName, frameElement);
    await locator.click();
    await locator.type(text);
  }

  async scrollElement(element) {
    await this.page.waitForSelector(element, {
      visible: true,
      timeout: 30000,
    });
    await this.page.$eval(element, (elem) => {
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
    });
  }

  async openURL(url) {
    await this.page.goto(url, { waitUntil: 'networkidle0' });
    // await page.waitForNavigation({
    // 	timeout: 90000,
    // 	waitUntil: 'domcontentloaded',
    // });
  }

  async sendText(element, text) {
    const locator = await this.checkElementToBeVisible(element);
    await locator.type(text);
  }

  async clickOnElement(element) {
    const locator = await this.checkElementToBeVisible(element);
    await locator.click();
  }

  async checkElementToContainText(element, expectedText) {
    const locator = this.page.locator(element);
    await expect(locator).toContainText(expectedText);
  }

  async checkPageToHaveTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  async checkPageToHaveUrl(url) {
    await expect(this.page).toHaveURL(url);
  }

  async checkElementToHaveClass(element, expectedClass) {
    /**
     * const locator = page.locator('#component');
       await expect(locator).toHaveClass(/selected/);
    */
    const locator = this.page.locator(element);
    await expect(locator).toHaveClass(expectedClass);

    /**
     * const locator = page.locator('list > .component');
       await expect(locator).toHaveClass(['component', 'component selected', 'component']);
     */
  }

  async checkElementToHaveAttribute(element, name, value) {
    const locator = this.page.locator(element);
    await expect(locator).toHaveAttribute(name, value);
  }

  async getAllInnerTexts(element) {
    let textsArray = [];
    const locator = this.page.locator(element);
    textsArray = await locator.allInnerTexts();
    return textsArray;
  }
  async getAllTextContent(element) {
    let textsArray = [];
    const locator = this.page.locator(element);
    textsArray = await locator.allTextContents();
    return textsArray;
  }

  async getTextValueFromField(element) {
    const locator = this.page.locator(element);
    // let textValue = await locator.innerText();
    let textValue = await locator.inputValue();
    console.log('textvalue', textValue);
    return textValue;
  }

  async gettingFieldValue(element) {
    let inputValue;
    await this.page.waitForSelector(element, { timeout: 5000 });
    inputValue = await this.page.$eval(
      element,
      (elementgiven) => elementgiven.value,
    );
    return inputValue;
  }

  generateRandomData = (list) => {
    const data = Math.floor(Math.random() * list.length);
    return list[data];
  };
};
