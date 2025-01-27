import puppeteer, { Browser, Puppeteer } from 'puppeteer';
import path from 'path'

const SAMPLES_REPO_PATH = path.join(__dirname, '../..')
const EXTENSION_PATH = `${SAMPLES_REPO_PATH}/dist`;
const EXTENSION_ID = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCq1qqWj8ptsh0WbUHgt7D6EBC5iJBoHxgwr7KcOoBG1Y2ZJrvd/QskA9XRKS0m5U8X5F7VVZz0z/n16qdbGx7sYuldOC+HJE0ezR9ytb5KFNQ4eDFLjJkYwZ5vOay5t1rhf8ytfNIvVJmlw2n+gVu+TRMNyv97PpyfkMKAZyj0xop3PeFKpmTN0YDkf1Dw0M7dBsm4ATR0bF1dsoOPs/cdTW0wXHpAKHdBUp5G2su8l3rMRoDqKc8ocGwD33gYonsC9YR2blFGq1Hm0MvQ37jXo405nVuKG7NRLxxnMBQqClzI1+TlNyNGANocFh8Anuv4DTc8Yk8isuj7sk4XuQjZAgMBAAECggEAAt3zDe91fQ10qdgv4gFjLHHRk14vLOLSCUXMOw1LnXoJqXd6G/nE/UKSjN3iiUO8OzvqEC14Iq73fxYu3yYKM6WzTI0GqyoY9eUzsRKgvLszFowvKO6VRnzqrOuBsmTZLG30dY2Mih54LPfQaGTWW9AM+6Rw+39WVI0y3mxyG615i69bEzcoqptysj28JLtUnItyYliXAo7coBsYTh4Fqx/pRwb6/WtXBrGFS7Sqc0XSbxZCacnK7QtYK7FypcAnIZEOoMJr6hssMZFkPSY5hAut1p/oRfAvblGGcHthGmIlshr3O9zfPcXM4xoheufy+/J/GDOkeNK8WC+b0zVxwQKBgQDwEPGiBkttDQq4jqSex9BxjdssG8SPGE5A/4PQBb3gk8nCLz0QaoQyFlOyvABWDRPzWsxcqbU0OCqL7EuJ9+6/TbFkkKSddgnN34PL785z1g/SpvVElAh1JRYv6+bR+TQa4YvCWXe3ARlhVja7ng0fuJMhzecrLS0rj+h+JGbA8QKBgQC2LXL6+TI5GO2VUPt29/jf/uR8Bjo8RZu4mQ8Q+4MTXFcAF+mGXwzLE4PAn2JbUfUbnilLnci84ds4VtKocl7hSXQHRHjQ04UqUfV8q07L+/v0sVzkcuxTCtyAKvKcwHiDZ/o9blsxxfYZPyNCF2dYH6G4oSsHm9xJ32eVffJGaQKBgQDBymvEh6BLn8OPyFZLdrFleUX8DU5W1SAWiC03t+rXZ3XvM4LvxYyBglR+bBU5YcVBJYLjKnwEc3KlEVLJRUONWoJg1AKOucKgVlZmQmc+Swbq3awQeA97wTxv4tapmaneKURQ1zg0msaKNLZqLeQaPz1GhJif2hAkoj7j1S69gQKBgB0DLe2EJBhtvOBrrjBrG0po6HBL+ZhBqaQDVB/rPhumOAC+ziTlHD93EyNo/pv2eGd2j7MIJMDX4zactR24YR3VudGyeN8g4HM17Dd3fKwFrEFywY1sM/ChqS4MKOkHyel7dKG14nYRxbiNkori+UVSfEnP+O9URgfJuVBYZ24JAoGAcyihgsKDXYmFiEnzyXQ7UKg1Nm8d0i0k3xPXb/1oozrf0SA2gBmpdizn3jPfHs/k0W0wcEaKiRXltQymXbIm2e8api49auD15T22x5jqSX/iLyU27emv0xqMJ9OBGR//yQDB1Xi7Yo/WmgMJKi16rAmoG66RhqF/axIA/9nXV+Q=';

let browser: Browser | undefined;

beforeEach(async () => {
  browser = await puppeteer.launch({
    // Set to 'new' to hide Chrome if running as part of an automated build.
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`
    ]
  });
  // Add a delay to ensure the extension is fully loaded
  await new Promise(resolve => setTimeout(resolve, 1000));
});

afterEach(async () => {
  await browser?.close();
  browser = undefined;
});

describe('Speech to text', () => {

  test('popup renders correctly', async () => {
    const page = await browser?.newPage();
    await page?.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
    // Add a delay to ensure the page is fully loaded
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

})