import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    abcd: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, {timestamps: true})

export default mongoose.model('Classroom', schema)