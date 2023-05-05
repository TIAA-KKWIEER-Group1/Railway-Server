import userModel from '../models/user.model.js';

export const createUser = (user) => {
  return userModel.create(user);
};

export const findUserWithMobileNO = (mobileNo) => {
  return userModel.findOne({ mobileNo });
};

export const findUserWithEmail = (email) => {
  return userModel.findOne({ email });
};
