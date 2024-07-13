import express from 'express';
import {
  createSOP,
  assessQuality,
  validateCompliance,
  logChange,
  performGapAnalysis,
  addControl,
  verifyControl,
} from '../controllers/sopController.js';

const router = express.Router();

router.post('/create', createSOP);
router.get('/assess/:id', assessQuality);
router.get('/validate/:id', validateCompliance);
router.post('/log/:id', logChange);
router.get('/gap-analysis/:id', performGapAnalysis);
router.post('/control/:id', addControl);
router.put('/control/:id/:controlId', verifyControl);

export default router;
