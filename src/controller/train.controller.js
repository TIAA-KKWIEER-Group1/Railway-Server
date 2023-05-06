import moment from 'moment';
import * as trainServices from '../services/train.services.js';

export const searchTrain = async (req, res) => {
  const { source, destination, date } = req.query;

  if (!source || !destination || !date) {
    return res.status(400).json({ message: 'please enter all the fields' });
  }

  const searchDate = date.toString();
  try {
    const data = await trainServices.searchTrains(
      source,
      destination,
      searchDate,
    );

    return res.status(200).json({ message: 'OK', data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};

export const getAllTrainSchedule = async (req, res) => {
  try {
    const data = await trainServices.getAllTrainSchedule();
    return res.status(200).json({ message: 'OK', data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};
