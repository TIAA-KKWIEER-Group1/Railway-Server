import { Router } from 'express';
import * as reservationServices from '../controller/reservation.controller.js';
import isUserAuth from '../middleware/isUserAuth.js';

const router = Router();

router.post('/book', isUserAuth, reservationServices.bookTicket);
export default router;
