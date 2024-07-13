import express from 'express';
import { addCollaboration, getCollaborations } from '../controllers/collaborationController.js';

const router = express.Router();

router.post('/add', addCollaboration);
router.get('/:sopId', getCollaborations);

export default router;
