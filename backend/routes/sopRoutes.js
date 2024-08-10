// sopRoutes.js
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
    deleteSOP,
    getSOPChanges,
    getAllChangeLogs // Import the new endpoint
} from '../controllers/sopController.js';

const router = express.Router();

// SOP APIs
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
router.get('/change-logs/:id', getSOPChanges); // Existing endpoint for specific SOP
router.get('/change-logs', getAllChangeLogs); // New endpoint for all SOPs

export default router;