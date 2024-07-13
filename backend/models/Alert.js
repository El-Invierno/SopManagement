import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sopId: { type: mongoose.Schema.Types.ObjectId, ref: 'SOP' },
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model('Alert', AlertSchema);

export default Alert;
