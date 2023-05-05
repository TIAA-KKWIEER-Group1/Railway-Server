import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNo: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  password: { type: String, required: true },

  // optional
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
