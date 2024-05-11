import mongoose from "mongoose";

const schema = new mongoose.Schema({
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    },
    title: String,
    text: String,
    img: String,
    pptx: String,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    clss: String,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
})

export default mongoose.model('Lesson', schema)