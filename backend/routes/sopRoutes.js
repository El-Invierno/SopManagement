// sopRoutes.js
import express from 'express';
import {
    createSOP,
    logChange,
    getAllSOPs,
    updateSOP,
    deleteSOP,
    getSOPChanges,
    assessQuality,
    getAllChangeLogs,
    getQualityScoreById,
    updateQualityScore // Import the new endpoint
} from '../controllers/sopController.js';

const router = express.Router();

// SOP APIs
router.get('/view-sops', getAllSOPs);
router.post('/create', createSOP);
router.put('/update/:id', updateSOP);
router.delete('/delete/:id', deleteSOP);
router.post('/log/:id', logChange);
router.get('/assess/:id', assessQuality); // Use the updated route

router.get('/change-logs/:id', getSOPChanges); // Existing endpoint for specific SOP
router.get('/change-logs', getAllChangeLogs); // New endpoint for all SOPs
router.put('/quality/:id', updateQualityScore); // New route for updating quality score
router.get('/sops/:id/quality', getQualityScoreById); // Add route for getting quality score



export default router;