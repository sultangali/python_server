import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    class: String,
    img: String
})

export default mongoose.model('Chapter', schema)