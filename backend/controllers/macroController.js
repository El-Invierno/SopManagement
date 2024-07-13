import Macro from '../models/Macro.js';

// Create a new macro
export const createMacro = async (req, res) => {
  const { name, content } = req.body;
  try {
    const newMacro = new Macro({ name, content });
    await newMacro.save();
    res.json(newMacro);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get all macros
export const getMacros = async (req, res) => {
  try {
    const macros = await Macro.find();
    res.json(macros);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
