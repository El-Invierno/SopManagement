import express from 'express';
import { generateSuggestions, assessQualityWithOpenAI } from '../services/aiService.js';
import { getSOPContentById, updateQualityScore } from '../controllers/sopController.js';
import { generateChecklistItems, generateResourceLinks } from '../services/aiService.js';

const router = express.Router();


router.post('/suggestions', async(req, res) => {
    const { content } = req.body;
    try {
        const suggestions = await generateSuggestions(content);
        res.json(suggestions); // Ensure that 'suggestions' is sent as a JSON object
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/suggestions/:id', async(req, res) => {
    const { id } = req.params;
    try {
        // Fetch the SOP content by ID
        const content = await getSOPContentById(id);

        // Generate suggestions based on the fetched content
        const suggestions = await generateSuggestions(content);
        res.json(suggestions); // Ensure that 'suggestions' is sent as a JSON object
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/assess/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const sopContent = await getSOPContentById(id);
        const { analysis, qualityScore } = await assessQualityWithOpenAI(sopContent);

        // Update the SOP with the new quality score
        await updateQualityScore(id, qualityScore);

        res.json({ analysis, qualityScore });
    } catch (error) {
        console.error('Failed to assess SOP quality:', error.message);
        res.status(500).json({ error: 'Failed to assess SOP quality' });
    }
});


router.get('/checklist/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const content = await getSOPContentById(id);
        const checklist = await generateChecklistItems(content); // Generate checklist based on content
        res.json(checklist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/resources/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const content = await getSOPContentById(id);
        const resources = await generateResourceLinks(content); // Generate resource links based on content
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;