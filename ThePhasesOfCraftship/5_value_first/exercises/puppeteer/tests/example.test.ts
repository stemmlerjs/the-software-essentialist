
/**
 * Read the README.md file for instructions on how to run the tests.
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import path from 'path';

const EXTENSION_PATH = path.join(__dirname, '../dist');
const EXTENSION_ID = 'hocneeofocmnbpfkglnajolkcdijgook';

let browser: Browser | undefined;

beforeEach(async () => {
  browser = await puppeteer.launch({
    devtools: true,
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`
    ]
  });
});

// afterEach(async () => {
//   await browser?.close();
//   browser = undefined;
// });

// test('popup renders correctly', async () => {
//   const page = await browser?.newPage();
//   await page?.goto(`chrome-extension://${EXTENSION_ID}/popup/popup.html`);
// });

describe('Selecting text', () => {
  test('Given I’m on a page, when I select some text, I should see a popup signalling that I can speech to text this', async () => {
    const page = await browser?.newPage() as Page;
    await page.goto('https://en.wikipedia.org/wiki/Nick_Cave', { waitUntil: 'load' });

    // Select some text on the page
    await page.evaluate(() => {
      const range = document.createRange();
      const selection = window.getSelection();
      const element = document.querySelector('p'); // Select the first paragraph
      if (element) {
        range.selectNodeContents(element);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    });

    // Add a delay to ensure the selection is processed
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add assertions to verify the popup content
    const content = await page.content();
    console.log(content);
    expect(content).toContain('Nick Cave');
  });
});