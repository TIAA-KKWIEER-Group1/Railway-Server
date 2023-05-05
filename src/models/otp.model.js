import mongoose from 'mongoose';

const otpSchema = mongoose.Schema({
  mobileNo: { type: String, required: true },
  otp: { type: String, required: true },
});

export default mongoose.model('Otp', otpSchema);
