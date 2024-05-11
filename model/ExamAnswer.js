import mongoose from "mongoose";

const schema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    answer: String,
    grade: {
        type: Number,
        default: 0
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, {
    timestamps: true
})

export default mongoose.model('ExamAnswer', schema)