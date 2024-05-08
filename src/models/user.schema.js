import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    hits: { type: Number, default: 5 },
    hp: { type: Number, default: 5 },
    isAdmin: { type: Boolean, default: false },
});

export default mongoose.model('User', User);