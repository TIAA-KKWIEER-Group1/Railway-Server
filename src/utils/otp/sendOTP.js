import twilio from 'twilio';

export const sendOTP = async (mobileNo, OTP) => {
  const MESSAGE = `Your OTP is ${OTP}`;

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  return await client.messages.create({
    body: MESSAGE,
    from: process.env.TWILIO_ACCOUNT_PHONE_NO,
    to: mobileNo,
  });
};
