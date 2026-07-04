import rateLimit from 'express-rate-limit';
export const min15Limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: {
    error: 'Too many attempts to search',
  },
});
