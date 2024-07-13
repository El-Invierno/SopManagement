import Collaboration from '../models/Collaboration.js';

// Add a collaboration suggestion
export const addCollaboration = async (req, res) => {
  const { sopId, expertName, suggestions } = req.body;
  try {
    const newCollaboration = new Collaboration({ sopId, expertName, suggestions });
    await newCollaboration.save();
    res.json(newCollaboration);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get collaborations for an SOP
export const getCollaborations = async (req, res) => {
  const { sopId } = req.params;
  try {
    const collaborations = await Collaboration.find({ sopId });
    res.json(collaborations);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
