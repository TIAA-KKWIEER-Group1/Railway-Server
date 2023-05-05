import jwt from 'jsonwebtoken';

export const decodeToken = (token) => {
  const SECRET_KEY = process.env['SECRET_KEY'];
  if (!SECRET_KEY) throw new Error('SECRET_KEY not Defined');

  return jwt.verify(token, SECRET_KEY);
};
