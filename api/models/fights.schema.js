import mongoose from "mongoose";

const Fight = new mongoose.Schema({
    agressorId: { type: String, required: true },
    agressorCorrectAnswers: { type: Number, required: true },
    defenderId: { type: String, required: true },
    defenderCorrectAnswers: { type: Number },
    isFinished: { type: Boolean, required: true, default: false },
    winnerId: { type: String },
});

export default mongoose.model('Fight', Fight);