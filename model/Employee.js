import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    hashedPassword: String,
    lastname: String,
    firstname: String,
    patronymic: String,
    phone: String,
    role: String,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    classrooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }],
    avatar: String
}, {timestamps: true})

export default mongoose.model('Employee', schema)
