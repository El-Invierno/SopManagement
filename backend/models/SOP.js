import mongoose from 'mongoose';

const ChangeLogSchema = new mongoose.Schema({
  change: String,
  changedAt: { type: Date, default: Date.now },
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
  changeLogs: [ChangeLogSchema],
  controls: [ControlSchema],
  createdAt: { type: Date, default: Date.now },
});

const SOP = mongoose.model('SOP', SOPSchema);

export default SOP;
