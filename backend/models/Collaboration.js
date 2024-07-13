import mongoose from 'mongoose';

const CollaborationSchema = new mongoose.Schema({
  sopId: { type: mongoose.Schema.Types.ObjectId, ref: 'SOP' },
  expertName: { type: String, required: true },
  suggestions: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Collaboration = mongoose.model('Collaboration', CollaborationSchema);

export default Collaboration;
