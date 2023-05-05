import { generateOTP } from '../utils/otp/generateOTP.js';
import * as userServices from '../services/user.services.js';
import * as otpServices from '../services/otp.services.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token/generateToken.js';

const EXPIRY_DAYS = 180;

const cookieOptions = {
  sameSite: process.env['NODE_ENV'] === 'production' ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
  secure: process.env['NODE_ENV'] === 'production', // must be true if sameSite='none',
  httpOnly: true,
  maxAge: EXPIRY_DAYS * (24 * 60 * 60 * 1000),
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please enter all required fields ' });
  }

  try {
    const isUser = await userServices.findUserWithEmail(email);

    if (!isUser) {
      return res
        .status(401)
        .json({ message: 'Incorrect Username or Password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUser.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: 'Incorrect Username or Password' });
    }

    const token = generateToken(isUser._id, isUser.mobileNo);
    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      message: 'Login Successful',
      user: {
        email: isUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};

export const getOTPAtRegister = async (req, res) => {
  const { mobileNo } = req.body;
  if (!mobileNo) {
    return res.status(400).json({ message: 'Please provide a mobile No' });
  }

  try {
    const isUser = await userServices.findUserWithMobileNO(mobileNo);

    // if user exists
    if (isUser) {
      return res.status(404).json({ message: 'Mobile no already registered' });
    }

    const OTP = generateOTP(6);

    // if user already has OTP, then update it
    const isOTPUpdated = await otpServices.findMobileNoAndUpdate(mobileNo, OTP);

    if (isOTPUpdated) {
      return res.status(200).json({ message: 'otp is updated ' });
    } else {
      await otpServices.addOTP(mobileNo, OTP);
      return res.status(200).json({ message: 'OTP send' });
    }

    // TODO send sms and update the structure
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};

export const verifyOTPAtRegister = async (req, res) => {
  const { firstName, lastName, mobileNo, password, email, otp } = req.body;

  if (!firstName || !lastName || !mobileNo || !password || !email || !otp) {
    return res
      .status(400)
      .json({ message: 'Please enter all required fields ' });
  }

  try {
    const isVerified = await otpServices.verifyOTPAndDelete(mobileNo, otp);

    if (!isVerified) {
      return res.status(401).json({ message: 'Invalid OTP' });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const user = {
        firstName,
        lastName,
        mobileNo,
        password: hashPassword,
        email,
      };

      await userServices.createUser(user);
      return res.status(200).json({ message: 'Account created successfully' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};
