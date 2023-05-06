import { Router } from 'express';
import * as trainController from '../controller/train.controller.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = Router();
router.post('/csvData', upload.single('file'), trainController.csvData);
export default router;
