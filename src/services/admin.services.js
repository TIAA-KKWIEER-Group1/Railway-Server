import adminModel from '../models/admin.model.js';

export const createAdmin = (adminData) => {
  return adminModel.create(adminData);
};

export const find = (userName) => {
  return adminModel.findOne({ userName });
};
