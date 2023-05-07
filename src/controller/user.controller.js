import { generateOTP } from '../utils/otp/generateOTP.js';
import * as userServices from '../services/user.services.js';
import * as adminServices from '../services/admin.services.js';
import * as otpServices from '../services/otp.services.js';
import bcrypt from 'bcryptjs';
import { generateTokenForUser } from '../utils/token/generateToken.js';
import { sendOTP } from '../utils/otp/sendOTP.js';
import { cookieOptions } from '../config/cookie.js';
import { decodeToken } from '../utils/token/decodeToken.js';
import TrainSchedule from '../models/trainSchedule.model.js';
export const login = async (req, res) => {
  const { mobileNo, password } = req.body;

  if (!mobileNo || !password) {
    return res
      .status(400)
      .json({ message: 'Please enter all required fields ' });
  }

  try {
    const isUser = await userServices.findUserWithMobileNO(mobileNo);

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

    const isUserAdmin = false;
    const token = generateTokenForUser(isUser._id, isUser.mobileNo);
    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      message: 'Login Successful',
      user: {
        firstName: isUser.firstName,
        lastName: isUser.lastName,
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
    return res.status(400).json({ message: 'Please provide a Mobile No' });
  }

  try {
    const isUser = await userServices.findUserWithMobileNO(mobileNo);

    // if user exists
    if (isUser) {
      return res.status(404).json({ message: 'Mobile NO already registered' });
    }

    const OTP = generateOTP(6);

    // if user already has OTP, then update it
    const isOTPUpdated = await otpServices.findMobileNoAndUpdate(mobileNo, OTP);

    if (!isOTPUpdated) {
      await otpServices.addOTP(mobileNo, OTP);
    }

    // send the OTP
    const countryCode = '+91';
    const newMobileNo = countryCode + '' + mobileNo;

    sendOTP(newMobileNo, OTP);

    return res
      .status(200)
      .json({ message: `OTP sent successfully to ${mobileNo} ` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};

export const verifyOTPAtRegister = async (req, res) => {
  const { firstName, lastName, mobileNo, password, email, otp } = req.body;

  if (!firstName || !lastName || !mobileNo || !password || !otp) {
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

export const getLoginStatus = async (req, res) => {
  const token = req.cookies['token'];
  if (!token) {
    return res.status(200).json({ isLoggedIn: false });
  }

  try {
    const authTokenData = decodeToken(token);
    if (authTokenData.isAdmin) {
      const admin = await adminServices.find(authTokenData.userName);

      if (!admin) {
        return res.status(200).json({ isLoggedIn: false });
      }
      return res
        .status(200)
        .json({ isLoggedIn: true, isAdmin: true, admin: admin.userName });
    } else {
      const user = await userServices.findUserWithMobileNO(
        authTokenData.mobileNo,
      );
      if (!user) {
        return res.status(200).json({ isLoggedIn: false });
      }

      const loggedInUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        mobileNo: user.mobileNo,
      };

      return res
        .status(200)
        .json({ isLoggedIn: true, isAdmin: false, user: loggedInUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token', cookieOptions);
  return res.status(200).json({ message: 'User Logout successful' });
};
export const getCSV = async (req, res) => {
  const data = await TrainSchedule.find();
  console.log(data);
  res.send(data);
};

export const getProfile = async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);

  try {
    const profile = await userServices.findUserWithId(userId);
    if (!data) {
      return res.status(404).json('NO such user found');
    }

    const reservation = await userServices.getReservationDetails(userId);

    return res
      .status(200)
      .json({ message: 'OK', data: { profile, reservation } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};
