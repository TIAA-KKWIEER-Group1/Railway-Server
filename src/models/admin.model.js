import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model('Admin', adminSchema);
