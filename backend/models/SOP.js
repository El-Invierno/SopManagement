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
  complianceStatus: { type: String, default: 'Not Checked' },
  changeLogs: [changeLogSchema],
  controls: [ControlSchema],
  createdAt: { type: Date, default: Date.now },
});

const SOP = mongoose.model('SOP', SOPSchema);

export default SOP;
