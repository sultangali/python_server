import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    lastname: String,
    firstname: String,
    patronymic: String,
    birthday: String,
    phone: String,
    address: String,
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
    father_lname: String,
    father_fname: String,
    father_patron: String,
    father_phone: String,
    mother_lname: String,
    mother_fname: String,
    mother_patron: String,
    mother_phone: String,
    subjects: {
      python: {
        attending: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
          },
        ],
      },
    },
    status: {
      type: String,
      default: "denied",
    },
    avatar: String,
  },
  { timestamps: true }
);

export default mongoose.model("Student", schema);
