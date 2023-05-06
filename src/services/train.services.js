import trainScheduleModel from '../models/trainSchedule.model.js';

export const searchTrains = (source, destination, departureDate) => {
  return trainScheduleModel.find({ source, destination, departureDate });
};

export const getAllTrainSchedule = () => {
  return trainScheduleModel.find();
};

export const getInbetweenStations = (id) => {
  return trainScheduleModel.findById(id);
};

export const getTrainDetail = (id) => {
  return trainScheduleModel.findById(id);
};

export const getAllStations = async () => {
  const data = await trainScheduleModel.aggregate([
    { $group: { _id: { source: '$source', destination: '$destination' } } },
    {
      $project: {
        _id: 0,
        source: '$_id.source',
        destination: '$_id.destination',
      },
    },
  ]);
  const stations = new Set();

  data.forEach((item) => {
    stations.add(item.source);
    stations.add(item.destination);
  });

  return Array.from(stations);
};

export const updateTrainAvailableStatus = (
  availableACCoach,
  availableSleeperCoach,
  availableGeneralCoach,
  trainId,
) => {
  return trainScheduleModel.findByIdAndUpdate(trainId, {
    availableACCoach,
    availableSleeperCoach,
    availableGeneralCoach,
  });
};
