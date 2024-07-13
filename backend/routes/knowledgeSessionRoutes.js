import express from 'express';
import { scheduleSession, getSessions } from '../controllers/knowledgeSessionController.js';

const router = express.Router();

router.post('/schedule', scheduleSession);
router.get('/all', getSessions);

export default router;
