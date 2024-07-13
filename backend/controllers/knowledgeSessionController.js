import KnowledgeSession from '../models/KnowledgeSession.js';

// Schedule a new knowledge session
export const scheduleSession = async (req, res) => {
  const { title, date, participants } = req.body;
  try {
    const newSession = new KnowledgeSession({ title, date, participants });
    await newSession.save();
    res.json(newSession);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get all knowledge sessions
export const getSessions = async (req, res) => {
  try {
    const sessions = await KnowledgeSession.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
