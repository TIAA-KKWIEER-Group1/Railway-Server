import mongoose from 'mongoose';
import * as trainServices from '../services/train.services.js';
import * as reservationServices from '../services/reservation.services.js';

export const bookTicket = async (req, res) => {
  const { passengerDetails, trainId, userId } = req.body;

  const requiredFields = [
    'firstName',
    'middleName',
    'lastName',
    'age',
    'gender',
    'coach',
  ];

  const hasAllRequiredFields = (passenger) =>
    requiredFields.every(
      (field) => passenger.hasOwnProperty(field) && passenger[field],
    );

  let acCount = 0,
    sleeperCount = 0,
    generalCount = 0;

  const details = [];

  for (const i in passengerDetails) {
    if (!hasAllRequiredFields(passengerDetails[i])) {
      return res.status(400).json({ message: 'Passenger details missing' });
    } else {
      if (passengerDetails[i].coach == 'ac') {
        acCount += 1;
      }

      if (passengerDetails[i].coach == 'sleeper') {
        sleeperCount += 1;
      }

      if (passengerDetails[i].coach == 'general') {
        generalCount += 1;
      }
    }
  }

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(trainId)
  ) {
    return res.status(404).json({ message: 'No such Train found' });
  }

  const data = {
    userId,
    trainId,
    passengerDetails,
  };

  try {
    const trainDetails = await trainServices.getTrainDetail(trainId);
    if (!trainDetails) {
      return res.status(404).json({ message: 'No such Train found' });
    }
    if (
      acCount > trainDetails.availableACCoach ||
      sleeperCount > trainDetails.availableSleeperCoach ||
      generalCount > trainDetails.availableGeneralCoach
    ) {
      return res.status(500).json({ message: 'Tickets not available' });
    }

    await trainServices.updateTrainAvailableStatus(
      trainDetails.availableACCoach - acCount,
      trainDetails.availableSleeperCoach - sleeperCount,
      trainDetails.availableGeneralCoach - generalCount,
      trainId,
    );

    await reservationServices.addReservation(data);

    const ticketDetails = [];

    for (const i in passengerDetails) {
      if (passengerDetails[i].coach == 'ac') {
        ticketDetails.push({
          seatNo: trainDetails.availableACCoach--,
          coach: 'ac',
          name:
            passengerDetails[i].firstName + ' ' + passengerDetails[i].lastName,
        });
      }

      if (passengerDetails[i].coach == 'sleeper') {
        ticketDetails.push({
          seatNo: trainDetails.availableSleeperCoach--,
          coach: 'sleeper',
          name:
            passengerDetails[i].firstName + ' ' + passengerDetails[i].lastName,
        });
      }

      if (passengerDetails[i].coach == 'general') {
        ticketDetails.push({
          seatNo: trainDetails.availableGeneralCoach--,
          coach: 'general',
          name:
            passengerDetails[i].firstName + ' ' + passengerDetails[i].lastName,
        });
      }
    }

    const PRN = trainDetails._id;

    return res.status(200).json({ message: 'OK', PRN, ticket: ticketDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};
