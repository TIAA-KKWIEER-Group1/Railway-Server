import reservationModel from '../models/reservation.model.js';

export const addReservation = (data) => {
  return reservationModel.create(data);
};
