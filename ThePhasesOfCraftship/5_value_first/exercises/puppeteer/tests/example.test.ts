import puppeteer, { Browser } from 'puppeteer';
import path from 'path';

const EXTENSION_PATH = path.join(__dirname, '../dist');
const EXTENSION_ID = 'hocneeofocmnbpfkglnajolkcdijgook';

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

test('popup renders correctly', async () => {
  const page = await browser?.newPage();
  await page?.goto(`chrome-extension://${EXTENSION_ID}/public/popup.html`);
});