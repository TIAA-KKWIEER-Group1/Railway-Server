import { Router } from 'express';
import * as trainController from '../controller/train.controller.js';

const router = Router();

router.get('/search', trainController.searchTrain);
router.get('/', trainController.getAllTrainSchedule);
export default router;
