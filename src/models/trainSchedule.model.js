import mongoose from 'mongoose';

const trainScheduleSchema = mongoose.Schema({
  no: { type: String, required: true },
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },

  sourceArrivalDate: { type: String, required: true },
  sourceArrivalTime: { type: String, required: true },
  sourceDepartureDate: { type: String, required: true },
  sourceDepartureTime: { type: String, required: true },

  destinationArrivalDate: { type: String },
  destinationArrivalTime: { type: String },

  noOfACCoach: { type: Number, required: true },
  capacityACCoach: { type: Number, required: true },
  availableACCoach: { type: Number, required: true },

  noOfSleeperCoach: { type: Number, required: true },
  capacitySleeperCoach: { type: Number, required: true },
  availableSleeperCoach: { type: Number, required: true },

  noOfGeneralCoach: { type: Number, required: true },
  capacityGeneralCoach: { type: Number, required: true },
  availableGeneralCoach: { type: Number },

  stations: [
    {
      name: { type: String },
      arrivalDate: { type: String },
      arrivalTime: { type: String },
      departureDate: { type: String },
      departureTime: { type: String },
      haltTime: { type: Number },
    },
  ],
  isDelayed: { type: Boolean, default: false },
});

export default mongoose.model('TrainSchedule', trainScheduleSchema);
