import trainScheduleModel from '../models/trainSchedule.model.js';

export const searchTrains = (source, destination) => {
  return trainScheduleModel.find({ source, destination });
};

export const getAllTrainSchedule = () => {
  return trainScheduleModel.find();
};
