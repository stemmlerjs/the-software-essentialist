import path from "path";
import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

const EXTENSION_PATH = path.join(__dirname, '../dist');
const EXTENSION_ID = 'jkomgjfbbjocikdmilgaehbfpllalmia';

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