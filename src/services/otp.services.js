import otpModel from '../models/otp.model.js';

export const addOTP = (mobileNo, otp) => {
  const otpData = { mobileNo, otp };
  return otpModel.create(otpData);
};

// check if mobile no exists and uif exists then update otp
export const findMobileNoAndUpdate = async (mobileNo, otp) => {
  const result = await otpModel.updateOne(
    { mobileNo },
    {
      $set: { otp },
    },
  );

  if (result.matchedCount === 1 && result.modifiedCount === 1) {
    return true;
  } else {
    return false;
  }
};

export const verifyOTPAndDelete = (mobileNo, otp) => {
  return otpModel.findOneAndDelete({ mobileNo, otp });
};
