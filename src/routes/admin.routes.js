import { Router } from 'express';
import * as adminController from '../controller/admin.controller.js';
import * as trainController from '../controller/train.controller.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = Router();
router.post('/login', adminController.login);
router.post('/excel', trainController.excel);
router.get('/test', adminController.test);
router.post('/csvData', upload.single('file'), trainController.csvData);

export default router;
