import mongoose from "mongoose";

const schema = new mongoose.Schema({
    question: {
        type: String
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    answer: String,
    status: {
        type: String,
        default: 'opened'
    }
}, {
    timestamps: true
})

export default mongoose.model('Question', schema)