import express from 'express';
import { generateSuggestions, assessQualityWithOpenAI } from '../services/aiService.js';
import { getSOPContentById } from '../controllers/sopController.js';

const router = express.Router();

router.post('/suggestions', async(req, res) => {
    const { content } = req.body;
    try {
        const suggestions = await generateSuggestions(content);
        res.json({ suggestions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/assess/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const sopContent = await getSOPContentById(id);
        const { analysis, qualityScore } = await assessQualityWithOpenAI(sopContent);
        res.json({ analysis, qualityScore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to assess SOP quality' });
    }
});

export default router;