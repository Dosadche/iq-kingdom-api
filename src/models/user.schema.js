import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    hits: { type: Number, default: 5 },
    hp: { type: Number, default: 5 },
    xp: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
    lastRevival: { type: String },
});

export default mongoose.model('User', User);