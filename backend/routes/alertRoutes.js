import express from 'express';
import { createAlert, getAlerts } from '../controllers/alertController.js';

const router = express.Router();

router.post('/create', createAlert);
router.get('/all', getAlerts);

export default router;
