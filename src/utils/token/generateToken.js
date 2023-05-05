import jwt from 'jsonwebtoken';

export const generateTokenForUser = (id, mobileNo) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    console.log('Secret Key not found');
    throw new Error('Secret Key not found');
  }

  const tokenBody = {
    id,
    mobileNo,
    isAdmin: false,
  };

  const token = jwt.sign(tokenBody, SECRET_KEY);
  if (!token) throw new Error('Could not generate token');

  return token;
};

export const generateTokenForAdmin = (id, userName) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    console.log('Secret Key not found');
    throw new Error('Secret Key not found');
  }

  const tokenBody = {
    id,
    userName,
    isAdmin: true,
  };

  const token = jwt.sign(tokenBody, SECRET_KEY);
  if (!token) throw new Error('Could not generate token');

  return token;
};
