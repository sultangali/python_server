import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    img: String,
    chapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    }]
}, {timestamps: true})

export default mongoose.model('Subject', schema)