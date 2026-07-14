import { getBrowser } from "../utils/browser";
import * as cheerio from "cheerio";
import { Product } from "../utils/types";

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
    
    $('div[data-qaid="product_block"]').each((index, element) => {
      if (finalProducts.length >= 3) return false;
      const card = $(element);
      const linkElement = card.find('a[data-qaid="product_link"]');
      const relativeLink = linkElement.attr('href') || '';
      const link = relativeLink.startsWith('http') 
        ? relativeLink 
        : `https://prom.ua${relativeLink}`;
        
      const rawTitle = linkElement.attr('title')?.trim() || card.find('span[data-qaid="product_name"]').text().trim();
      const title = cleanTitle(rawTitle);
      
      const priceText = card.find('[data-qaid="product_price"]').text().trim();
      const priceTextClean = priceText.replace(/\s/g, '').replace(',', '.');
      const priceMatch = priceTextClean.match(/\d+(\.\d+)?/);
      const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
      const imgElement = card.find('img');
      const sourceElement = card.find('picture source').first();
      let rawImage = sourceElement.attr('srcset') || 
                     imgElement.attr('data-src') || 
                     imgElement.attr('src') || 
                     'https://placehold.co/400x400?text=Зображення%0AВідсутнє';
      let image = rawImage.split(' ')[0];
      if (image.includes('_w200_h200')) {
        image = image.replace('_w200_h200', '_w640_h640');
      }
      const cardText = card.text().toLowerCase();
      const isUsed = cardText.includes('вживане') || cardText.includes('вживаний') 
      || cardText.includes('вживана') || cardText.includes('вживані');
      
      if (title && price > 0) {
        finalProducts.push({
          id: `prom-${index}-${Date.now()}`,
          title,
          price,
          image,
          link,
          source: 'Prom',
          isUsed,
          conditionDetails: undefined, 
        });
      }
    });
    
    return finalProducts;
  } catch (error) {
    console.error(`[Prom Scraper Parsing Error]:`, error);
    return [];
  }
}

export async function parseProm(query: string): Promise<Product[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://prom.ua/ua/search?search_term=${encodedQuery}`;
  
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await Promise.all([page.setViewport({ width: 1280, height: 800 }),
    page.setRequestInterception(true)]);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (['image', 'font', 'media'].includes(resourceType)) {
        req.abort();
      } else {
        req.continue();
      }
    });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    const title = await page.title();
    if (title.includes('Just a moment') || title.includes('Attention Required')) {
      throw new Error('Cloudflare block could not be bypassed automatically.');
    }

    const html = await page.content();
    return extractDataFromHtml(html);
  } catch (error) {
    console.error(`[Prom Scraper Error]:`, error);
    return [];
  } finally {
    await page.close();
  }
}