import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20); // Fetch last 20 notifications
    res.json(notifications);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
