import trainScheduleModel from '../models/trainSchedule.model.js';

export const searchTrains = (source, destination, departureDate) => {
  return trainScheduleModel.find({ source, destination, departureDate });
};

export const getAllTrainSchedule = () => {
  return trainScheduleModel.find();
};
