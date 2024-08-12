import mongoose from 'mongoose';

const changeLogSchema = new mongoose.Schema({
  change: { type: String, required: true },
  changedAt: { type: Date, default: Date.now },
  changedBy: { type: String, default: 'unknown' }
});
const ControlSchema = new mongoose.Schema({
  control: String,
  status: { type: String, default: 'Not Verified' },
  verifiedAt: { type: Date },
});

const SOPSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  qualityScore: { type: Number, default: 0 },
  changeLogs: [changeLogSchema],
  controls: [ControlSchema],
  createdAt: { type: Date, default: Date.now },
  elapsedTime: {
    type: Number,
    default: 0, // Initialize elapsedTime to 0
  },
  expectedTimeOfCompletion: {
    type: Number,
    required: true, // Ensure expectedTimeOfCompletion is provided
  },
  timerStatus: {
    type: String,
    enum: ['stopped', 'running', 'paused'],
    default: 'stopped',
  },
});

const SOP = mongoose.model('SOP', SOPSchema);

export default SOP;
