import excelToJson from 'convert-excel-to-json';
import fs from 'fs';

export const readTrainScheduleCSV = (csvFile) => {
  const excelRawData = excelToJson({
    source: fs.readFileSync(csvFile.path), // fs.readFileSync return a Buffer
    header: { rows: 1 },
    columnToKey: { '*': '{{columnHeader}}' },
  });

  const trainScheduleData = [];

  for (let i = 0; i < excelRawData['Sheet1'].length; i++) {
    let trainSchedule = excelRawData['Sheet1'][i];

    let stations = [];

    let stationArrivalDates = trainSchedule['arrivalDate'].split('-');
    let stationDepartureDates = trainSchedule['departureDate'].split('-');
    let stationNames = trainSchedule['stationName'].split('/');
    let stationArrivalTimes = trainSchedule['arrivalTime'].split('/');
    let stationDepartureTimes = trainSchedule['departureTime'].split('/');
    let stationHaltTimes = trainSchedule['haltTime'].split('/');
    let n = stationNames.length;

    for (let i = 0; i < n; i++) {
      stations.push({
        name: stationNames[i],
        arrivalDate: stationArrivalDates[i],
        arrivalTime: stationArrivalTimes[i],
        departureDate: stationDepartureDates[i],
        departureTime: stationDepartureTimes[i],
        haltTime: stationHaltTimes[i],
      });
    }

    trainScheduleData.push({
      no: trainSchedule['trainNo'],
      name: trainSchedule['trainName'],
      source: trainSchedule['source'],
      destination: trainSchedule['destination'],

      noOfACCoach: trainSchedule['noOfACCoach'],
      capacityACCoach: trainSchedule['capacityACCoach'],
      availableACCoach: trainSchedule['availableACCoach'],

      noOfSleeperCoach: trainSchedule['noOfSleeperCoach'],
      capacitySleeperCoach: trainSchedule['capacitySleeperCoach'],
      availableSleeperCoach: trainSchedule['availableSleeperCoach'],

      noOfGeneralCoach: trainSchedule['noOfGeneralCoach'],
      capacityGeneralCoach: trainSchedule['capacityGeneralCoach'],
      availableGeneralCoach: trainSchedule['availableGeneralCoach'],

      sourceArrivalDate: stationArrivalDates[0],
      sourceArrivalTime: stationArrivalTimes[0],
      sourceDepartureDate: stationDepartureDates[0],
      sourceDepartureTime: stationDepartureTimes[0],

      destinationArrivalDate: stationArrivalDates[n - 1],
      destinationArrivalTime: stationArrivalTimes[n - 1],

      stations,
    });
  }

  return trainScheduleData;
};
