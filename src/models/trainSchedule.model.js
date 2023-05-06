import mongoose from 'mongoose';

const trainScheduleSchema = mongoose.Schema({
  trainNo: { type: String, required: true },
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: String, required: true },
  totalSeat: { type: Number, required: true },
  noOfACCoach: { type: Number, required: true },
  capacityACCoach: { type: Number, required: true },

  noOfSleeperCoach: { type: Number, required: true },
  capacitySleeperCoach: { type: Number, required: true },

  noOfGeneralCoach: { type: Number },
  capacityGeneralCoach: { type: Number },

  stations: [
    {
      name: { type: String, required: true },
      arrivalDate: { type: String, required: true },
      departureTime: { type: String },
      haltTime: { type: Number, required: true },
    },
  ],
});

export default mongoose.model('TrainSchedule', trainScheduleSchema);
