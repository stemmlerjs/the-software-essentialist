import puppeteer, { Browser } from 'puppeteer';
import path from 'path';

const EXTENSION_PATH = path.join(__dirname, '../dist');
const EXTENSION_ID = 'bfffdidkmbagekeeacpoikmdihbpodlg';

let browser: Browser | undefined;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`
    ]
  });
});

afterEach(async () => {
  await browser?.close();
  browser = undefined;
});

describe('Puppeteer Test', () => {
  it('should load example.com and check the title', async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    expect(title).toBe('Example Domain');
    await browser.close();
  });
});
