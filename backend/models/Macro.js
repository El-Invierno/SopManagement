import mongoose from 'mongoose';

const MacroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Macro = mongoose.model('Macro', MacroSchema);

export default Macro;
