import { Page, Browser } from 'puppeteer';
import { env } from '../config/env';
export async function createPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();
  if (env.PROXY_USERNAME && env.PROXY_PASSWORD) {
    await page.authenticate({
      username: env.PROXY_USERNAME,
      password: env.PROXY_PASSWORD,
    });
  }
  return page;
}
