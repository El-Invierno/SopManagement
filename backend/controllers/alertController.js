import Alert from '../models/Alert.js';

// Create a new alert
export const createAlert = async (req, res) => {
  const { message, sopId } = req.body;
  try {
    const newAlert = new Alert({ message, sopId });
    await newAlert.save();
    res.json(newAlert);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get all alerts
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
