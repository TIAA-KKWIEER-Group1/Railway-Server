import { decodeToken } from '../utils/token/decodeToken.js';

const isUserAuth = (req, res, next) => {
  const token = req.cookies['token'];

  if (!token) {
    return res.status(401).json({ message: 'User not LoggedIn' });
  }
  try {
    // Verify the token
    const authTokenData = decodeToken(token);

    if (authTokenData.isAdmin) {
      return res.status(401).json({ message: 'Not LoggedIn as User' });
    }

    req.body.userId = authTokenData.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'User not LoggedIn' });
  }
};

export default isUserAuth;
