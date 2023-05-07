import TrainSchedule from '../models/trainSchedule.model.js';

export const readTrainScheduleCSV = (file) => {
  let content = [];

  file.on('data', (chunk) => {
    content += chunk;
  });

  file.on('end', () => {
    const rows = content.trim().split('\n');
    const headers = rows.shift().split(',');
    const jsonData = [];

    const result = [];

    rows.forEach((row, index) => {
      const values = row.split(',');
      let stationName = [];
      let arrivalDate = [];
      let arrivalTime = [];
      let departureDate = [];
      let departureTime = [];
      let haltTime = [];
      values.forEach((val, ind) => {
        console.log(val);
        if (ind == 7) {
          stationName = val.split('/');
          console.log(stationName);
        } else if (ind == 4) {
          arrivalDate = val.split('-');
          console.log(arrivalDate);
        } else if (ind == 8) {
          arrivalTime = val.split('/');
          console.log(arrivalTime);
        } else if (ind == 5) {
          departureDate = val.split('-');
          console.log(departureDate);
        } else if (ind == 9) {
          departureTime = val.split('/');
          console.log(departureTime);
        } else if (ind == 10) {
          haltTime = val.split('/');
          console.log(haltTime);
        }
      });

      const stationsHalts = [];
      for (let i = 0; i < stationName.length; i++) {
        stationsHalts.push({
          name: stationName[i],
          arrivalDate: arrivalDate[i],
          arrivalTime: arrivalTime[i],
          departureDate: departureDate[i],
          departureTime: departureTime[i],
          haltTime: haltTime[i],
        });
      }
      console.log('Hii');
      console.log(stationsHalts);
      const jsonRow = {};
      jsonRow['stations'] = stationsHalts;

      headers.forEach((header, index) => {
        console.log(`$${header}$`);

        jsonRow[header] = values[index];
      });

      jsonData.push(jsonRow);
      // console.log(jsonData);

      for (let i = 0; i < jsonData.length; i++) {
        console.log('Hello');
        console.log(jsonData[i].stations[0].arrivalTime);
        result.push({
          no: jsonData[i].trainNo,
          name: jsonData[i].trainName,
          source: jsonData[i].source,
          destination: jsonData[i].destination,
          sourceArrivalDate: jsonData[i].stations[0].arrivalDate,
          sourceArrivalTime: jsonData[i].stations[0].arrivalTime,
          sourceDepartureDate: jsonData[i].stations[0].departureDate,
          sourceDepartureTime: jsonData[i].stations[0].departureTime,
          destinationArrivalDate: jsonData[i].stations[0].arrivalDate,
          destinationDepartureTime: jsonData[i].stations[0].arrivalTime,
          noOfACCoach: jsonData[i].noOfACCoach,
          capacityACCoach: jsonData[i].capacityACCoach,
          availableACCoach: jsonData[i].availableACCoach,
          noOfSleeperCoach: jsonData[i].noOfSleeperCoach,
          capacitySleeperCoach: jsonData[i].capacitySleeperCoach,
          availableSleeperCoach: jsonData[i].availableSleeperCoach,
          noOfGeneralCoach: jsonData[i].noOfGeneralCoach,
          capacityGeneralCoach: jsonData[i].capacityGeneralCoach,
          availableGeneralCoach: jsonData[i].availableGeneralCoach,
          stations: stationsHalts,
        });
      }
    });
    console.log(result.length);
    TrainSchedule.insertMany(result)
      .then(function () {
        console.log('Successfully saved defult items to DB');
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};
