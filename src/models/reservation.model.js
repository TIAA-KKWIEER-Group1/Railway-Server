import mongoose from "mongoose";

const reservationSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    middleName: {type: String, required: true},
    lastName: {type: String, required: true},

    age: {type: Number, required: true},
    
    gender: {type: String, required: true}
})