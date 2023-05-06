import * as adminServices from '../services/admin.services.js';
import { cookieOptions } from '../config/cookie.js';
import bcrypt from 'bcryptjs';
import { generateTokenForAdmin } from '../utils/token/generateToken.js';
export const login = async (req, res) => {
  const { userName, password } = req.body;

  if ((!userName, !password)) {
    return res
      .status(400)
      .json({ message: 'Please enter all required fields ' });
  }

  try {
    const isAdmin = await adminServices.find(userName);

    if (!isAdmin) {
      return res
        .status(401)
        .json({ message: 'Incorrect Username or Password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, isAdmin.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: 'Incorrect Username or Password' });
    }

    const isUserAdmin = true;
    const token = generateTokenForAdmin(isAdmin._id, isAdmin.userName);
    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      message: 'Login Successful',
      user: isAdmin.userName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};

export const test = (req, res) => {
  res.send(`Hello`);
};
