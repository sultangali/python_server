import mongoose from "mongoose";

const schema = new mongoose.Schema({
    question: String,
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    classroom: String,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, {timestamps: true})

export default mongoose.model('Exam', schema)