import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser } from "puppeteer";

puppeteer.use(StealthPlugin());

let browser: Browser | null = null;
let idleTimer: NodeJS.Timeout | null = null;

export async function getBrowser(): Promise<Browser> {
  if (idleTimer) clearTimeout(idleTimer);
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
    });
  }
  return browser;
}
export function scheduleBrowserCleanup() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(async () => {
    if (browser) {
      console.log('Browser idle for 10 minutes, closing...');
      await browser.close();
      browser = null;
    }
  }, 10 * 60 * 1000);
}