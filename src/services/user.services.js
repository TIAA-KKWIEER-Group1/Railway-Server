import userModel from "../models/user.model.js"

export const createUser = (user) => {
    return userModel.create(user);
}