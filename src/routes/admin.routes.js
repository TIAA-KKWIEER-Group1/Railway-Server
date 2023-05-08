import { Router } from 'express';
import * as adminController from '../controller/admin.controller.js';
import { createRequire } from 'module';
import * as trainController from '../controller/train.controller.js';
import { isAdminAuth } from '../middleware/isAdminAuth.js';

const router = Router();
const require = createRequire(import.meta.url);
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
router.post('/csvData', upload.single('file'), trainController.csvData);
router.post('/login', adminController.login);
export default router;
