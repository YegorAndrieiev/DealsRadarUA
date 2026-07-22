import dotenv from 'dotenv';
dotenv.config();
export const env = {
  PORT: Number(process.env.PORT) || 5000,
  PROXY_USERNAME: process.env.PROXY_USERNAME || '',
  PROXY_PASSWORD: process.env.PROXY_PASSWORD || '',
  PROXY_HOST: process.env.PROXY_HOST || '',
};
