import userModel from '../models/user.model.js';
import reservationModel from '../models/reservation.model.js';

export const createUser = (user) => {
  return userModel.create(user);
};

export const findUserWithMobileNO = (mobileNo) => {
  return userModel.findOne({ mobileNo });
};

export const findUserWithId = (id) => {
  return userModel.findById(id);
};

export const getReservationDetails = (id) => {
  return reservationModel.find({ userId: id });
};
