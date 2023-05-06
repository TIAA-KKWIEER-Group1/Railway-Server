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

  destinationArrivalDate: { type: String, required: true },
  destinationArrivalTime: { type: String, required: true },
  destinationDepartureDate: { type: String, required: true },
  destinationDepartureTime: { type: String, required: true },

  // departureDate: { type: String, required: true },
  // departureTime: { type: String, required: true },

  // destinationDate: { type: String, required: true },
  // destinationTime: { type: String, required: true },

  noOfACCoach: { type: Number, required: true },
  capacityACCoach: { type: Number, required: true },
  availableACCoach: { type: Number, required: true },

  noOfSleeperCoach: { type: Number, required: true },
  capacitySleeperCoach: { type: Number, required: true },
  availableSleeperCoach: { type: Number, required: true },

  noOfGeneralCoach: { type: Number, required: true },
  capacityGeneralCoach: { type: Number, required: true },
  availableGeneralCoach: { type: Number, required: true },

  stations: [
    {
      name: { type: String, required: true },
      arrivalDate: { type: String, required: true },
      arrivalTime: { type: String, required: true },
      departureDate: { type: String, required: true },
      departureTime: { type: String, required: true },
      haltTime: { type: Number, required: true },
    },
  ],
});

export default mongoose.model('TrainSchedule', trainScheduleSchema);
