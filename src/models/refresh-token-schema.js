import mongoose from "mongoose";

const RefreshToken = new mongoose.Schema({
    refreshToken: { type: String, required: true },
    userId: { type: String, required: true },
});

export default mongoose.model('RefreshToken', RefreshToken);