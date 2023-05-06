import { createRequire } from 'module';
import TrainSchedule from '../models/trainSchedule.model.js';
import mongoose from 'mongoose';
const require = createRequire(import.meta.url);
const path = require('path');
const csvtojson = require('csvtojson');
const csv = require('csv-parser');
const fs = require('fs');
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const excel = (req, res) => {
  try {
    console.log('Hello');
    csvtojson()
      .fromFile('Train.csv')
      .then((csvData) => {
        TrainSchedule.insertMany(csvData)
          .then(function () {
            console.log('Data inserted ');
            res.json({ success: 'success' });
          })
          .catch(function (err) {
            console.log(err);
          });
      });
  } catch (err) {
    console.log(err);
  }
};

export const csvData = (req, res) => {
  const results = [];
  console.log(req.file);
  // fs.createReadStream(req.file.path)
  //   .pipe(csv())
  //   .on('data', (data) => {
  //     results.push(data);
  //   })
  //   .on('end', () => {
  //     TrainSchedule.insertMany(results, (err, docs) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send('Internal Server Error');
  //       } else {
  //         console.log(docs);
  //         res.send('File Uploaded Successfully');
  //       }
  //     });
  //   });
};
