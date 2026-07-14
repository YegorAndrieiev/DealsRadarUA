import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { min15Limiter } from './middleware/rateLimit.middleware';
import { parseOLX } from './scrapers/olx';
import { parseProm } from './scrapers/prom';
import { parseRozetka } from './scrapers/rozetka';
import { scheduleBrowserCleanup } from './utils/browser';
const app = express();
app.use(
  cors({
    origin: 'https://deals-radar-ua-frontend.vercel.app', //use for local development: http://localhost:3000
    credentials: true,
  }),
);
app.use(express.json());
app.get('/', (req, res) => {
  res.send('DealsRadarUA API is running');
});
app.get('/api/search/rozetka', min15Limiter, async (req, res) => {
  const query = req.query.query as string;
  res.json(await parseRozetka(query));
  scheduleBrowserCleanup();
});

app.get('/api/search/prom', min15Limiter, async (req, res) => {
  const query = req.query.query as string;
  res.json(await parseProm(query));
  scheduleBrowserCleanup();
});

app.get('/api/search/olx', min15Limiter, async (req, res) => {
  const query = req.query.query as string;
  res.json(await parseOLX(query));
  scheduleBrowserCleanup();
});
app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${env.PORT}`);
});
