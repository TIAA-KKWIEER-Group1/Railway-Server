import * as adminServices from '../services/admin.services.js';
import { cookieOptions } from '../config/cookie.js';
import bcrypt from 'bcryptjs';
import { generateTokenForAdmin } from '../utils/token/generateToken.js';
import * as trainServices from '../services/train.services.js';
import { getDateTimeFromDate } from '../utils/getDateTimeFromDate.js';
import { getStringFromDate } from '../utils/getStringFromDate.js';

export const login = async (req, res) => {
  const { userName, password } = req.body;

  if ((!userName, !password)) {
    return res
      .status(400)
      .json({ message: 'Please enter all required fields ' });
  }

  try {
    const isAdmin = await adminServices.find(userName);

    if (!isAdmin) {
      return res
        .status(401)
        .json({ message: 'Incorrect Username or Password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, isAdmin.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: 'Incorrect Username or Password' });
    }

    const isUserAdmin = true;
    const token = generateTokenForAdmin(isAdmin._id, isAdmin.userName);
    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      message: 'Login Successful',
      user: isAdmin.userName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};

export const updateTrainTime = async (req, res) => {
  const { trainId, stationName, updatedArrivalDate, updatedArrivalTime } =
    req.body;
  // console.log(trainId, stationName)

  try {
    const trainDetail = await trainServices.getTrainDetail(trainId);
    if (!trainDetail) {
      return res.status(404).json({ message: 'No such train found' });
    }
    trainDetail.isDelayed = true;

    if (trainDetail.destination === stationName) {
      trainDetail.destinationArrivalDate = updatedArrivalDate;
      trainDetail.destinationArrivalTime = updatedArrivalTime;

      await trainDetail.save();
      return res
        .status(200)
        .json({ message: 'Train time updated successfully' });
    }

    if (stationName === trainDetail.source) {
      // source time is updated

      //TODO: departure time

      const oldTime = getDateTimeFromDate(
        trainDetail.sourceArrivalDate,
        trainDetail.sourceArrivalTime,
      );

      const newTime = getDateTimeFromDate(
        updatedArrivalDate,
        updatedArrivalTime,
      );

      const difference = newTime - oldTime;
      console.log(difference, 'hi');

      trainDetail.sourceArrivalDate = updatedArrivalDate;
      trainDetail.sourceArrivalTime = updatedArrivalTime;

      const stationDepartureDateTime = getDateTimeFromDate(
        trainDetail.sourceDepartureDate,
        trainDetail.sourceDepartureTime,
      );

      console.log(difference);

      const stationUpdatedDepartureDateTime = new Date(
        stationDepartureDateTime.getTime() + difference,
      );
      const [d, t] = getStringFromDate(stationUpdatedDepartureDateTime);

      console.log(updatedArrivalDate, updatedArrivalTime);
      console.log(
        getStringFromDate(stationDepartureDateTime),
        getStringFromDate(stationUpdatedDepartureDateTime),
      );

      trainDetail.sourceDepartureDate = d;
      trainDetail.sourceDepartureTime = t;
    }

    for (let i = 0; i < trainDetail.stations.length; i++) {
      if (stationName === trainDetail.stations[i].name) {
        // this is the station tp update;

        console.log();

        const oldTime = getDateTimeFromDate(
          trainDetail.stations[i].arrivalDate,
          trainDetail.stations[i].arrivalTime,
        );

        const newTime = getDateTimeFromDate(
          updatedArrivalDate,
          updatedArrivalTime,
        );

        const difference = newTime - oldTime;

        for (let k = i; k < trainDetail.stations.length; k++) {
          // update arrival time
          const stationArrivalDateTime = getDateTimeFromDate(
            trainDetail.stations[k].arrivalDate,
            trainDetail.stations[k].arrivalTime,
          );

          const stationUpdatedArrivalDateTime = new Date(
            stationArrivalDateTime.getTime() + difference,
          );
          const [d, t] = getStringFromDate(stationUpdatedArrivalDateTime);

          trainDetail.stations[k].arrivalDate = d;
          trainDetail.stations[k].arrivalTime = t;

          // departure
          if (k == trainDetail.stations.length - 1) {
            break;
          }
          const stationDepartureDateTime = getDateTimeFromDate(
            trainDetail.stations[k].arrivalDate,
            trainDetail.stations[k].arrivalTime,
          );

          const stationUpdatedDepartureDateTime = new Date(
            stationDepartureDateTime.getTime() + difference,
          );
          const [d_d, d_t] = getStringFromDate(stationUpdatedDepartureDateTime);

          trainDetail.stations[k].departureDate = d_d;
          trainDetail.stations[k].departureTime = d_t;
        }
        break;
      }
    }

    await trainDetail.save();

    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};
