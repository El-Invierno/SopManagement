import express from 'express';
import { createMacro, getMacros } from '../controllers/macroController.js';

const router = express.Router();

router.post('/create', createMacro);
router.get('/all', getMacros);

export default router;
