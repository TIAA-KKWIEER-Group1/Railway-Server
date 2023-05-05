import mongoose from 'mongoose';

const trainScheduleSchema = mongoose.Schema({
  no: { type: String, required: true },
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },

  noOfACCoach: { type: Number, required: true },
  capacityACCoach: { type: Number, required: true },

  noOfSleeperCoach: { type: Number, required: true },
  capacitySleeperCoach: { type: Number, required: true },

  noOfGeneralCoach: { type: Number, required: true },
  capacityGeneralCoach: { type: Number, required: true },

  stations: [
    {
      name: { type: String, required: true },
      arrivalDate: { type: Date, required: true },
      departureDate: { type: Date, required: true },
      haltTime: { type: Number, required: true },
    },
  ],
});

export default mongoose.model('TrainSchedule', trainScheduleSchema);
