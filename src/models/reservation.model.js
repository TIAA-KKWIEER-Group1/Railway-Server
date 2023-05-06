import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
  userId: { type: String, required: true },
  trainId: { type: String, required: true },
  bookingDate: { type: Date, value: Date.now },
  passengerDetails: [
    {
      firstName: String,
      middleName: String,
      lastName: String,
      age: Number,
      gender: String,
      coach: String,
    },
  ],
});

export default mongoose.model('Reservation', reservationSchema);
