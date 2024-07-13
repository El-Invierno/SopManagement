import express from 'express';
import { generateSuggestions } from '../services/aiService.js';

const router = express.Router();

router.post('/suggestions', async (req, res) => {
  const { content } = req.body;
  try {
    const suggestions = await generateSuggestions(content);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
