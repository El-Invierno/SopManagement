import express from 'express';
import {
    createSOP,
    assessQuality,
    validateCompliance,
    logChange,
    performGapAnalysis,
    addControl,
    verifyControl,
    getAllSOPs,
    updateSOP,
    deleteSOP
} from '../controllers/sopController.js';

const router = express.Router();

router.get('/view-sops', getAllSOPs);
router.post('/create', createSOP);
router.put('/update/:id', updateSOP);
router.delete('/delete/:id', deleteSOP);
router.get('/assess/:id', assessQuality);
router.get('/validate/:id', validateCompliance);
router.post('/log/:id', logChange);
router.get('/gap-analysis/:id', performGapAnalysis);
router.post('/control/:id', addControl);
router.put('/control/:id/:controlId', verifyControl);

export default router;