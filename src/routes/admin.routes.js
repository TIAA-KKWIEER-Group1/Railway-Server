import { Router } from 'express';
import * as adminController from '../controller/admin.controller.js';

const router = Router();

router.post('/login', adminController.login);
export default router;
