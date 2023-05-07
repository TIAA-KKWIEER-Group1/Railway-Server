import { Router } from 'express';
import * as userController from '../controller/user.controller.js';

const router = Router();

router.post('/login', userController.login);
router.post('/register/sendotp', userController.getOTPAtRegister);
router.post('/register/verify', userController.verifyOTPAtRegister);
router.post('/logout', userController.logout);
router.get('/status', userController.getLoginStatus);
router.get('/getCSV', userController.getCSV);
export default router;
