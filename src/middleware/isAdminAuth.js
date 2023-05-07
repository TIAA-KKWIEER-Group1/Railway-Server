import decodeToken from '../utils/token/decodeToken.js';

export const isAdminAuth = (req, res, next) => {
  const token = req.cookies['token'];

  if (!token) {
    return res.status(401).json({ message: 'Not LoggedIn as Admin' });
  }

  // Verify the token
  try {
    const authTokenData = decodeToken(token);

    // Check if data exits
    if (!authTokenData.isAdmin) {
      res.clearCookie('token');
      return res.status(401).json({ message: 'Not LoggedIn as Admin' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Not LoggedIn as Admin' });
  }
};
