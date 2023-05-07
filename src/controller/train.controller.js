import * as trainServices from '../services/train.services.js';
import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import multer from 'multer';
import trainScheduleModel from '../models/trainSchedule.model.js';
import { readTrainScheduleCSV } from '../utils/readTrainScheduleCSV.js';
// const TrainSchedule = require('../models/trainSchedule.model.js');
const path = require('path');
const csvtojson = require('csvtojson');
const csv = require('csv-parser');
const fs = require('fs');
const fsPromises = require('fs').promises;

const upload = multer({ dest: 'uploads/' });

export const searchTrain = async (req, res) => {
  const { source, destination, date } = req.query;

  if (!source || !destination || !date) {
    return res.status(400).json({ message: 'please enter all the fields' });
  }

  const searchDate = date.toString();
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

export const getInBetweenStations = async (req, res) => {
  const id = req.params['id'];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'No such Route found' });
  }

  try {
    const trainData = await trainServices.getInbetweenStations(id);

    if (!trainData) {
      return res.status(404).json({ message: 'No such Train route found' });
    }

    return res.status(200).json({ message: 'OK', data: trainData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};

export const getAllStations = async (req, res) => {
  try {
    const stations = await trainServices.getAllStations();
    return res.status(200).json({ message: 'OK', data: stations });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};

export const addTrain = async (req, res) => {
  try {
    await trainScheduleModel.create(req.body);
    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.....' });
  }
};
export const csvData = (req, res) => {
  const results = [];
  const file = fs.createReadStream(req.file.path);
  readTrainScheduleCSV(file);


    // console.log(result);
    
};
