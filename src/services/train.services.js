import trainScheduleModel from '../models/trainSchedule.model.js';

export const searchTrains = (source, destination, sourceArrivalDate) => {
  return trainScheduleModel.find({ source, destination, sourceArrivalDate });
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
  const data = await trainScheduleModel.find();
  const stations = new Set();

  data.forEach((item) => {
    stations.add(item.source);
    stations.add(item.destination);

    // also add in between stations
    item.stations.map((station) => {
      stations.add(station.name);
    });
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
