import mongoose from "mongoose";

const Answer = new mongoose.Schema({
    title: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
});

const Question = new mongoose.Schema({
    title: { type: String, required: true },
    answers: { type: [Answer], required: true },
});

export default mongoose.model('Question', Question);