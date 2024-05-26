import mongoose from "mongoose";

const Notification = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true },
    userId: { type: String, required: true },
    senderId: { type: String, required: true },
    isRead: { type: Boolean, required: true, default: false }
});

export default mongoose.model('Notification', Notification);