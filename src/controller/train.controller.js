import moment from 'moment';
import * as trainServices from '../services/train.services.js';

export const searchTrain = async (req, res) => {
  const { source, destination, date } = req.query;

  if (!source || !destination || !date) {
    return res.status(400).json({ message: 'please enter all the fields' });
  }

  // date format day-month-year;
  // const [day, month, year] = date.split('-');
  // console.log(day, month, year);
  // const sampleDate = new Date(year, month - 1, day);
  // sampleDate.setHours(0, 0, 0, 0);
  // console.log(sampleDate);

  const d1 = moment.utc(date, 'DD-MM-YYYY');
  const searchDate = d1.toDate();

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
