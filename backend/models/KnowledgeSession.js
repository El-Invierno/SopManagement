import mongoose from 'mongoose';

const KnowledgeSessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  participants: [String],
  createdAt: { type: Date, default: Date.now },
});

const KnowledgeSession = mongoose.model('KnowledgeSession', KnowledgeSessionSchema);

export default KnowledgeSession;