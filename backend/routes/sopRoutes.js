// sopRoutes.js
import express from 'express';
import {
    createSOP,
    logChange,
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
router.post('/log/:id', logChange);
router.get('/change-logs/:id', getSOPChanges); // Existing endpoint for specific SOP
router.get('/change-logs', getAllChangeLogs); // New endpoint for all SOPs

export default router;