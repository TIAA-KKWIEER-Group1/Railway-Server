import userModel from '../models/user.model.js';

export const createUser = (user) => {
  return userModel.create(user);
};

export const findUser = (mobileNo) => {
  return userModel.findOne({ mobileNo });
};
