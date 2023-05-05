const EXPIRY_DAYS = 180;

export const cookieOptions = {
  sameSite: process.env['NODE_ENV'] === 'production' ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
  secure: process.env['NODE_ENV'] === 'production', // must be true if sameSite='none',
  httpOnly: true,
  maxAge: EXPIRY_DAYS * (24 * 60 * 60 * 1000),
};
