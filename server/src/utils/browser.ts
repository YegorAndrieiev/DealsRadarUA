import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser } from 'puppeteer';
import { env } from '../config/env';
puppeteer.use(StealthPlugin());

let browser: Browser | null = null;
let idleTimer: NodeJS.Timeout | null = null;

export async function getBrowser(): Promise<Browser> {
  if (idleTimer) clearTimeout(idleTimer);
  if (!browser) {
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
    ];
    if (env.PROXY_HOST) {
      args.push(`--proxy-server=http://${env.PROXY_HOST}`);
    }
    browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args,
    });
  }
  return browser;
}
export function scheduleBrowserCleanup() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(
    async () => {
      if (browser) {
        console.log('Browser idle for 10 minutes, closing...');
        await browser.close();
        browser = null;
      }
    },
    10 * 60 * 1000,
  );
}
