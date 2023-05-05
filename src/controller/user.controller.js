import { generateOTP } from '../utils/otp/generateOTP.js';
import * as userServices from '../services/user.services.js';
import * as otpServices from '../services/otp.services.js';

export const login = async (req, res) => {
  return res.status(200).json({ message: 'login works' });
};

export const getOTPAtRegister = async (req, res) => {
  const { mobileNo } = req.body;
  if (!mobileNo) {
    return res.status(400).json({ message: 'Please provide a mobile No' });
  }

  try {
    const isUser = await userServices.findUser(mobileNo);

    // if user exists
    if (isUser) {
      return res.status(404).json({ message: 'Mobile no already registered' });
    }

    const OTP = generateOTP(6);

    const isOTPUpdated = await otpServices.findMobileNoAndUpdate(mobileNo, OTP);

    // if user already has OTP, (then we have updated it)
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
      .status(401)
      .json({ message: 'Please enter all required fields ' });
  }

  try {
    const isVerified = await otpServices.verifyOTPAndDelete(mobileNo, otp);
    console.log(isVerified);

    if (!isVerified) {
      return res.status(401).json({ message: 'Invalid OTP' });
    } else {
      return res.status(200).json({ message: 'Valid OTP' });
    }
  } catch (error) {}
};
