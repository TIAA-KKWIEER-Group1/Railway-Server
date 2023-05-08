import { Router } from 'express';
import * as trainController from '../controller/train.controller.js';

const router = Router();

router.get('/search', trainController.searchTrain);
router.get('/', trainController.getAllTrainSchedule);
router.get('/stations/:id', trainController.getInBetweenStations);
router.get('/allstations', trainController.getAllStations);
router.post('/', trainController.addTrain);
router.get('/train-status/:id', trainController.getTrainStatus);
export default router;
