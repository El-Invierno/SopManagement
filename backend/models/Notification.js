import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sopId: { type: mongoose.Schema.Types.ObjectId, ref: 'SOP', required: true },
  type: { type: String, enum: ['Created', 'Updated', 'Deleted'], required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;