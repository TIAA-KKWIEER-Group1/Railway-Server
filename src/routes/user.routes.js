import { Router } from 'express';
import * as userController from '../controller/user.controller.js';

const router = Router();

router.post('/login', userController.login);
router.post('/register', userController.getOTPAtRegister);

export default router;
