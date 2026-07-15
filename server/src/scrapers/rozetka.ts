import { getBrowser } from "../utils/browser";
import * as cheerio from "cheerio";
import { Product } from "../utils/types";
import { createPage } from "../utils/createPage";
function cleanTitle(title: string): string {
  if (!title) return '';
  return title
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '')
    .replace(/^[^a-zA-Z0-9а-яА-ЯіІїЇєЄґҐ«"'\(\[\{]+/g, '')
    .trim();
}
function extractDataFromHtml(html: string): Product[] {
  try {
    const $ = cheerio.load(html);
    const finalProducts: Product[] = [];
    $('rz-catalog-tile').each((index, element) => {
      if (finalProducts.length >= 3) return false;
      const card = $(element);
      const linkElement = card.find('a.tile-title');
      const rawLink = linkElement.attr('href') || '';
      let link = '';
      if (rawLink) {
        if (rawLink.startsWith('http')) {
          link = rawLink; 
        } else if (rawLink.startsWith('//')) {
          link = `https:${rawLink}`;
        } else {
          link = `https://rozetka.com.ua${rawLink.startsWith('/') ? '' : '/'}${rawLink}`;
        }
      }
      const rawTitle = linkElement.attr('title')?.trim() || linkElement.text().trim();
      const title = cleanTitle(rawTitle);
      let priceElement = card.find('[data-testid="red-price-discount"], .red-price');
      if (priceElement.length === 0 || !priceElement.text().trim()) {
        priceElement = card.find('.price');
      }
      if (priceElement.length === 0 || !priceElement.text().trim()) {
        priceElement = card.find('.tile-price__value, .goods-tile__price-value');
      }
      const priceText = priceElement.text().trim();
      const priceTextClean = priceText.replace(/[\s\u00A0]/g, '').replace(',', '.');
      const priceMatch = priceTextClean.match(/\d+(\.\d+)?/);
      const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
      const imgElement = card.find('img.tile-image, .goods-tile__picture img');
      const image = imgElement.attr('src') || imgElement.attr('data-lazy') || 'https://placehold.co/400x400?text=Зображення%0AВідсутнє';
      const cardText = card.text().toLowerCase();
      const isUsed = cardText.includes('б/в') || cardText.includes('б/у') || cardText.includes('вжива');
      if (title && price > 0 && link) {
        finalProducts.push({
          id: `rozetka-${index}-${Date.now()}`,
          title,
          price,
          image,
          link,
          source: 'Rozetka',
          isUsed,
          conditionDetails: undefined,
        });
      }
    });
    
    return finalProducts;
  } catch (error) {
    console.error(`[Rozetka Scraper Error]:`, error);
    return [];
  }
}
export async function parseRozetka(searchQuery: string): Promise<any[]> {
  const encodedQuery = encodeURIComponent(searchQuery);
  const url = `https://rozetka.com.ua/ua/search/?text=${encodedQuery}`;
  const browser = await getBrowser();
  const page = await createPage(browser);
  try {
    await Promise.all([page.setViewport({ width: 1280, height: 800 }),
    page.setRequestInterception(true)]);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    const title = await page.title();
    if (title.includes('Just a moment') || title.includes('Attention Required')) {
      throw new Error('Cloudflare block could not be bypassed automatically.');
    }
    const html = await page.content();
    return extractDataFromHtml(html);
  } catch (error) {
    console.error(`[Rozetka Scraper Error]:`, error);
    throw error;
  } finally {
    await page.close();
  }
}