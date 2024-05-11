import mongoose from "mongoose";

const schema = new mongoose.Schema({
    question: String,
    A: String,
    B: String,
    C: String,
    D: String,
    correct: String,
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    },
    classroom: String,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, {
    timestamps: true
})

export default mongoose.model('Quiz', schema)